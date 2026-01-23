<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { user } from "$providers/stores/kauth/user";
  import {
    getFormBySlug,
    submitBySlug,
    getSchedulesByForm,
    getAvailableTimeSlots,
  } from "$providers/actions/kchannel/user-appointment/user-appointment";
  import { getChannels } from "$providers/actions/kchannel/channel/channel";

  import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import QuestionDisplay from "$components/elements/form/appointment-form/QuestionDisplay.svelte";

  let loading = true;
  let submitting = false;
  let form = null;
  let answers = {};
  let submittedSuccessfully = false;
  let isUserInChannel = false;
  let checkingChannelMembership = true;
  
  // Appointment slot selection
  let schedules = [];
  let availableSlots = [];
  let selectedSlot = null;
  let bookedSlotsByDate = {}; // Store booked slots grouped by date

  const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  onMount(async () => {
    try {
      loading = true;
      const slug = $page.params.slug;
      const res = await getFormBySlug.load(slug);

      if (res?.success) {
        form = res.data?.appointmentGetFormBySlug;

        // Check if user is in the channel
        if ($user && form?.channel) {
          try {
            checkingChannelMembership = true;
            const myChannelsRes = await getChannels.load();
            if (myChannelsRes?.success) {
              const myChannels = myChannelsRes.data || [];
              // Check if user is a member of the form's channel
              isUserInChannel = myChannels.some(ch => ch.id === form.channel.id);
            }
          } catch (err) {
            console.error("Error checking channel membership:", err);
            isUserInChannel = false;
          } finally {
            checkingChannelMembership = false;
          }
        } else {
          checkingChannelMembership = false;
        }

        // Load schedules for this form only if user is in channel
        if (form?.id && isUserInChannel) {
          await loadSchedules();
        }

        // Initialize answers
        form.questions.forEach((q) => {
          const qId = q._id || q.id;
          if (q.type !== "header") {
            if (q.type === "checkbox" || q.type === "CHECKBOXES") {
              answers[qId] = [];
            } else {
              answers[qId] = "";
            }
          }
        });
      } else {
        console.error("Form loading failed");
      }
    } catch (err) {
      console.error("Error loading form:", err);
    } finally {
      loading = false;
    }
  });

  async function loadSchedules() {
    try {
      const res = await getSchedulesByForm.load(form.id);
      if (res?.success) {
        schedules = res.data?.getAppointmentSchedulesByForm || [];
        await generateAvailableSlots();
      }
    } catch (err) {
      console.error("Error loading schedules:", err);
    }
  }

  async function generateAvailableSlots() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const slots = [];
    const bookedSlotsPromises = [];
    
    // Generate slots for the next 30 days and collect promises for booked slots
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayOfWeek = date.getDay();
      const timestamp = date.getTime();
      
      // Find schedules for this day of week that are active
      const daySchedules = schedules.filter(
        s => s.day === dayOfWeek && s.is_active
      );
      
      if (daySchedules.length > 0) {
        // Fetch booked slots for this date
        bookedSlotsPromises.push(
          getAvailableTimeSlots.load({
            appointmentFormId: form.id,
            date: timestamp
          }).then(res => {
            if (res?.success) {
              bookedSlotsByDate[timestamp] = res.data?.getAvailableTimeSlots || [];
            }
          }).catch(err => {
            console.error("Error fetching booked slots:", err);
            bookedSlotsByDate[timestamp] = [];
          })
        );
      }
      
      // Create a slot for each schedule
      daySchedules.forEach(schedule => {
        slots.push({
          date: new Date(date),
          dateString: date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          }),
          dayOfWeek: DAYS[dayOfWeek],
          schedule: schedule,
          timestamp: timestamp,
          startTime: schedule.start_time,
          endTime: schedule.end_time,
          displayTime: formatTimeRange(schedule.start_time, schedule.end_time)
        });
      });
    }
    
    // Wait for all booked slots to be fetched
    await Promise.all(bookedSlotsPromises);
    
    // Filter out booked slots (slots where the time is already taken)
    availableSlots = slots.filter(slot => {
      const bookedTimes = bookedSlotsByDate[slot.timestamp] || [];
      // Slot is available if its start time is NOT in the booked times list
      return !bookedTimes.includes(slot.startTime);
    });
  }

  function formatTimeRange(startMinutes, endMinutes) {
    return `${formatTime(startMinutes)} - ${formatTime(endMinutes)}`;
  }

  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${mins.toString().padStart(2, "0")} ${period}`;
  }

  async function handleSubmit() {
    // Validate slot selection
    if (!selectedSlot) {
      alert("Please select an appointment time slot");
      return;
    }

    for (const q of form.questions) {
      const qId = q._id || q.id;
      if (q.required && q.type !== "header") {
        const val = answers[qId];
        if (!val || (Array.isArray(val) && val.length === 0)) {
          alert(`Please answer the required question: "${q.label}"`);
          return;
        }
      }
    }

    try {
      submitting = true;

      const formattedAnswers = Object.keys(answers).map((questionId) => ({
        questionId: questionId,
        value: Array.isArray(answers[questionId])
          ? answers[questionId].join(", ")
          : String(answers[questionId]),
      }));

      const res = await submitBySlug.load({
        slug: $page.params.slug,
        answers: formattedAnswers,
        date: selectedSlot.timestamp,
        time_start: selectedSlot.startTime,
      });

      if (res?.success) {
        submittedSuccessfully = true;
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const errorMsg = res?.errors?.[0]?.message || "Failed to submit form.";
        alert(errorMsg);
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert("An error occurred during submission.");
    } finally {
      submitting = false;
    }
  }
</script>

<div class="min-h-screen bg-[#f9fafb] py-10 px-4">
  <div
    class="max-w-2xl w-full mx-auto p-8 bg-white rounded-3xl shadow-xl border border-gray-100"
  >
    {#if loading}
      <div class="flex justify-center py-20"><SMFBLoading color="teal" /></div>
    {:else if submittedSuccessfully}
      <div class="text-center py-10 space-y-6">
        <div
          class="bg-teal-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto"
        >
          <svg
            class="w-10 h-10 text-teal-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <h2 class="text-3xl font-black text-gray-800">Thank You!</h2>
          <p class="text-gray-500 mt-2 text-lg">
            Your appointment request has been submitted successfully.
          </p>
        </div>
        <button
          on:click={() => window.location.reload()}
          class="text-teal-600 font-bold hover:underline"
        >
          Submit another response
        </button>
      </div>
    {:else if form}
      {#if !isUserInChannel}
        <!-- Not in Channel Message -->
        <div class="text-center py-20">
          <div class="bg-yellow-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <h2 class="text-3xl font-black text-gray-800 mb-4">Channel Membership Required</h2>
          <p class="text-gray-600 text-lg mb-2">
            You must be a member of this channel to book appointments.
          </p>
          <p class="text-gray-500">
            Please join the channel first or contact the channel administrator for access.
          </p>
          <button
            on:click={() => history.back()}
            class="mt-8 px-6 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-all"
          >
            Go Back
          </button>
        </div>
      {:else}
      <header class="mb-10">
        <h1 class="text-4xl font-black text-gray-900 leading-tight">
          {form.title}
        </h1>
        {#if form.description}
          <p class="text-gray-500 mt-4 text-lg leading-relaxed">
            {form.description}
          </p>
        {/if}
      </header>

      <form on:submit|preventDefault={handleSubmit} class="space-y-8">
        <!-- Appointment Slot Selection -->
        <div class="bg-teal-50 rounded-2xl p-6 border-2 border-teal-200">
          <h3 class="text-xl font-bold text-gray-900 mb-4">📅 Select Appointment Slot</h3>
          
          {#if availableSlots.length === 0}
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p class="text-yellow-800 font-semibold">⚠️ No available appointment slots</p>
              <p class="text-yellow-700 text-sm mt-1">
                The admin hasn't configured any schedules yet. Please check back later.
              </p>
            </div>
          {:else}
            <p class="text-sm text-gray-600 mb-4">
              Choose from the available time slots below (showing next 30 days)
            </p>
            
            <div class="max-h-96 overflow-y-auto space-y-2 pr-2">
              {#each availableSlots as slot}
                <button
                  type="button"
                  on:click={() => selectedSlot = slot}
                  class="w-full text-left p-4 rounded-xl border-2 transition-all {
                    selectedSlot === slot
                      ? 'border-teal-600 bg-teal-100 shadow-md'
                      : 'border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50'
                  }"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex-1">
                      <div class="flex items-center gap-2">
                        <span class="text-lg font-bold text-gray-900">
                          {slot.dateString}
                        </span>
                        <span class="text-xs font-semibold px-2 py-1 rounded-full bg-teal-600 text-white">
                          {slot.dayOfWeek}
                        </span>
                      </div>
                      <div class="flex items-center gap-2 mt-1">
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span class="text-sm text-gray-600">{slot.displayTime}</span>
                      </div>
                    </div>
                    {#if selectedSlot === slot}
                      <svg class="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                    {/if}
                  </div>
                </button>
              {/each}
            </div>

            {#if selectedSlot}
              <div class="mt-4 p-4 bg-white rounded-lg border border-teal-200">
                <p class="text-sm font-semibold text-teal-800">✓ Selected Appointment:</p>
                <p class="text-gray-900 font-bold mt-1">
                  {selectedSlot.dateString} at {selectedSlot.displayTime}
                </p>
              </div>
            {/if}
          {/if}
        </div>

        <!-- Form Questions -->
        {#each form.questions as q (q._id || q.id)}
          <QuestionDisplay bind:value={answers[q._id || q.id]} question={q} />
        {/each}

        <div class="pt-6">
          <button
            type="submit"
            disabled={submitting}
            class="w-full bg-[#4db6ac] text-white px-8 py-4 rounded-2xl font-black text-xl hover:bg-[#3d968e] hover:shadow-lg hover:shadow-teal-100 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Processing..." : "Confirm Appointment"}
          </button>
          <p class="text-center text-gray-400 text-xs mt-4">
            Secure submission powered by AppointmentFlow
          </p>
        </div>
      </form>
      {/if}
    {:else}
      <div class="text-center py-20">
        <div class="text-6xl mb-4">📍</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Form Not Found</h2>
        <p class="text-gray-500">
          The link you followed might be broken or the form has been closed.
        </p>
        <button
          on:click={() => history.back()}
          class="mt-6 text-teal-600 font-bold">Go Back</button
        >
      </div>
    {/if}
  </div>
</div>

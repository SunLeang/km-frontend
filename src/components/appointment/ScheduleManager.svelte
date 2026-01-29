<script>
  // Importing lifecycle hook from Svelte
  import { onMount } from "svelte";

  // Importing API actions for user appointment schedules
  import {
    getSchedulesByForm,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  } from "$providers/actions/kchannel/user-appointment/user-appointment";

  // Importing a loading spinner component
  import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";

  // Props passed to this component
  export let formId;      // Appointment form ID
  export let channelId;   // Channel ID for the schedules

  // Local state variables
  let schedules = [];     // Array to store schedules
  let loading = true;     // Loading state for initial data fetch
  let saving = false;     // Saving state for create/update/delete actions
  let showQuickSetup = false; // Controls visibility of Quick Setup panel

  // Quick setup state for bulk day/time configuration
  let quickSetup = {
    selectedDays: [],     // Array of selected day numbers (0-6)
    start_time: 540,      // Default start time in minutes (9:00 AM)
    end_time: 1020,       // Default end time in minutes (5:00 PM)
  };

  // Array of days for selection/dropdown
  const DAYS = [
    { value: 0, label: "Sunday" },
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
  ];

  // Lifecycle hook: Load schedules when component mounts
  onMount(async () => {
    await loadSchedules();
  });

  // Function to load schedules from API
  async function loadSchedules() {
    try {
      loading = true;
      const res = await getSchedulesByForm.load(formId); // API call
      if (res?.success) {
        schedules = res.data?.getAppointmentSchedulesByForm || [];
      }
    } catch (err) {
      console.error("Error loading schedules:", err);
    } finally {
      loading = false;
    }
  }

  // Add a new empty schedule to the local array
  function addSchedule() {
    schedules = [
      ...schedules,
      {
        day: 1,                // Default day: Monday
        start_time: 540,       // 9:00 AM
        end_time: 1020,        // 5:00 PM
        is_active: true,       // Schedule is active by default
        isNew: true,           // Mark as new (not yet saved in DB)
      },
    ];
  }

  // Save a schedule (create if new, update if existing)
  async function saveSchedule(schedule, index) {
    try {
      saving = true;
      if (schedule.isNew) {
        // Create new schedule
        const res = await createSchedule.load({
          channel: channelId,
          appointment_form: formId,
          day: schedule.day,
          start_time: schedule.start_time,
          end_time: schedule.end_time,
          is_active: schedule.is_active,
        });
        if (res?.success) {
          schedules[index] = res.data.createAppointmentSchedule; // Update local array with saved schedule
          delete schedules[index].isNew; // Remove isNew flag
          schedules = schedules; // Trigger reactivity
          alert("Schedule added successfully!");
        }
      } else {
        // Update existing schedule
        const res = await updateSchedule.load({
          id: schedule.id,
          channel: channelId,
          appointment_form: formId,
          day: schedule.day,
          start_time: schedule.start_time,
          end_time: schedule.end_time,
          is_active: schedule.is_active,
        });
        if (res?.success) {
          alert("Schedule updated successfully!");
        }
      }
    } catch (err) {
      console.error("Error saving schedule:", err);
      alert(`Error: ${err.message || "Failed to save schedule"}`);
    } finally {
      saving = false;
    }
  }

  // Remove a schedule
  async function removeSchedule(schedule, index) {
    // Confirm deletion for existing schedules
    if (!schedule.isNew && !confirm("Delete this schedule?")) return;

    try {
      if (schedule.isNew) {
        // Remove from local array if it's a new unsaved schedule
        schedules = schedules.filter((_, i) => i !== index);
      } else {
        // Delete from API
        const res = await deleteSchedule.load({ id: schedule.id });
        if (res?.success) {
          schedules = schedules.filter((_, i) => i !== index); // Remove from local array
          alert("Schedule deleted successfully!");
        }
      }
    } catch (err) {
      console.error("Error deleting schedule:", err);
      alert(`Error: ${err.message || "Failed to delete schedule"}`);
    }
  }

  // Convert minutes to a formatted time string (e.g., 540 -> "9:00 AM")
  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${mins.toString().padStart(2, "0")} ${period}`;
  }

  // Convert time string ("HH:MM") to minutes
  function timeToMinutes(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  }

  // Convert minutes to time input value ("HH:MM")
  function minutesToTimeInput(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
  }

  // Toggle day selection in Quick Setup
  function toggleDay(dayValue) {
    if (quickSetup.selectedDays.includes(dayValue)) {
      quickSetup.selectedDays = quickSetup.selectedDays.filter(d => d !== dayValue);
    } else {
      quickSetup.selectedDays = [...quickSetup.selectedDays, dayValue];
    }
  }

  // Apply Quick Setup to create/update multiple schedules at once
  async function applyQuickSetup() {
    if (quickSetup.selectedDays.length === 0) {
      alert("Please select at least one day");
      return;
    }

    try {
      saving = true;
      const createdSchedules = [];

      for (const day of quickSetup.selectedDays) {
        // Check if schedule already exists for this day
        const existing = schedules.find(s => s.day === day && !s.isNew);
        
        if (existing) {
          // Update existing schedule
          const res = await updateSchedule.load({
            id: existing.id,
            channel: channelId,
            appointment_form: formId,
            day: day,
            start_time: quickSetup.start_time,
            end_time: quickSetup.end_time,
            is_active: true,
          });
          if (res?.success) {
            const index = schedules.findIndex(s => s.id === existing.id);
            schedules[index] = res.data.updateAppointmentSchedule;
          }
        } else {
          // Create new schedule
          const res = await createSchedule.load({
            channel: channelId,
            appointment_form: formId,
            day: day,
            start_time: quickSetup.start_time,
            end_time: quickSetup.end_time,
            is_active: true,
          });
          if (res?.success) {
            createdSchedules.push(res.data.createAppointmentSchedule);
          }
        }
      }

      // Merge new schedules with existing ones
      if (createdSchedules.length > 0) {
        schedules = [...schedules.filter(s => !s.isNew), ...createdSchedules].sort((a, b) => a.day - b.day);
      } else {
        schedules = [...schedules]; // Trigger reactivity
      }

      alert(`Successfully configured ${quickSetup.selectedDays.length} day(s)!`);
      showQuickSetup = false;       // Hide Quick Setup panel
      quickSetup.selectedDays = [];  // Reset selection
    } catch (err) {
      console.error("Error applying quick setup:", err);
      alert(`Error: ${err.message || "Failed to apply quick setup"}`);
    } finally {
      saving = false;
    }
  }
</script>

<!-- Main schedule manager UI container -->
<div class="schedule-manager bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-bold text-gray-800">Available Time Slots</h3>
    <div class="flex gap-2">
      <!-- Toggle Quick Setup panel -->
      <button
        on:click={() => showQuickSetup = !showQuickSetup}
        class="px-4 py-2 bg-purple-500 text-white text-sm font-bold rounded-full hover:bg-purple-600 transition-all"
      >
        ⚡ Quick Setup
      </button>
      <!-- Add new schedule -->
      <button
        on:click={addSchedule}
        class="px-4 py-2 bg-teal-500 text-white text-sm font-bold rounded-full hover:bg-teal-600 transition-all"
      >
        + Add Schedule
      </button>
    </div>
  </div>

  <!-- Quick Setup Panel -->
  {#if showQuickSetup}
    <div class="mb-6 bg-purple-50 border-2 border-purple-200 rounded-2xl p-6">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-md font-bold text-purple-800">⚡ Quick Weekly Setup</h4>
        <button
          on:click={() => showQuickSetup = false}
          class="text-purple-600 hover:text-purple-800 font-bold"
        >
          ✕
        </button>
      </div>

      <p class="text-sm text-purple-700 mb-4">
        Set the same hours for multiple days at once
      </p>

      <!-- Day Selection -->
      <div class="mb-4">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Select Days</label>
        <div class="grid grid-cols-7 gap-2">
          {#each DAYS as day}
            <button
              type="button"
              on:click={() => toggleDay(day.value)}
              class="py-2 px-1 text-xs font-bold rounded-lg transition-all {
                quickSetup.selectedDays.includes(day.value)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }"
            >
              {day.label.substring(0, 3)}
            </button>
          {/each}
        </div>
      </div>

      <!-- Time Selection -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Start Time</label>
          <input
            type="time"
            value={minutesToTimeInput(quickSetup.start_time)}
            on:change={(e) => (quickSetup.start_time = timeToMinutes(e.target.value))}
            class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">End Time</label>
          <input
            type="time"
            value={minutesToTimeInput(quickSetup.end_time)}
            on:change={(e) => (quickSetup.end_time = timeToMinutes(e.target.value))}
            class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Apply Quick Setup Button -->
      <button
        on:click={applyQuickSetup}
        disabled={saving || quickSetup.selectedDays.length === 0}
        class="w-full px-4 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saving ? "Applying..." : `Apply to ${quickSetup.selectedDays.length} day(s)`}
      </button>

      <p class="text-xs text-purple-600 mt-3 text-center">
        💡 This will create or update schedules for the selected days
      </p>
    </div>
  {/if}

  <!-- Loading State -->
  {#if loading}
    <div class="flex justify-center py-8">
      <SMFBLoading color="teal" />
    </div>
  {:else if schedules.length === 0}
    <!-- Empty state -->
    <div class="text-center py-8 text-gray-500">
      <p class="mb-2">No schedules configured</p>
      <p class="text-sm">Add time slots when your appointment service is available</p>
    </div>
  {:else}
    <!-- Schedule list -->
    <div class="space-y-4">
      {#each schedules as schedule, i}
        <div class="border border-gray-200 rounded-2xl p-4 {!schedule.is_active ? 'bg-gray-50 opacity-60' : ''}">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Day Selection -->
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1">Day</label>
              <select
                bind:value={schedule.day}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                {#each DAYS as day}
                  <option value={day.value}>{day.label}</option>
                {/each}
              </select>
            </div>

            <!-- Start Time -->
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1">Start Time</label>
              <input
                type="time"
                value={minutesToTimeInput(schedule.start_time)}
                on:change={(e) => (schedule.start_time = timeToMinutes(e.target.value))}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <!-- End Time -->
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1">End Time</label>
              <input
                type="time"
                value={minutesToTimeInput(schedule.end_time)}
                on:change={(e) => (schedule.end_time = timeToMinutes(e.target.value))}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <!-- Actions: Save / Delete -->
            <div class="flex items-end gap-2">
              <button
                on:click={() => saveSchedule(schedule, i)}
                disabled={saving}
                class="flex-1 px-3 py-2 bg-teal-500 text-white text-sm font-bold rounded-lg hover:bg-teal-600 transition-all disabled:opacity-50"
              >
                {saving ? "..." : schedule.isNew ? "Add" : "Update"}
              </button>
              <button
                on:click={() => removeSchedule(schedule, i)}
                class="px-3 py-2 bg-red-500 text-white text-sm font-bold rounded-lg hover:bg-red-600 transition-all"
              >
                🗑️
              </button>
            </div>
          </div>

          <!-- Active Toggle -->
          <div class="mt-3 flex items-center">
            <input
              type="checkbox"
              id="active-{i}"
              bind:checked={schedule.is_active}
              class="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <label for="active-{i}" class="ml-2 text-sm text-gray-700">
              Active (Users can book during this time)
            </label>
          </div>

          <!-- Display Preview for existing schedule -->
          {#if !schedule.isNew}
            <div class="mt-2 text-xs text-gray-500">
              {DAYS.find((d) => d.value === schedule.day)?.label}: {formatTime(schedule.start_time)} - {formatTime(schedule.end_time)}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}

  <!-- Tip Section -->
  <div class="mt-4 p-4 bg-blue-50 rounded-lg">
    <p class="text-sm text-blue-800">
      <strong>💡 Tip:</strong> Add time slots for each day your appointment service is available. Users will only be able to book during these times.
    </p>
  </div>
</div>

<style>
  /* Margin for main container */
  .schedule-manager {
    margin-top: 20px;
  }
</style>

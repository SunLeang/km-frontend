<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import {
    getFormBySlug,
    submitBySlug,
  } from "$providers/actions/kchannel/user-appointment/user-appointment";

  import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import QuestionDisplay from "$components/elements/form/appointment-form/QuestionDisplay.svelte";

  let loading = true;
  let submitting = false;
  let form = null;
  let answers = {};
  let submittedSuccessfully = false;

  onMount(async () => {
    try {
      loading = true;
      const slug = $page.params.slug;
      const res = await getFormBySlug.load(slug);

      if (res?.success) {
        form = res.data?.appointmentGetFormBySlug;

        // Initialize answers using fallback for IDs
        form.questions.forEach((q) => {
          const qId = q._id || q.id;
          if (q.type !== "header") {
            if (q.type === "checkbox" || q.type === "CHECKBOX") {
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

  async function handleSubmit() {
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

      const slugFromUrl = $page.params.slug;

      const payload = {
        slug: slugFromUrl,
        answers: formattedAnswers,
      };

      console.log("Submitting with Payload:", payload);

      const res = await submitBySlug.load({
        slug: $page.params.slug,
        answers: formattedAnswers,
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

<div class="min-h-screen bg-[#f9fafb] flex flex-col items-center py-10 px-4">
  <div
    class="max-w-2xl w-full p-8 bg-white rounded-3xl shadow-xl border border-gray-100"
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

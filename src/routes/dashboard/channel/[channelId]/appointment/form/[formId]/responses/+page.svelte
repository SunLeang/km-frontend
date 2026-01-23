<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import {
    getFormBySlug,
    getResponses,
    deleteResponse,
  } from "$providers/actions/kchannel/user-appointment/user-appointment";
  import { formResponsesStore } from "$providers/stores/kchannel/my-user-appointments";
  import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";

  let loading = true;
  let formMetadata = null;

  // Helper to check if an answer is empty
  const isEmptyAnswer = (value) => {
    if (value === null || value === undefined || value === "") return true;
    if (typeof value === "string" && value.trim() === "") return true;
    return false;
  };

  // Helper to find the Question Label from the Metadata using the ID
  const getQuestionLabel = (id) => {
    if (!formMetadata?.questions) return "Question";
    const q = formMetadata.questions.find(
      (item) => (item._id || item.id) === id
    );
    return q ? q.label : "Unknown Question";
  };

  onMount(async () => {
    try {
      loading = true;
      const slug = $page.params.formId;
      const formRes = await getFormBySlug.load(slug);

      if (formRes?.success) {
        formMetadata = formRes.data.appointmentGetFormBySlug;
        const realDatabaseId = formMetadata.id;
        await getResponses.load(realDatabaseId);
      }
    } catch (err) {
      console.error("Error fetching responses:", err);
    } finally {
      loading = false;
    }
  });

  async function handleDelete(id) {
    if (!confirm("Permanently delete this response?")) return;
    try {
      await deleteResponse.load(id);
    } catch (err) {
      alert("Failed to delete response");
    }
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
</script>

<div class="min-h-screen bg-[#f8fafc]">
  <header
    class="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100"
  >
    <div class="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button
          on:click={() => history.back()}
          class="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-gray-500"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <div>
          <h1 class="text-lg font-black text-gray-800 tracking-tight">
            Form Responses
          </h1>
          <p class="text-xs text-gray-400 font-medium truncate max-w-[200px]">
            {formMetadata?.title || "Loading..."}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="hidden sm:flex flex-col items-end">
          <span
            class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
            >Collection</span
          >
          <span class="text-sm font-bold text-teal-600"
            >{$formResponsesStore.length} Submissions</span
          >
        </div>
        <div
          class="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center text-teal-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-inbox-icon lucide-inbox"
            ><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path
              d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
            /></svg
          >
        </div>
      </div>
    </div>
  </header>

  <main class="max-w-4xl mx-auto p-6 pb-32">
    {#if loading}
      <div class="flex flex-col items-center justify-center py-32 space-y-4">
        <SMFBLoading color="teal" />
        <p class="text-gray-400 text-sm font-medium animate-pulse">
          Gathering submissions...
        </p>
      </div>
    {:else if $formResponsesStore.length === 0}
      <div
        class="text-center py-32 bg-white rounded-[2rem] border-2 border-dashed border-gray-100 flex flex-col items-center"
      >
        <div
          class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6"
        >
          <i class="fas fa-comment-slash text-3xl"></i>
        </div>
        <h3 class="text-gray-800 font-bold">No data yet</h3>
        <p class="text-gray-400 text-sm max-w-xs mx-auto mt-2">
          Share your form link with your audience to start seeing responses
          here.
        </p>
      </div>
    {:else}
      <div class="grid grid-cols-1 gap-6">
        {#each $formResponsesStore as res (res.id)}
          <div
            class="bg-white rounded-[2rem] shadow-sm border border-gray-100 transition-all hover:shadow-md overflow-hidden group"
          >
            <div class="px-6 py-5 bg-white flex justify-between items-center">
              <div class="flex items-center gap-4">
                <div class="pl-10">
                  <h4 class="text-md font-black text-gray-800">
                    {res.submittedBy?.firstName || "Guest User"}
                    {res.submittedBy?.lastName || ""}
                  </h4>
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-400 font-medium">
                      @{res.submittedBy?.username || "anonymous"}
                    </span>
                    <span class="w-1 h-1 bg-gray-200 rounded-full"></span>
                    <span
                      class="text-xs text-teal-500 font-bold uppercase tracking-tighter"
                    >
                      {formatDate(res.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                on:click={() => handleDelete(res.id)}
                class="opacity-0 group-hover:opacity-100 p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>

            <div class="px-6 pb-6 pt-2">
              <div
                class="bg-gray-50/50 rounded-3xl p-4 sm:p-6 space-y-6 border border-gray-50"
              >
                {#each res.answers.filter(a => !isEmptyAnswer(a.value)) as answer}
                  <div class="relative pl-6 border-l-2 border-teal-100">
                    <p
                      class="text-[10px] font-black text-teal-600 uppercase tracking-widest mb-2"
                    >
                      {getQuestionLabel(answer.questionId)}
                    </p>
                    <p
                      class="text-gray-700 text-sm font-medium leading-relaxed"
                    >
                      {answer.value}
                    </p>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </main>
</div>

<style>
  /* Optional: Smooth transition for card appearance */
  main {
    animation: fadeIn 0.4s ease-out;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>

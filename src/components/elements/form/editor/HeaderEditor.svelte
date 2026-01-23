<script>
  import QuestionWrapper from "../shared/QuestionWrapper.svelte";
  export let question;
  export let active = false;
  export let onDelete;
</script>

<QuestionWrapper {active}>
  <div class="space-y-4">
    <div class="flex items-center gap-2 text-[#4db6ac] mb-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h7"
        />
      </svg>
      <span class="text-xs font-bold uppercase tracking-wider"
        >Section Header</span
      >
    </div>

    <input
      bind:value={question.title}
      placeholder="Section Title"
      class="w-full text-2xl font-bold text-gray-800 border-b-2 border-transparent focus:border-[#4db6ac] outline-none pb-1 bg-transparent transition-all"
    />

    <div class="relative group">
      <textarea
        bind:value={question.description}
        placeholder="Add a description or instructions for this section..."
        rows="2"
        class="w-full bg-gray-50/50 p-4 rounded-lg border border-gray-100 focus:border-[#4db6ac] focus:bg-white outline-none text-gray-600 text-base transition-all resize-none leading-relaxed"
      ></textarea>
      <div
        class="absolute bottom-2 right-3 text-[10px] text-gray-400 opacity-0 group-focus-within:opacity-100 transition-opacity"
      >
        Markdown supported
      </div>
    </div>
  </div>

  <div class="mt-6 pt-4 border-t border-gray-50 flex justify-end">
    <button
      on:click|stopPropagation={onDelete}
      class="flex items-center gap-2 px-3 py-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all text-sm font-medium"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      Delete Section
    </button>
  </div>
</QuestionWrapper>

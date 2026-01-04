<script>
  import QuestionWrapper from "$components/elements/form/shared/QuestionWrapper.svelte";
  export let question;

  let answer = "";
  let checklist = [];

  $: options = question.options || [];
</script>

<QuestionWrapper active={false}>
  <div class="mb-4">
    <span class="text-lg font-medium text-gray-800">
      {question.title || "Untitled Question"}
    </span>
    {#if question.required}
      <span class="text-red-500 ml-1" title="Required">*</span>
    {/if}
  </div>

  {#if question.type === "TEXT"}
    <input
      type="text"
      placeholder="Your answer"
      class="w-full border-b border-gray-200 focus:border-[#4db6ac] outline-none py-2 transition-colors bg-transparent"
    />
  {:else if question.type === "SELECT"}
    <div class="space-y-3">
      {#each options as option}
        <label class="flex items-center gap-3 cursor-pointer group">
          <input
            type="radio"
            name={question.id}
            bind:group={answer}
            value={option}
            class="w-4 h-4 accent-[#4db6ac] cursor-pointer"
          />
          <span class="text-gray-700 group-hover:text-black transition-colors"
            >{option}</span
          >
        </label>
      {/each}
    </div>
  {:else if question.type === "CHECKBOX"}
    <div class="space-y-3">
      {#each options as option}
        <label class="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            value={option}
            bind:group={checklist}
            class="w-4 h-4 accent-[#4db6ac] cursor-pointer rounded"
          />
          <span class="text-gray-700 group-hover:text-black transition-colors"
            >{option}</span
          >
        </label>
      {/each}
    </div>
  {:else if question.type === "HEADER"}
    <p class="text-sm text-gray-500 italic">
      {question.description || ""}
    </p>
  {/if}
</QuestionWrapper>

<script>
  import QuestionWrapper from "$components/elements/form/shared/QuestionWrapper.svelte";
  export let question;
  let answer = "";
  let checklist = [];
</script>

<QuestionWrapper>
  <div class="mb-4">
    <span class="text-lg font-medium">{question.title}</span>
    {#if question.required}<span class="text-red-500 ml-1">*</span>{/if}
  </div>

  {#if question.type === "short-answer"}
    <input
      type="text"
      placeholder="Your answer"
      class="w-full border-b focus:border-[#4db6ac] outline-none py-2"
    />
  {:else if question.type === "multiple-choice"}
    <div class="space-y-3">
      {#each question.options as option}
        <label class="flex items-center gap-3 cursor-pointer group">
          <input
            type="radio"
            bind:group={answer}
            value={option}
            class="w-4 h-4 accent-[#4db6ac]"
          />
          <span class="group-hover:text-gray-600">{option}</span>
        </label>
      {/each}
    </div>
  {:else if question.type === "checkbox"}
    <div class="space-y-3">
      {#each question.options as option}
        <label class="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            value={option}
            bind:group={checklist}
            class="w-4 h-4 accent-[#4db6ac]"
          />
          <span class="group-hover:text-gray-600">{option}</span>
        </label>
      {/each}
    </div>
  {/if}
</QuestionWrapper>

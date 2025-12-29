<script>
  import QuestionWrapper from "../shared/QuestionWrapper.svelte";
  export let question;
</script>

{#if question.type === "header"}
  <div
    class="bg-white rounded-xl shadow-sm border-t-8 border-[#4db6ac] p-8 mb-8 transition-all hover:shadow-md"
  >
    <h2 class="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
      {question.title || "Untitled Section"}
    </h2>

    {#if question.description}
      <div class="h-[2px] w-12 bg-gray-100 mb-4"></div>
      <p class="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
        {question.description}
      </p>
    {/if}
  </div>
{:else}
  <QuestionWrapper>
    <div class="space-y-4">
      <div class="flex items-start gap-2">
        <h3 class="text-xl font-semibold text-gray-800 leading-tight">
          {question.title || "Untitled Question"}
        </h3>
        {#if question.required}
          <span class="text-red-500 font-bold" title="Required">*</span>
        {/if}
      </div>

      <div class="pt-2">
        {#if question.type === "short-answer"}
          <input
            type="text"
            placeholder="Your answer"
            class="w-full border-b-2 border-gray-100 focus:border-[#4db6ac] outline-none py-2 transition-colors"
          />
        {:else if question.type === "multiple-choice"}
          <div class="space-y-3">
            {#each question.options as option}
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name={question.id}
                  class="w-5 h-5 accent-[#4db6ac]"
                />
                <span
                  class="text-gray-700 group-hover:text-black transition-colors"
                  >{option}</span
                >
              </label>
            {/each}
          </div>
        {:else if question.type === "checkbox"}
          <div class="space-y-3">
            {#each question.options as option}
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  class="w-5 h-5 rounded accent-[#4db6ac]"
                />
                <span
                  class="text-gray-700 group-hover:text-black transition-colors"
                  >{option}</span
                >
              </label>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </QuestionWrapper>
{/if}

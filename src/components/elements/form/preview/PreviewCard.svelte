<script>
  import QuestionWrapper from "$components/elements/form/shared/QuestionWrapper.svelte";
  export let question;

  let answer = "";
  let checklist = [];

  $: options = question.options || [];
  $: scaleMin = question.scaleMin || 1;
  $: scaleMax = question.scaleMax || 5;
  $: scaleNumbers = Array.from(
    { length: scaleMax - scaleMin + 1 },
    (_, i) => scaleMin + i
  );
</script>

<QuestionWrapper active={false}>
  {#if question.type !== "HEADER" && question.type !== "header"}
    <div class="mb-4">
      <span class="text-lg font-medium text-gray-800">
        {question.label || question.title || "Untitled Question"}
      </span>
      {#if question.required}
        <span class="text-red-500 ml-1" title="Required">*</span>
      {/if}
    </div>
    {#if question.description}
      <p class="text-sm text-gray-500 mb-3">{question.description}</p>
    {/if}
  {/if}

  {#if question.type === "TEXT"}
    <input
      type="text"
      placeholder="Your answer"
      disabled
      class="w-full border-b border-gray-200 focus:border-[#4db6ac] outline-none py-2 transition-colors bg-transparent"
    />
  {:else if question.type === "PARAGRAPH"}
    <textarea
      placeholder="Your answer"
      rows="4"
      disabled
      class="w-full border border-gray-200 rounded-lg p-3 focus:border-[#4db6ac] outline-none transition-colors resize-none bg-transparent"
    ></textarea>
  {:else if question.type === "MULTIPLE_CHOICE" || question.type === "SELECT"}
    <div class="space-y-3">
      {#each options as option}
        <label class="flex items-center gap-3 cursor-pointer group">
          <input
            type="radio"
            name={question._id || question.id}
            value={option}
            disabled
            class="w-4 h-4 accent-[#4db6ac] cursor-pointer"
          />
          <span class="text-gray-700 group-hover:text-black transition-colors"
            >{option}</span
          >
        </label>
      {/each}
    </div>
  {:else if question.type === "CHECKBOXES"}
    <div class="space-y-3">
      {#each options as option}
        <label class="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            value={option}
            disabled
            class="w-4 h-4 accent-[#4db6ac] cursor-pointer rounded"
          />
          <span class="text-gray-700 group-hover:text-black transition-colors"
            >{option}</span
          >
        </label>
      {/each}
    </div>
  {:else if question.type === "DATE"}
    <input
      type="date"
      disabled
      class="w-full border-b border-gray-200 focus:border-[#4db6ac] outline-none py-2 transition-colors bg-transparent"
    />
  {:else if question.type === "TIME"}
    <input
      type="time"
      disabled
      class="w-full border-b border-gray-200 focus:border-[#4db6ac] outline-none py-2 transition-colors bg-transparent"
    />
  {:else if question.type === "EMAIL"}
    <input
      type="email"
      placeholder="your.email@example.com"
      disabled
      class="w-full border-b border-gray-200 focus:border-[#4db6ac] outline-none py-2 transition-colors bg-transparent"
    />
  {:else if question.type === "LINEAR_SCALE"}
    <div class="flex items-center gap-2">
      <span class="text-sm text-gray-600">{scaleMin}</span>
      <div class="flex gap-4">
        {#each scaleNumbers as num}
          <label class="flex flex-col items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name={question._id || question.id}
              value={num}
              disabled
              class="w-4 h-4 accent-[#4db6ac] cursor-pointer"
            />
            <span class="text-xs text-gray-600">{num}</span>
          </label>
        {/each}
      </div>
      <span class="text-sm text-gray-600">{scaleMax}</span>
    </div>
  {:else if question.type === "HEADER" || question.type === "header"}
    <div class="mb-2">
      <h3 class="text-xl font-bold text-gray-900">
        {question.label || question.title || "Header"}
      </h3>
      {#if question.description}
        <p class="text-sm text-gray-500 mt-2">{question.description}</p>
      {/if}
    </div>
  {:else}
    <!-- Fallback for unknown types -->
    <input
      type="text"
      placeholder="Your answer"
      disabled
      class="w-full border-b border-gray-200 focus:border-[#4db6ac] outline-none py-2 transition-colors bg-transparent"
    />
  {/if}
</QuestionWrapper>

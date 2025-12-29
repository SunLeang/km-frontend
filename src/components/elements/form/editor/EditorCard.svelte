<script>
  import QuestionWrapper from "$components/elements/form/shared/QuestionWrapper.svelte";
  import ShortAnswer from "$components/elements/form/editor/types/ShortAnswer.svelte";
  import MultipleChoice from "$components/elements/form/editor/types/MultipleChoice.svelte";
  import Checkbox from "$components/elements/form/editor/types/Checkbox.svelte";
  import HeaderEditor from "$components/elements/form/editor/HeaderEditor.svelte";

  export let question;
  export let active = false;
  export let onDelete;

  const types = [
    { id: "short-answer", label: "Short Answer", component: ShortAnswer },
    {
      id: "multiple-choice",
      label: "Multiple Choice",
      component: MultipleChoice,
    },
    { id: "checkbox", label: "Checkboxes", component: Checkbox },
    { id: "header", label: "Section Header", component: HeaderEditor },
  ];

  function addOption() {
    question.options = [
      ...question.options,
      `Option ${question.options.length + 1}`,
    ];
  }

  function removeOption(index) {
    if (question.options.length > 1) {
      question.options = question.options.filter((_, i) => i !== index);
    }
  }

  // Find which component to render based on question.type
  $: currentType = types.find((t) => t.id === question.type) || types[0];
  $: isHeader = question.type === "header";
</script>

<QuestionWrapper {active}>
  <div class="flex flex-col sm:flex-row gap-4 mb-6">
    <input
      bind:value={question.title}
      placeholder="Question"
      class="flex-1 bg-gray-50 p-3 border-b-2 border-transparent focus:border-[#4db6ac] outline-none text-lg transition-colors font-medium"
    />

    <select
      bind:value={question.type}
      class="bg-white border rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-gray-50"
    >
      {#each types as type}
        <option value={type.id}>{type.label}</option>
      {/each}
    </select>
  </div>

  <div class="min-h-[50px]">
    <svelte:component
      this={currentType.component}
      {question}
      {addOption}
      {removeOption}
    />
  </div>

  <div
    class="mt-6 pt-4 border-t flex justify-end items-center gap-6 text-gray-500"
  >
    <button
      on:click|stopPropagation={onDelete}
      class="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"
      title="Delete Question"
    >
      <span class="text-sm font-medium">Delete</span>
    </button>

    <div class="h-6 w-[1px] bg-gray-200"></div>

    <label class="flex items-center gap-2 cursor-pointer select-none">
      <span class="text-sm">Required</span>
      <input
        type="checkbox"
        bind:checked={question.required}
        class="w-4 h-4 accent-[#4db6ac] cursor-pointer"
      />
    </label>
  </div>
</QuestionWrapper>

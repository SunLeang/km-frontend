<script>
  import QuestionWrapper from "$components/elements/form/shared/QuestionWrapper.svelte";
  import ShortAnswer from "$components/elements/form/editor/question-types/ShortAnswer.svelte";
  import MultipleChoice from "$components/elements/form/editor/question-types/MultipleChoice.svelte";
  import Checkbox from "$components/elements/form/editor/question-types/Checkbox.svelte";
  import LongAnswer from "./question-types/LongAnswer.svelte";
  import LinearScale from "./question-types/LinearScale.svelte";
  import SpecializedInput from "./question-types/SpecializedInput.svelte";

  export let question;
  export let active = false;
  export let onDelete;

  const types = [
    { id: "TEXT", label: "Short Answer", component: ShortAnswer },
    { id: "PARAGRAPH", label: "Paragraph", component: LongAnswer },
    {
      id: "MULTIPLE_CHOICE",
      label: "Multiple Choice",
      component: MultipleChoice,
    },
    { id: "CHECKBOXES", label: "Checkboxes", component: Checkbox },
    { id: "SELECT", label: "Dropdown", component: MultipleChoice },
    { id: "DATE", label: "Date", component: SpecializedInput },
    { id: "TIME", label: "Time", component: SpecializedInput },
    { id: "EMAIL", label: "Email", component: SpecializedInput },
    { id: "LINEAR_SCALE", label: "Linear Scale", component: LinearScale },
  ];

  function addOption() {
    const choiceTypes = ["MULTIPLE_CHOICE", "CHECKBOXES", "SELECT"];
    if (choiceTypes.includes(question.type)) {
      const currentOptions = question.options || [];
      question.options = [
        ...currentOptions,
        `Option ${currentOptions.length + 1}`,
      ];
    }
  }

  function removeOption(index) {
    if (question.options && question.options.length > 1) {
      question.options = question.options.filter((_, i) => i !== index);
    }
  }

  $: currentType = types.find((t) => t.id === question.type) || types[0];

  $: if (
    ["MULTIPLE_CHOICE", "CHECKBOXES", "SELECT"].includes(question.type) &&
    (!question.options || question.options.length === 0)
  ) {
    question.options = ["Option 1"];
  }
</script>

<QuestionWrapper {active}>
  <div class="flex flex-col sm:flex-row gap-4 mb-6">
    <input
      bind:value={question.label}
      placeholder="Question Label"
      class="flex-1 bg-gray-50 p-3 border-b-2 border-transparent focus:border-[#4db6ac] outline-none text-lg transition-colors font-medium rounded-t-md"
    />

    <select
      bind:value={question.type}
      class="bg-white border border-gray-200 rounded-md px-3 py-2 text-sm cursor-pointer hover:border-[#4db6ac] outline-none transition-all"
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
      type="button"
      on:click|stopPropagation={onDelete}
      class="p-2 px-3 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors flex items-center gap-2"
    >
      <i class="fas fa-trash-alt text-xs"></i>
      <span class="text-xs font-semibold uppercase tracking-wider">Delete</span>
    </button>

    <div class="h-6 w-[1px] bg-gray-200"></div>

    <label class="flex items-center gap-2 cursor-pointer select-none group">
      <span
        class="text-xs font-semibold uppercase tracking-wider group-hover:text-gray-700"
        >Required</span
      >
      <input
        type="checkbox"
        bind:checked={question.required}
        class="w-4 h-4 accent-[#4db6ac] cursor-pointer"
      />
    </label>
  </div>
</QuestionWrapper>

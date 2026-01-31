<script>
  import TextInput from "$components/elements/form/appointment-form/question-types/TextInput.svelte";
  import MultipleChoiceDisplay from "$components/elements/form/appointment-form/question-types/MultipleChoiceDisplay.svelte";
  import CheckboxDisplay from "$components/elements/form/appointment-form/question-types/CheckboxDisplay.svelte";
  import HeaderDisplay from "$components/elements/form/appointment-form/question-types/HeaderDisplay.svelte";
  import LinearScaleDisplay from "$components/elements/form/appointment-form/question-types/LinearScaleDisplay.svelte";
  import LongAnswerDisplay from "$components/elements/form/appointment-form/question-types/LongAnswerDisplay.svelte";
  import SpecializedInputDisplay from "$components/elements/form/appointment-form/question-types/SpecializedInputDisplay.svelte";

  export let question;
  export let value;

  const components = {
    // Text-based inputs
    TEXT: TextInput,
    PARAGRAPH: LongAnswerDisplay,
    text: TextInput,
    textarea: LongAnswerDisplay,
    
    // Choice-based inputs
    MULTIPLE_CHOICE: MultipleChoiceDisplay,
    CHECKBOXES: CheckboxDisplay,
    SELECT: MultipleChoiceDisplay,
    multipleChoice: MultipleChoiceDisplay,
    checkbox: CheckboxDisplay,
    
    // Specialized inputs
    DATE: SpecializedInputDisplay,
    TIME: SpecializedInputDisplay,
    EMAIL: SpecializedInputDisplay,
    PHONE: SpecializedInputDisplay,
    NUMBER: SpecializedInputDisplay,
    URL: SpecializedInputDisplay,
    
    // Scale
    LINEAR_SCALE: LinearScaleDisplay,
    
    // Header
    header: HeaderDisplay,
  };

  $: currentComponent = components[question.type] || TextInput;
</script>

<div class="bg-gray-50 p-5 rounded-2xl border border-gray-100">
  {#if question.type !== "header"}
    <label class="block text-lg font-semibold text-gray-800 mb-2">
      {question.label}
      {#if question.required}
        <span class="text-red-500">*</span>
      {/if}
    </label>
    {#if question.description}
      <p class="text-sm text-gray-500 mb-3">{question.description}</p>
    {/if}
  {/if}

  <svelte:component this={currentComponent} bind:value {question} />
</div>

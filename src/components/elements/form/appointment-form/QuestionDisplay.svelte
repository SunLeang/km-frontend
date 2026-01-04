<script>
  import TextInput from "$components/elements/form/appointment-form/question-types/TextInput.svelte";
  import MultipleChoiceDisplay from "$components/elements/form/appointment-form/question-types/MultipleChoiceDisplay.svelte";
  import CheckboxDisplay from "$components/elements/form/appointment-form/question-types/CheckboxDisplay.svelte";
  import HeaderDisplay from "$components/elements/form/appointment-form/question-types/HeaderDisplay.svelte";

  export let question;
  export let value;

  const components = {
    text: TextInput,
    textarea: TextInput,
    multipleChoice: MultipleChoiceDisplay,
    checkbox: CheckboxDisplay,
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

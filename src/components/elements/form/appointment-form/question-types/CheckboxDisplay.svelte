<script>
  export let value;
  export let question;

  if (!Array.isArray(value)) {
    value = [];
  }

  function toggleCheckbox(option) {
    if (value.includes(option)) {
      value = value.filter((item) => item !== option);
    } else {
      value = [...value, option];
    }
  }
</script>

<div class="space-y-3">
  {#each question.options || [] as option}
    <label class="flex items-center space-x-3 cursor-pointer">
      <input
        type="checkbox"
        value={option}
        checked={value.includes(option)}
        on:change={() => toggleCheckbox(option)}
        class="h-5 w-5 text-[#4db6ac] border-gray-300 rounded focus:ring-[#4db6ac]"
      />
      <span class="text-gray-700 text-base">{option}</span>
    </label>
  {/each}
</div>

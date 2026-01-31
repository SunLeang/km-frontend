<script>
  export let question;
  export let value;

  const min = question.scaleMin || 1;
  const max = question.scaleMax || 5;

  $: options = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  
  // Ensure value is always a number when selected
  function handleChange(selectedValue) {
    value = Number(selectedValue);
  }
</script>

<div class="flex flex-col gap-3">
  <div class="flex items-center justify-between px-2">
    <span class="text-sm text-gray-500">{min}</span>
    <span class="text-sm text-gray-500">{max}</span>
  </div>
  
  <div class="flex items-center justify-between gap-2">
    {#each options as option}
      <label class="flex flex-col items-center gap-1 cursor-pointer flex-1">
        <input
          type="radio"
          name="linear-scale-{question.id || question._id}"
          checked={value === option}
          on:change={() => handleChange(option)}
          class="w-5 h-5 text-[#4db6ac] focus:ring-2 focus:ring-[#4db6ac] cursor-pointer"
        />
        <span class="text-sm font-medium text-gray-700">{option}</span>
      </label>
    {/each}
  </div>
</div>

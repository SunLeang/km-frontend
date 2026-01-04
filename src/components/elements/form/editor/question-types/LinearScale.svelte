<script>
  export let question;

  // Initialize defaults if not present
  $: if (!question.scaleMin) question.scaleMin = 1;
  $: if (!question.scaleMax) question.scaleMax = 5;
</script>

<div class="flex items-center gap-4 py-4 bg-gray-50 rounded-lg px-4">
  <div class="flex items-center gap-2">
    <span class="text-sm text-gray-500">Min:</span>
    <select bind:value={question.scaleMin} class="border rounded p-1">
      <option value={0}>0</option>
      <option value={1}>1</option>
    </select>
  </div>

  <div class="text-gray-300">to</div>

  <div class="flex items-center gap-2">
    <span class="text-sm text-gray-500">Max:</span>
    <select bind:value={question.scaleMax} class="border rounded p-1">
      {#each [2, 3, 4, 5, 6, 7, 8, 9, 10] as num}
        <option value={num}>{num}</option>
      {/each}
    </select>
  </div>
</div>

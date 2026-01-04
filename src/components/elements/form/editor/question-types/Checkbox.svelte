<script>
  export let question;
  export let addOption;
  export let removeOption;
</script>

<div class="space-y-3">
  {#each question.options as _, i}
    <div class="flex items-center gap-3 group">
      <div class="w-4 h-4 border-2 border-gray-300 rounded-sm"></div>
      <input
        bind:value={question.options[i]}
        class="flex-1 border-b border-transparent focus:border-gray-300 outline-none p-1"
        placeholder="Option {i + 1}"
      />
      <button
        on:click={() => removeOption(i)}
        class="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ×
      </button>
    </div>
  {/each}
  <button
    on:click={addOption}
    class="text-sm text-teal-600 font-medium mt-2 hover:text-teal-700"
  >
    + Add option
  </button>
</div>

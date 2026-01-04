<script>
  export let value;
  export let question;
</script>

<div class="space-y-3">
  {#each question.options || [] as option}
    <label class="flex items-center space-x-3 cursor-pointer">
      <input
        type="radio"
        name={question._id}
        value={option}
        bind:group={value}
        class="h-5 w-5 text-[#4db6ac] border-gray-300 focus:ring-[#4db6ac]"
      />
      <span class="text-gray-700 text-base">{option}</span>
    </label>
  {/each}
</div>

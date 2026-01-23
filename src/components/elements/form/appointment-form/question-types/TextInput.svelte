<script>
  export let value;
  export let question;
</script>

{#if question.type === "number"}
  <input
    type="number"
    placeholder={question.description || `Enter your answer`}
    bind:value
    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4db6ac] focus:border-transparent outline-none transition-all"
  />
{:else if question.type === "email"}
  <input
    type="email"
    placeholder={question.description || `Enter your email`}
    bind:value
    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4db6ac] focus:border-transparent outline-none transition-all"
  />
{:else if question.type === "textarea"}
  <textarea
    placeholder={question.description || `Enter your answer`}
    bind:value
    rows="4"
    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4db6ac] focus:border-transparent outline-none transition-all"
  ></textarea>
{:else}
  <input
    type="text"
    placeholder={question.description || `Enter your answer`}
    bind:value
    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4db6ac] focus:border-transparent outline-none transition-all"
  />
{/if}

<script>
  export let question;
  export let value;
</script>

{#if question.type === "DATE"}
  <input
    type="date"
    bind:value
    placeholder={question.placeholder || "Your answer"}
    required={question.required}
    class="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-[#4db6ac] outline-none transition-colors bg-white rounded-md"
  />
{:else if question.type === "TIME"}
  <input
    type="time"
    bind:value
    placeholder={question.placeholder || "Your answer"}
    required={question.required}
    class="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-[#4db6ac] outline-none transition-colors bg-white rounded-md"
  />
{:else if question.type === "EMAIL"}
  <input
    type="email"
    bind:value
    placeholder={question.placeholder || "Your answer"}
    required={question.required}
    class="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-[#4db6ac] outline-none transition-colors bg-white rounded-md"
  />
{:else if question.type === "PHONE"}
  <input
    type="tel"
    bind:value
    placeholder={question.placeholder || "Your answer"}
    required={question.required}
    class="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-[#4db6ac] outline-none transition-colors bg-white rounded-md"
  />
{:else if question.type === "NUMBER"}
  <input
    type="number"
    bind:value
    placeholder={question.placeholder || "Your answer"}
    required={question.required}
    class="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-[#4db6ac] outline-none transition-colors bg-white rounded-md"
  />
{:else if question.type === "URL"}
  <input
    type="url"
    bind:value
    placeholder={question.placeholder || "Your answer"}
    required={question.required}
    class="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-[#4db6ac] outline-none transition-colors bg-white rounded-md"
  />
{:else}
  <input
    type="text"
    bind:value
    placeholder={question.placeholder || "Your answer"}
    required={question.required}
    class="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-[#4db6ac] outline-none transition-colors bg-white rounded-md"
  />
{/if}

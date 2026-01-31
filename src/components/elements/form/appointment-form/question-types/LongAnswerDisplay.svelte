<script>
  export let question;
  export let value;
</script>

<textarea
  bind:value
  placeholder={question.placeholder || "Your answer"}
  required={question.required}
  rows="5"
  class="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-[#4db6ac] outline-none transition-colors resize-none bg-white rounded-md"
/>

<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div class="flex flex-col items-center gap-4 mt-8">
  <div
    class="flex gap-2 p-2 bg-white rounded-2xl shadow-md border border-gray-100"
  >
    <button
      on:click={() => dispatch("addQuestion")}
      class="flex items-center gap-2 px-4 py-2 hover:bg-teal-50 text-teal-700 rounded-xl transition-colors font-medium"
    >
      <span>+</span> Add Question
    </button>
  </div>
</div>

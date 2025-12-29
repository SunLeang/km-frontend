<script>
  import EditorCard from "$components/elements/form/editor/EditorCard.svelte";
  // ADD THIS IMPORT:
  import HeaderEditor from "$components/elements/form/editor/HeaderEditor.svelte";
  import PreviewCard from "$components/elements/form/preview/PreviewCard.svelte";
  import AddNewQuestion from "$components/elements/form/editor/AddNewQuestion.svelte";

  let questions = [];
  let view = "edit";
  let activeId = null;

  function handleAddQuestion() {
    const newQ = {
      id: crypto.randomUUID(),
      type: "short-answer",
      title: "",
      options: ["Option 1"],
      required: false,
    };
    questions = [...questions, newQ];
    activeId = newQ.id;
  }

  function handleAddHeader() {
    const newH = {
      id: crypto.randomUUID(),
      type: "header",
      title: "",
      description: "",
    };
    questions = [...questions, newH];
    activeId = newH.id;
  }
</script>

<main class="max-w-2xl mx-auto px-4 pt-8 pb-40">
  <div class="flex justify-center gap-4 mb-8">
    <button
      on:click={() => (view = "edit")}
      class="px-4 py-2 {view === 'edit'
        ? 'border-b-2 border-teal-600 font-bold text-teal-700'
        : 'text-gray-500'}"
    >
      Editor
    </button>
    <button
      on:click={() => (view = "preview")}
      class="px-4 py-2 {view === 'preview'
        ? 'border-b-2 border-teal-600 font-bold text-teal-700'
        : 'text-gray-500'}"
    >
      Preview
    </button>
  </div>

  {#if view === "edit"}
    {#each questions as q (q.id)}
      <div
        role="button"
        tabindex="0"
        aria-label="Edit item"
        on:click={() => (activeId = q.id)}
        on:keydown={(e) =>
          (e.key === "Enter" || e.key === " ") && (activeId = q.id)}
        class="outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-xl mb-4 text-left w-full"
      >
        {#if q.type === "header"}
          <HeaderEditor
            bind:question={q}
            active={activeId === q.id}
            onDelete={() =>
              (questions = questions.filter((item) => item.id !== q.id))}
          />
        {:else}
          <EditorCard
            bind:question={q}
            active={activeId === q.id}
            onDelete={() =>
              (questions = questions.filter((item) => item.id !== q.id))}
          />
        {/if}
      </div>
    {/each}

    <AddNewQuestion
      on:addQuestion={handleAddQuestion}
      on:addHeader={handleAddHeader}
    />
  {:else}
    <div class="space-y-4">
      {#each questions as q (q.id)}
        <PreviewCard question={q} />
      {/each}

      {#if questions.length === 0}
        <div class="text-center py-20 text-gray-400">
          No questions yet. Switch to Editor to add some!
        </div>
      {/if}
    </div>
  {/if}
</main>

<div
  class="fixed bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#e0f2f1] pointer-events-none"
>
  <div class="max-w-2xl mx-auto pointer-events-auto">
    <button
      class="w-full py-4 bg-[#4db6ac] text-white rounded-xl font-bold shadow-lg"
    >
      Save Form
    </button>
  </div>
</div>

<script>
  import { onMount, tick } from "svelte";
  import { page } from "$app/stores";
  import {
    getFormBySlug,
    updateForm,
  } from "$providers/actions/kchannel/user-appointment/user-appointment";

  import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import EditorCard from "$components/elements/form/editor/EditorCard.svelte";
  import PreviewCard from "$components/elements/form/preview/PreviewCard.svelte";
  import AddNewQuestion from "$components/elements/form/editor/AddNewQuestion.svelte";

  let loading = true;
  let saving = false;
  let view = "edit";
  let activeId = null;

  let form = {
    id: "",
    title: "",
    description: "",
    questions: [],
  };

  onMount(async () => {
    try {
      loading = true;
      const slug = $page.params.formId;
      const res = await getFormBySlug.load(slug);
      if (res?.success) {
        const rawForm = res.data?.appointmentGetFormBySlug || res.data;
        form = {
          ...rawForm,
          questions: (rawForm.questions || []).map((q) => ({
            ...q,
            _id: q._id || q.id,
          })),
        };
      }
    } catch (err) {
      console.error("Error loading form:", err);
    } finally {
      loading = false;
    }
  });

  async function handleAddQuestion() {
    const newQ = {
      _id: crypto.randomUUID(),
      type: "TEXT",
      label: "",
      options: [],
      required: false,
    };
    form.questions = [...form.questions, newQ];
    activeId = newQ._id;

    await tick();
    document.getElementById(newQ._id)?.scrollIntoView({ behavior: "smooth" });
  }

  function handleAddHeader() {
    const newH = {
      _id: crypto.randomUUID(),
      type: "header",
      label: "",
      description: "",
    };
    form.questions = [...form.questions, newH];
    activeId = newH._id;
  }

  function deleteQuestion(id) {
    form.questions = form.questions.filter((q) => (q._id || q.id) !== id);
  }

  async function handleSave() {
    try {
      saving = true;

      const formattedQuestions = form.questions.map((q) => {
        const payload = {
          type: q.type,
          label: q.label || "Untitled Question",
          description: q.description || "",
          required: !!q.required,
          options: q.options || [],
        };

        // Handle Linear Scale numbers strictly
        if (q.type === "LINEAR_SCALE") {
          payload.scaleMin = Number(q.scaleMin ?? 1);
          payload.scaleMax = Number(q.scaleMax ?? 5);
        }

        const isRealId = q._id && !q._id.includes("-");
        if (isRealId) payload._id = q._id;

        return payload;
      });

      const res = await updateForm.load({
        id: form.id,
        title: form.title,
        description: form.description,
        questions: formattedQuestions,
      });

      if (res?.success) alert("Changes saved successfully!");
    } catch (err) {
      console.error("Save Error:", err);
      alert(`Error: ${err.message || "Failed to save"}`);
    } finally {
      saving = false;
    }
  }
</script>

<div class="min-h-screen bg-[#f9fafb]">
  <header
    class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100"
  >
    <div class="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
      <h1 class="text-base font-bold text-gray-800 truncate">
        {loading ? "Loading..." : form.title || "Edit Form"}
      </h1>

      <div class="flex gap-2">
        <div class="bg-gray-100 p-1 rounded-full flex mr-2">
          <button
            on:click={() => (view = "edit")}
            class="px-3 py-1 rounded-full text-xs font-bold {view === 'edit'
              ? 'bg-white shadow-sm text-teal-600'
              : 'text-gray-500'}">Edit</button
          >
          <button
            on:click={() => (view = "preview")}
            class="px-3 py-1 rounded-full text-xs font-bold {view === 'preview'
              ? 'bg-white shadow-sm text-teal-600'
              : 'text-gray-500'}">Preview</button
          >
        </div>

        <button
          on:click={handleSave}
          disabled={saving}
          class="px-5 py-2 bg-[#4db6ac] text-white text-sm font-bold rounded-full hover:bg-[#3d968e] transition-all disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  </header>

  <main class="max-w-3xl mx-auto p-4 pb-32">
    {#if loading}
      <div class="flex justify-center py-20"><SMFBLoading color="teal" /></div>
    {:else}
      <section
        class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6"
      >
        <input
          bind:value={form.title}
          placeholder="Form Title"
          class="w-full text-2xl font-bold border-none outline-none mb-2"
        />
        <textarea
          bind:value={form.description}
          placeholder="Form Description"
          class="w-full text-gray-500 border-none outline-none resize-none"
          rows="2"
        ></textarea>
      </section>

      {#if view === "edit"}
        <div class="space-y-4">
          {#each form.questions as q (q._id || q.id)}
            <div
              id={q._id || q.id}
              role="button"
              tabindex="0"
              on:click={() => (activeId = q._id || q.id)}
              on:keydown={(e) =>
                e.key === "Enter" && (activeId = q._id || q.id)}
              class="text-left w-full outline-none"
            >
              <EditorCard
                bind:question={q}
                active={activeId === (q._id || q.id)}
                onDelete={() => deleteQuestion(q._id || q.id)}
              />
            </div>
          {/each}
        </div>
        <AddNewQuestion
          on:addQuestion={handleAddQuestion}
          on:addHeader={handleAddHeader}
        />
      {:else}
        <div class="space-y-4">
          {#each form.questions as q}
            <PreviewCard question={q} />
          {/each}
        </div>
      {/if}
    {/if}
  </main>
</div>

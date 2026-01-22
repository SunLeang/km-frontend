<script>
  import { onMount, tick } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import {
    getFormBySlug,
    updateForm,
    deleteForm,
  } from "$providers/actions/kchannel/user-appointment/user-appointment";

  import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import EditorCard from "$components/elements/form/editor/EditorCard.svelte";
  import PreviewCard from "$components/elements/form/preview/PreviewCard.svelte";
  import AddNewQuestion from "$components/elements/form/editor/AddNewQuestion.svelte";
  import ScheduleManager from "$components/appointment/ScheduleManager.svelte";

  let loading = true;
  let saving = false;
  let deleting = false;
  let view = "edit";
  let activeId = null;
  let showPublishSection = false;

  let form = {
    id: "",
    title: "",
    description: "",
    questions: [],
    published: false,
    slug: "",
    channel: null,
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
          published: rawForm.published || false,
          slug: rawForm.slug || slug,
          channel: rawForm.channel || null,
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
        published: form.published,
      });

      if (res?.success) alert("Changes saved successfully!");
    } catch (err) {
      console.error("Save Error:", err);
      alert(`Error: ${err.message || "Failed to save"}`);
    } finally {
      saving = false;
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this form? This action cannot be undone.")) {
      return;
    }

    try {
      deleting = true;
      const channelId = $page.params.channelId;
      
      const res = await deleteForm.load({ id: form.id });

      if (res?.success) {
        alert("Form deleted successfully!");
        goto(`/dashboard/channel/${channelId}/appointment/form`);
      } else {
        alert("Failed to delete form");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert(`Error: ${err.message || "Failed to delete"}`);
    } finally {
      deleting = false;
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
          on:click={handleDelete}
          disabled={deleting}
          class="px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-full hover:bg-red-600 transition-all disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>

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

      <!-- Publish Section -->
      <section class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-bold text-gray-800">Publish Appointment Service</h3>
            <p class="text-sm text-gray-500">Make this form available for users to book appointments</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              bind:checked={form.published}
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            <span class="ml-3 text-sm font-medium text-gray-900">{form.published ? "Published" : "Draft"}</span>
          </label>
        </div>

        {#if form.published}
          <div class="bg-green-50 border-l-4 border-green-400 p-4 rounded">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-green-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <div class="flex-1">
                <p class="text-green-800 font-semibold mb-2">📢 This appointment service is LIVE!</p>
                <p class="text-green-700 text-sm mb-3">Users in your channel can now book appointments using this link:</p>
                <div class="bg-white border border-green-200 rounded-lg p-3 flex items-center gap-2">
                  <code class="flex-1 text-sm text-gray-700 break-all">{window.location.origin}/appointment-form/{form.slug}</code>
                  <button
                    on:click={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/appointment-form/${form.slug}`);
                      alert("Link copied to clipboard!");
                    }}
                    class="px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded hover:bg-teal-600 transition-all whitespace-nowrap"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        {:else}
          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-yellow-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              <div>
                <p class="text-yellow-800 font-semibold mb-1">⚠️ This form is currently in Draft mode</p>
                <p class="text-yellow-700 text-sm">Toggle "Published" above and configure schedules below to make it bookable.</p>
              </div>
            </div>
          </div>
        {/if}
      </section>

      <!-- Schedule Management -->
      <ScheduleManager formId={form.id} channelId={form.channel?.id || $page.params.channelId} />

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
      {:else if view === "preview"}
        <!-- Preview Mode Warning -->
        <div class="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
            <p class="text-blue-800 font-semibold">Preview Mode</p>
          </div>
          <p class="text-blue-700 text-sm mt-1">This is how your form will appear to users. Switch to Edit mode to make changes.</p>
        </div>

        <div class="space-y-4">
          {#each form.questions as q}
            <PreviewCard question={q} />
          {/each}
        </div>
      {/if}
    {/if}
  </main>
</div>

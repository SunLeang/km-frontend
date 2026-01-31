<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import {
    getAllForms,
    createForm,
    deleteForm,
  } from "$providers/actions/kchannel/user-appointment/user-appointment";
  import { appointmentForms } from "$providers/stores/kchannel/my-user-appointments";
  import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import Trash from "$components/icons/Trash.svelte";

  let loading = false;
  let deletingFormId = null;

  $: channelId = $page?.params?.channelId || $page?.params?.id || null;

  onMount(async () => {
    try {
      loading = true;
      await getAllForms.load();
    } catch (err) {
      console.error("List Load Error:", err);
    } finally {
      loading = false;
    }
  });

  async function handleCreateNew() {
    try {
      const res = await createForm.load({
        title: "Untitled Form",
        description: "Please fill out this form to schedule your appointment",
        channel: channelId,
      });

      if (res.success) {
        const newSlug = res.data.appointmentCreateFormWithSlug.slug;
        goto(`/dashboard/channel/${channelId}/appointment/form/${newSlug}`);
      }
    } catch (err) {
      console.error("Creation Error:", err);
      alert("Failed to create form");
    }
  }

  async function handleDeleteForm(event, formId, formTitle) {
    event.preventDefault();
    event.stopPropagation();

    if (!confirm(`Are you sure you want to delete "${formTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      deletingFormId = formId;
      const res = await deleteForm.load({ id: formId });

      if (res?.success) {
        // Reload forms to update the list
        await getAllForms.load();
      } else {
        alert("Failed to delete form");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert(`Error: ${err.message || "Failed to delete"}`);
    } finally {
      deletingFormId = null;
    }
  }
</script>

<main class="max-w-4xl mx-auto p-6">
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-2xl font-bold text-gray-800">Appointment Forms</h1>
    <button
      on:click={handleCreateNew}
      class="bg-[#4db6ac] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#3d968e] transition-all"
    >
      + Create New Form
    </button>
  </div>

  {#if loading}
    <div class="flex justify-center py-20"><SMFBLoading color="teal" /></div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {#each $appointmentForms || [] as form}
        <div class="relative group">
          <a
            href={`/dashboard/channel/${channelId}/appointment/form/${form.slug}`}
            class="block p-5 bg-white border rounded-xl shadow-sm hover:border-[#4db6ac] transition-all"
          >
            <h3 class="font-bold text-lg group-hover:text-[#4db6ac] pr-8">
              {form.title}
            </h3>
            <p class="text-gray-500 text-sm">
              {form.description || "No description"}
            </p>
          </a>
          
          <button
            on:click={(e) => handleDeleteForm(e, form.id, form.title)}
            disabled={deletingFormId === form.id}
            class="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
            title="Delete form"
          >
            {#if deletingFormId === form.id}
              <div class="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            {:else}
              <Trash class="w-5 h-5" />
            {/if}
          </button>
        </div>
      {:else}
        <div class="col-span-full py-10 text-center text-gray-400">
          No appointment forms found. Click "Create New" to start.
        </div>
      {/each}
    </div>
  {/if}
</main>

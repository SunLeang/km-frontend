<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import {
    getAllForms,
    createForm,
  } from "$providers/actions/kchannel/user-appointment/user-appointment";
  import { appointmentForms } from "$providers/stores/kchannel/my-user-appointments";
  import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";

  let loading = false;

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
        <a
          href={`/dashboard/channel/${channelId}/appointment/form/${form.slug}`}
          class="p-5 bg-white border rounded-xl shadow-sm hover:border-[#4db6ac] transition-all group"
        >
          <h3 class="font-bold text-lg group-hover:text-[#4db6ac]">
            {form.title}
          </h3>
          <p class="text-gray-500 text-sm">
            {form.description || "No description"}
          </p>
        </a>
      {:else}
        <div class="col-span-full py-10 text-center text-gray-400">
          No appointment forms found. Click "Create New" to start.
        </div>
      {/each}
    </div>
  {/if}
</main>

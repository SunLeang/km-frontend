<script>
  import { page } from "$app/stores";
  import Modal from "$components/elements/modals/Modal.svelte";
  import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { createAppointmentForm } from "$providers/actions/kchannel/appointment";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let shown;

  let title = "";
  let description = "";

  let loadState = {
    loading: false,
    errMsg: "",
  };

  const onCreateForm = async () => {
    try {
      loadState.errMsg = "";
      loadState.loading = true;

      // Following your project's .load() pattern
      const res = await createAppointmentForm.load({
        title: title,
        description: description,
        channel: $page.params.channelId, // Automatically gets channel from URL
      });

      // Dispatch success to parent so it can close the modal or redirect
      dispatch("created", {
        newForm: res.data,
      });
      dispatch("close");
    } catch (err) {
      loadState.errMsg = err.message || "Failed to create form";
    } finally {
      loadState.loading = false;
    }
  };
</script>

{#if shown}
  <div class="flex items-center justify-center w-full h-full">
    <div
      class="flex flex-col relative bg-white z-50 w-full max-w-lg rounded-xl shadow-xl overflow-hidden"
    >
      <form
        on:submit|preventDefault={onCreateForm}
        class="flex flex-col p-8 space-y-6"
      >
        <div class="space-y-4">
          <h2 class="text-xl font-bold text-gray-800">
            Create New Appointment Form
          </h2>

          <div class="flex flex-col space-y-2">
            <label class="pl-1 text-sm font-medium text-gray-600"
              >Form Title</label
            >
            <input
              bind:value={title}
              required
              placeholder="e.g., General Consultation"
              class="w-full h-12 px-4 bg-gray-50 border-2 border-gray-100 rounded-lg focus:border-tertiary-3 outline-none transition-all"
            />
          </div>

          <div class="flex flex-col space-y-2">
            <label class="pl-1 text-sm font-medium text-gray-600"
              >Description (Optional)</label
            >
            <textarea
              bind:value={description}
              placeholder="Briefly describe the purpose of this form..."
              class="w-full h-24 p-4 bg-gray-50 border-2 border-gray-100 rounded-lg focus:border-tertiary-3 outline-none transition-all resize-none"
            ></textarea>
          </div>
        </div>

        {#if loadState.errMsg}
          <div
            class="text-red-500 text-sm bg-red-50 p-3 rounded-lg text-center"
          >
            {loadState.errMsg}
          </div>
        {/if}

        <div class="flex justify-end items-center space-x-4 pt-4">
          <button
            type="button"
            on:click={() => dispatch("close")}
            class="px-6 py-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loadState.loading}
            class="flex items-center px-10 py-2 bg-tertiary-3 hover:bg-tertiary-2 text-white rounded-xl font-semibold shadow-lg shadow-tertiary-3/20 transition-all active:scale-95"
          >
            {#if loadState.loading}
              <SMFBLoading color="white" />
            {:else}
              Create Form
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

<script>
  import { onMount } from "svelte";
  import {
    updateAppointmentForm,
    getAppointmentFormBySlug,
  } from "$providers/actions/kchannel/user-appointment/user-appointment";

  export let slug;

  let questions = [];
  let view = "edit";
  let activeId = null;
  let formId = "";
  let formTitle = "";
  let formDesc = "";
  let loadState = { loading: true, saving: false };

  onMount(async () => {
    const res = await getAppointmentFormBySlug.load({ slug });
    if (res.success) {
      const data = res.data;
      formId = data.id;
      formTitle = data.title;
      questions = data.questions.map((q) => ({
        id: q._id,
        type: q.type,
        title: q.label,
        required: q.required,
        options: q.options || [],
      }));
    }
    loadState.loading = false;
  });

  async function onSaveForm() {
    loadState.saving = true;
    const payload = questions.map((q) => ({
      _id: q.id.toString().includes("-") ? null : q.id,
      label: q.title,
      type: q.type === "header" ? "TEXT" : q.type,
      required: !!q.required,
      options: q.options || [],
    }));

    await updateAppointmentForm.load({
      id: formId,
      questions: payload,
      title: formTitle,
    });
    loadState.saving = false;
    alert("Saved!");
  }
</script>

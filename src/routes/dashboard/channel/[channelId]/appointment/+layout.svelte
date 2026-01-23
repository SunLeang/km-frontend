<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Dashboard from "$components/icons/Dashboard.svelte";
  import Form from "$components/icons/Form.svelte";
  import SettingCog from "$components/icons/Setting/SettingCog.svelte";
  import { getFormByChannelId } from "$providers/actions/kchannel/appointment/form";
  import { onMount } from "svelte";

  let loadFormState = {
    form: null,
    loading: false,
    errMsg: "",
    loaded: false,
  };

  const onLoadForm = async () => {
    try {
      loadFormState.errMsg = "";
      loadFormState.loading = true;
      loadFormState.loaded = false;
      const res = await getFormByChannelId.load({
        channel: $page.params.channelId,
      });
      loadFormState.form = res.data;
      loadFormState.loaded = true;
    } catch (err) {
      loadFormState.errMsg = err.message;
    } finally {
      loadFormState.loading = false;
    }
  };
  onMount(async () => {
    await onLoadForm();
  });

  $: formId = loadFormState.form?.getAppointmentFormsByChannel?.[0]?.id;
  $: chId = $page.params?.channelId;
  $: currentURL = $page.url.pathname;
  $: dashboardURL = `/dashboard/channel/${chId}/appointment`;
  // $: formURL = `/dashboard/channel/${chId}/appointment/form/${formId}`;
  $: formURL = `/dashboard/channel/${chId}/appointment/form/`;
  $: settingURL = `/dashboard/channel/${chId}/appointment/setting`;
</script>

<section class=" flex flex-col items-center h-[92vh] overflow-scroll">
  <ul
    class=" w-[85%] my-[1.3vw] font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400"
  >
    <li class="w-full">
      <div
        on:click={() => {
          goto(dashboardURL);
        }}
        class="{currentURL == dashboardURL
          ? 'text-white bg-[#004E80] '
          : 'bg-white hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 '} duration-150 inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 rounded-s-lg flex items-center justify-center"
      >
        <Dashboard /> <span class=" w-2"></span> Dashboard
      </div>
    </li>
    <li class="w-full">
      <div
        on:click={() => {
          goto(formURL);
        }}
        class="{currentURL == formURL
          ? 'text-white bg-[#004E80] '
          : 'bg-white hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 '} duration-150 inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 flex items-center justify-center"
      >
        <Form /> <span class=" w-2"></span> Form
      </div>
    </li>
    <li class="w-full">
      <div
        on:click={() => {
          goto(settingURL);
        }}
        class="{currentURL == settingURL
          ? 'text-white bg-[#004E80] '
          : 'bg-white hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 '} duration-150 inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 rounded-e-lg flex items-center justify-center"
      >
        <SettingCog /> <span class=" w-2"></span> Setting
      </div>
    </li>
  </ul>

  <section class=" w-[85%] bg-white rounded-lg shadow p-[1vw] h-fit">
    <slot />
  </section>
</section>

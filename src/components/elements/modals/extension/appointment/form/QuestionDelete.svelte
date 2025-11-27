<script>
    import Trash from "$components/icons/Trash.svelte";
    import { createEventDispatcher } from "svelte";
    import { fly } from 'svelte/transition';
    import { deleteAppointmentQuestion } from "$providers/actions/kchannel/appointment/form";

    export let id;

    let dispatch = createEventDispatcher();

    const animate = (node, args) => fly(node, { y: -50, duration: 300, ...args });

    let loadADeleteFormQuestionState = {
		deleteAppointmentQuestion: null,
		loading: false,
		loaded: false,
		errMsg: "",
	};

    const onDeleteAFormQuestion = async () => {
		try {
			loadADeleteFormQuestionState.errMsg = "";
			loadADeleteFormQuestionState.loading = true;
			loadADeleteFormQuestionState.loaded = false;
			const res = await deleteAppointmentQuestion.load({
                id: id
            });
            console.log("res");
			loadADeleteFormQuestionState.deleteAppointmentQuestion = res.data;
			loadADeleteFormQuestionState.loaded = true;
			dispatch("deleted");
		} catch (err) {
			loadADeleteFormQuestionState.errMsg = err.message;
		} finally {
			loadADeleteFormQuestionState.loading = false;
            console.log(loadADeleteFormQuestionState);
		}
	};
</script>
<div transition:animate class="flex items-center justify-center w-full h-full">
    <div class=" flex flex-col items-center bg-white w-[30vw] rounded-lg py-6">
        <div class=" border-2 bg-white border-red-500 rounded-full text-red-500 p-1 hover:bg-gray-200 w-fit"><Trash h=28 w=28/></div>
        <h2 class=" text-gray-600 mt-2 text-3xl">Are you sure?</h2>
        <p class=" w-4/5 text-gray-500 text-center text-sm my-4">Do you really want to delete this question? This process cannot be undone.</p>
        <div class="flex">
            <button on:click={()=>{dispatch('close')}} class=" bg-gray-500 text-white px-6 py-1 rounded-sm mx-1">Cancel</button>
            <button on:click={onDeleteAFormQuestion} class=" bg-red-500 text-white px-6 py-1 rounded-sm mx-1">Delete</button>
        </div>
    </div>
</div>
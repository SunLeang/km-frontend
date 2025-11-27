<script>
    import Trash from "$components/icons/Trash.svelte";
    import { createEventDispatcher } from "svelte";
    import { fly } from 'svelte/transition';
    import { deleteAppointmentTimeSlot } from "$providers/actions/kchannel/appointment/setting";
    import { onDestroy } from "svelte";

    export let id;

    let dispatch = createEventDispatcher();

    const animate = (node, args) => fly(node, { y: -50, duration: 300, ...args });

    let loadADeleteTimeSlotState = {
		deleteTimeSlot: null,
		loading: false,
		loaded: false,
		errMsg: "",
	};

    const onDeleteATimeSlot = async () => {
		try {
			loadADeleteTimeSlotState.errMsg = "";
			loadADeleteTimeSlotState.loading = true;
			loadADeleteTimeSlotState.loaded = false;
			const res = await deleteAppointmentTimeSlot.load({
                id: id
            });
            console.log("res");
			loadADeleteTimeSlotState.deleteTimeSlot = res.data;
			loadADeleteTimeSlotState.loaded = true;
			dispatch("deleted");
		} catch (err) {
			loadADeleteTimeSlotState.errMsg = err.message;
		} finally {
			loadADeleteTimeSlotState.loading = false;
            console.log(loadADeleteTimeSlotState);
		}
	};
    onDestroy(()=>{
        dispatch("close")
    })
</script>
<div transition:animate class="flex items-center justify-center w-full h-full">
    <div class=" flex flex-col items-center bg-white w-[30vw] rounded-lg py-6">
        <div class=" border-2 bg-white border-red-500 rounded-full text-red-500 p-1 hover:bg-gray-200 w-fit"><Trash h=28 w=28/></div>
        <h2 class=" text-gray-600 mt-2 text-3xl">Are you sure?</h2>
        <p class=" w-4/5 text-gray-500 text-sm my-4 text-center">Do you really want to delete this time slot? <br> This process cannot be undone.</p>
        <div class="flex">
            <button class=" bg-gray-500 text-white px-6 py-1 rounded-sm mx-1">Cancel</button>
            <div on:click={onDeleteATimeSlot} class=" bg-red-500 text-white px-6 py-1 rounded-sm mx-1 cursor-pointer">Delete</div>
        </div>
    </div>
</div>
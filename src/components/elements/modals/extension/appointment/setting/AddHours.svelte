<script>
    import { Button } from "flowbite-svelte";
    import Cancel from "$components/icons/Cancel/Cancel.svelte";
    import Up from "$components/icons/Up.svelte";
    import Down from "$components/icons/Down.svelte";
    import {increaseTimeByOne, decreaseTimeByOne, increaseMinuteByOne, decreaseMinuteByOne, convertTimeAndMinuteToMinute} from "./Functions";
    import { page } from "$app/stores";
    import { createAppointmentTimeSlot } from "$providers/actions/kchannel/appointment/setting";
    import { createEventDispatcher } from "svelte";

    export let day;

    let dispatch = createEventDispatcher()
    let start_time = 0;
    let start_minute = 0;
    let end_time = 0;
    let end_minute = 0;
    let loadACreateTimeSlotState = {
		newTimeSlot: null,
		loading: false,
		loaded: false,
		errMsg: "",
	};

    const onCreateATimeSlot = async () => {
		try {
			loadACreateTimeSlotState.errMsg = "";
			loadACreateTimeSlotState.loading = true;
			loadACreateTimeSlotState.loaded = false;
			const res = await createAppointmentTimeSlot.load({
                channel: $page.params?.channelId,
                appointment_form: $page.params.formId,
                day: parseFloat(day),
                start_time: convertTimeAndMinuteToMinute(start_time, start_minute),
                end_time: convertTimeAndMinuteToMinute(end_time, end_minute),
                is_active: true
			});
			loadACreateTimeSlotState.newTimeSlot = res.data;
			loadACreateTimeSlotState.loaded = true;
			dispatch("created");
		} catch (err) {
			loadACreateTimeSlotState.errMsg = err.message;
		} finally {
			loadACreateTimeSlotState.loading = false;
		}
	};
    
</script>
<div>
    <div>
        <div class="flex justify-around">
            <h3>Start Time</h3>
            <h3>End Time</h3>
        </div>
        <div class=" flex justify-around mt-2">
            <div class="flex items-center">
                <div class=" flex flex-col items-center">
                    <button type="button" class="w-9 h-6 flex justify-center" on:click={()=>{start_time=increaseTimeByOne(start_time)}}>
                        <Up />
                    </button>
                    <input class="flex justify-center mt-1 w-8 p-1" type="number" bind:value={start_time}>
                    <button type="button" class=" flex justify-center mt-1" on:click={()=>{start_time=decreaseTimeByOne(start_time)}}>
                        <Down />
                    </button>
                </div>
                <p class=" mx-3 text-lg">
                    :
                </p>
                <div class=" flex flex-col items-center">
                    <button type="button" on:click={()=>{start_minute=increaseMinuteByOne(start_minute)}}>
                        <Up />
                    </button>
                    <input class="flex justify-center mt-1 w-8 p-1" type="number" bind:value={start_minute}>
                    <button type="button" class="mt-1" on:click={()=>{start_minute=decreaseMinuteByOne(start_minute)}}>
                        <Down />
                    </button>
                </div>
            </div>
            <div class="flex items-center">
                <div class=" flex flex-col items-center">
                    <button type="button" class="w-9 h-6 flex justify-center" on:click={()=>{end_time=increaseTimeByOne(end_time)}}>
                        <Up />
                    </button>
                    <input class="flex justify-center mt-1 w-8 p-1" type="number" bind:value={end_time}>
                    <button type="button" class="flex justify-center mt-1" on:click={()=>{end_time=decreaseTimeByOne(end_time)}}>
                        <Down />
                    </button>
                </div>
                <p class=" mx-3 text-lg">
                    :
                </p>
                <div class=" flex flex-col items-center">
                    <button type="button" on:click={()=>{end_minute=increaseMinuteByOne(end_minute)}}>
                        <Up />
                    </button>
                    <input class="flex justify-center mt-1 w-8 p-1" type="number" bind:value={end_minute}>
                    <button type="button" class="mt-1" on:click={()=>{end_minute=decreaseMinuteByOne(end_minute)}}>
                        <Down />
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="flex items-center justify-end mt-6">
        <button type="button" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded mr-4 duration-100">Cancel</button>
        <div on:click={onCreateATimeSlot} type="submit" class="bg-[#004E80] hover:bg-[rgb(27,54,71)] text-white py-1 px-2 rounded duration-100 cursor-pointer">Create</div>
    </div>
</div>

<style>
    /* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
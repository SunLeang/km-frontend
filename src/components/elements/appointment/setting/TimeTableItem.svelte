<script>
    import { Button, Modal, Toggle } from "flowbite-svelte";
    import {
        TableBodyCell,
        TableBodyRow,
    } from "flowbite-svelte";
    import AddHours from "$components/elements/modals/extension/appointment/setting/AddHours.svelte";
    import Clock from "$components/icons/Clock.svelte";
    import { getScheduleByDay, updateAppointmentTimeSlotStatus } from '$providers/actions/kchannel/appointment/setting';
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import Trash from "$components/icons/Trash.svelte";
    import AddCircle from "$components/icons/Add/AddCircle.svelte";
    import {convertToTime} from "./ConvertToTime"
    import DeleteHour from "$components/elements/modals/extension/appointment/setting/DeleteHour.svelte";

    export let day;

    let openAddSlotModal = false;
    let deleteId = "";
    let is_open = true;
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
	let scheduleState = {
		slots: null,
		loading: false,
		errMsg: "",
		loaded: false,
	};

    $: chId = $page.params?.channelId;

    const onLoadSchedule = async () => {
		try {
			scheduleState.errMsg = "";
			scheduleState.loading = true;
			scheduleState.loaded = false;
			const res = await getScheduleByDay.load({channel: chId, day: parseFloat(day)});
			scheduleState.slots = res.data;
            scheduleState.slots.getAppointmentSchedulesByChannelAndDay.sort((a, b) => a.start_time - b.start_time);
			scheduleState.loaded = true;
			scheduleState.loading = false;
		} catch (err) {
			scheduleState.errMsg = err.message;
            console.log(err);
		} finally {
			scheduleState.loading = false;
		}
	};

    const updateTimeSlotStatus = async (id, is_active) => {
        try {
            const res = await updateAppointmentTimeSlotStatus.load({id: id, is_active: is_active})
            onLoadSchedule()
        } catch (error) {
            console.error(error);
        }
    }

    function handleAddSlot(e) {
        onLoadSchedule()
        openAddSlotModal = false
    }

    function handleDeleteSlot(){
        onLoadSchedule()
        deleteId=""
    }

    onMount(() => {
        onLoadSchedule()
    })
</script>
<TableBodyRow>
    <TableBodyCell>{days[day]}</TableBodyCell>
    <TableBodyCell>
        {#if scheduleState.slots}
        {#each scheduleState.slots.getAppointmentSchedulesByChannelAndDay as slot}
        <Toggle bind:checked={slot.is_active} on:change={updateTimeSlotStatus(slot.id, slot.is_active)} class="h-fit my-1" color="blue">{is_open ? 'Open' : 'Close'}</Toggle>
        {/each}
        {/if}
    </TableBodyCell>
    <TableBodyCell>
        {#if scheduleState.slots}
        {#each scheduleState.slots.getAppointmentSchedulesByChannelAndDay as slot}
        <div
            class="flex rounded-sm bg-white w-24 justify-center items-center border border-[#e6e6e6] h-[1.78rem] my-1"
        >
            <p class="mr-1">{convertToTime(slot.start_time) }</p>
            <Clock />
        </div>
        {/each}
        {/if}
    </TableBodyCell>
    <TableBodyCell>
        {#if scheduleState.slots}
        {#each scheduleState.slots.getAppointmentSchedulesByChannelAndDay as slot}
        <div
            class="flex rounded-sm bg-white w-24 justify-center items-center border border-[#e6e6e6] h-[1.78rem] my-1"
        >
            <p class="mr-1">{convertToTime(slot.end_time)}</p>
            <Clock />
        </div>
        {/each}
        {/if}
    </TableBodyCell>
    <TableBodyCell>
        {#if scheduleState.slots}
        {#each scheduleState.slots.getAppointmentSchedulesByChannelAndDay as slot}
        <button on:click={()=>{deleteId = slot.id}} class=" h-[1.78rem] flex items-center my-1 hover:text-red-500">
            <Trash />
        </button>
        <Modal title={days[day]} open={deleteId == slot.id} autoclose>
            <DeleteHour id={slot.id} on:close={()=>{deleteId=""}} on:deleted={handleDeleteSlot}/>
        </Modal>
        {/each}
        {/if}
    </TableBodyCell>
    <TableBodyCell>
        <Button on:click={() => (openAddSlotModal = true)}>
            <div
                class="flex rounded-lg bg-[#004e80] w-24 justify-center items-center border border-[#e6e6e6] py-0.5"
            >
            <AddCircle h=5/>
                <p class="text-whit text-xs ">Add Hours</p>
            </div>
        </Button>
        <Modal title={days[day]} bind:open={openAddSlotModal} autoclose>
            <AddHours day={day} on:created={handleAddSlot}/>
        </Modal>
    </TableBodyCell>
</TableBodyRow>

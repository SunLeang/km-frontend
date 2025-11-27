<script>
    import History from "$components/icons/History.svelte";
    import AppointmentList from "./appointment-list/AppointmentList.svelte";
    import Close from "$components/icons/Close/Close.svelte";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
</script>

<div class="flex items-center justify-center w-full h-full">
    <div class=" w-[70%] bg-white rounded-lg shadow p-[1vw] h-fit">
        <div class="flex justify-between  mb-4">
            <h2 class=" flex items-center justify-between w-[12%] font-bold text-2xl text-[#004E80]">
                <History height="25" width="25" stroke_width="1.5"/> History
            </h2>
            <button on:click={() => dispatch('close')}>
                <Close />
            </button>
        </div>
        <div class="rounded-lg bg-[#F4F4F4] p-[1vw] h-fit">
            <AppointmentList type="history"/>
        </div>
    </div>
</div>
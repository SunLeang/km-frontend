<script>
    import Calendar from "$components/icons/Calendar.svelte";
    import History from "$components/icons/History.svelte";
    import DashboardCard from "$components/elements/appointment/dashboard/DashboardCard.svelte";
    import Users from "$components/icons/Users.svelte";
    import AppointmentList from "$components/elements/appointment/dashboard/appointment-list/AppointmentList.svelte";
    import Modal from "$components/elements/modals/Modal.svelte";
    import HistoryCard from "$components/elements/appointment/dashboard/HistoryCard.svelte";
    import CalendarCard from "$components/elements/appointment/dashboard/CalendarCard.svelte";
    import Pending from "$components/icons/Pending.svelte";
    import CalendarAccepted from "$components/icons/CalendarAccepted.svelte";
    import { onMount } from "svelte";
    import {
        getAllUpcomingAppointmentBooking,
        getAllUpcomingAcceptedAppointmentBooking,
        getAllUpcomingPendingAppointmentBooking,
    } from "$providers/actions/kchannel/appointment/dashboard";

    let showHistory = false;
    let showCalendar = false;
    let selectedCategory = "all";
    let sizes = {
        all: 0,
        pending: 0,
        accepted: 0,
    };

    async function changeAllData() {
        let tmp = 0;
        tmp = await getAllUpcomingAppointmentBooking.load();
        sizes.all = tmp.data.getAllUpcomingAppointmentBooking.length;
    }
    async function changePendingData() {
        let tmp = 0;
        tmp = await getAllUpcomingPendingAppointmentBooking.load();
        sizes.pending = tmp.data.getAllUpcomingPendingAppointmentBooking.length;
    }
    async function changeAcceptedData() {
        let tmp = 0;
        tmp = await getAllUpcomingAcceptedAppointmentBooking.load();
        sizes.accepted =
            tmp.data.getAllUpcomingAcceptedAppointmentBooking.length;
    }

    onMount(async () => {
        changeAllData();
        changeAcceptedData();
        changePendingData();
    });
</script>

<div>
    <div class="flex justify-between mb-4">
        <h2 class=" font-bold text-lg text-[#666666]">Upcoming Appointments</h2>
        <div class=" flex justify-between w-[18%] flex-col lg:flex-row">
            <button
                on:click={() => {
                    showCalendar = true;
                }}
                class="text-sm border-2 border-[#004E80] text-[#004E80] py-[2px] px-[6px] rounded-md flex items-center duration-100 hover:bg-[#004E80] hover:text-white overflow-hidden"
                ><Calendar /> Calendar</button
            >
            <Modal shown={showCalendar}>
                <CalendarCard
                    on:close={() => {
                        showCalendar = false;
                    }}
                />
            </Modal>
            <button
                on:click={() => {
                    showHistory = true;
                }}
                class="text-sm border-2 bg-[#004E80] border-[#004E80] text-white py-[2px] px-[6px] rounded-md flex items-center duration-100 hover:bg-white hover:text-[#004E80] overflow-hidden"
                ><History stroke_width="0.7" /> History</button
            >
            <Modal shown={showHistory}>
                <HistoryCard
                    on:close={() => {
                        showHistory = false;
                    }}
                />
            </Modal>
        </div>
    </div>
    <div class="flex justify-between mb-4">
        {#if sizes}
            <DashboardCard
                number={sizes.all}
                selected={selectedCategory == "all"}
                type="all"
                on:click={() => {
                    selectedCategory = "all";
                }}
            />
            <DashboardCard
                number={sizes.accepted}
                selected={selectedCategory == "accepted"}
                type="accepted"
                on:click={() => {
                    selectedCategory = "accepted";
                }}
            />
            <DashboardCard
                number={sizes.pending}
                selected={selectedCategory == "pending"}
                type="pending"
                on:click={() => {
                    selectedCategory = "pending";
                }}
            />
        {/if}
    </div>
    <div class="rounded-lg bg-[#F4F4F4] p-[1vw] h-fit">
        <div class="flex items-center text-[#004E80] mb-3">
            {#if selectedCategory == "all"}
                <Users height="23" width="23" />
            {:else if selectedCategory == "pending"}
                <Pending height="23" width="23" />
            {:else if selectedCategory == "accepted"}
                <CalendarAccepted height="23" width="23" />
            {/if}
            <span class="w-3"></span>
            <h2 class="font-bold text-xl">
                {selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1)} Appointments
            </h2>
        </div>

        <AppointmentList
            on:updated={() => {
                changeAcceptedData();
                changePendingData();
            }}
            type={selectedCategory}
        />
    </div>
</div>

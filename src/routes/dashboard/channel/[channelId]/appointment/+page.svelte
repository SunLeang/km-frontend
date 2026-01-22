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
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import {
        getAllUpcomingAppointmentBooking,
        getAllUpcomingAcceptedAppointmentBooking,
        getAllUpcomingPendingAppointmentBooking,
    } from "$providers/actions/kchannel/appointment/dashboard";

    $: channelId = $page.params.channelId;

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
    <!-- Quick Access Navigation -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
            on:click={() => goto(`/dashboard/channel/${channelId}/appointment/form`)}
            class="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105"
        >
            <svg
                class="w-8 h-8 mb-2 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
            </svg>
            <p class="font-semibold">Manage Forms</p>
            <p class="text-xs text-blue-100 mt-1">Create & edit forms</p>
        </button>

        <button
            on:click={() => goto(`/dashboard/channel/${channelId}/appointment/booking`)}
            class="p-4 bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105"
        >
            <svg
                class="w-8 h-8 mb-2 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
            </svg>
            <p class="font-semibold">Manage Bookings</p>
            <p class="text-xs text-teal-100 mt-1">Approve/Reject</p>
        </button>

        <button
            on:click={() => goto(`/dashboard/channel/${channelId}/appointment/setting`)}
            class="p-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105"
        >
            <svg
                class="w-8 h-8 mb-2 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <p class="font-semibold">Schedule Times</p>
            <p class="text-xs text-orange-100 mt-1">Set availability</p>
        </button>
    </div>

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

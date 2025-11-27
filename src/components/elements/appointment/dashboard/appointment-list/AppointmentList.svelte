<script>
    import { onMount } from "svelte";
    import AppointmentListItem from "./AppointmentListItem.svelte";
    import { getAllUpcomingAppointmentBooking, 
        getAllUpcomingAcceptedAppointmentBooking,
        getAllUpcomingPendingAppointmentBooking,
        getAllAppointmentBooking
    } from '$providers/actions/kchannel/appointment/dashboard'
    import { createEventDispatcher } from "svelte";

    export let type;

    let dispatch = createEventDispatcher()
    let appointments;

	let bookingsState = {
		bookings: null,
		loading: false,
		errMsg: "",
		loaded: false,
	};
    let sizes = {
            all: 0,
            pending: 0,
            accepted: 0
        }

    const onLoadBookings = async (type) => {
		try {
			bookingsState.errMsg = "";
			bookingsState.loading = true;
			bookingsState.loaded = false;

            if (type == "all") {
                const res = await getAllUpcomingAppointmentBooking.load();
                bookingsState.bookings = res.data;
                appointments = bookingsState.bookings.getAllUpcomingAppointmentBooking
            }
            else if (type == "accepted") {
                const res = await getAllUpcomingAcceptedAppointmentBooking.load();
                bookingsState.bookings = res.data;
                appointments = bookingsState.bookings.getAllUpcomingAcceptedAppointmentBooking
            } 
            else if(type == "pending") {
                const res = await getAllUpcomingPendingAppointmentBooking.load();
                bookingsState.bookings = res.data;
                appointments = bookingsState.bookings.getAllUpcomingPendingAppointmentBooking
            }
            else if(type == "history") {
                const res = await getAllAppointmentBooking.load();
                bookingsState.bookings = res.data;
                appointments = bookingsState.bookings.getAllAppointmentBooking
            }

            appointments.sort((a, b) => a.date - b.date);

			bookingsState.loaded = true;
			bookingsState.loading = false;
		} catch (err) {
			bookingsState.errMsg = err.message;
		} finally {
			bookingsState.loading = false;
			console.log(sizes);
		}
	};

    onMount(async () => {
        await onLoadBookings(type)
    })

    $: {
        onLoadBookings(type);
    }
</script>
<div class="h-fit ">
    <div class="flex justify-between">
        <div class="flex items-end">
            <div class="w-12 border-t-2 border-l-2 rounded-tl-lg h-4 border-[#004E80]"></div>
            <div class="text-[#004E80] font-bold px-2 flex items-center">
                <span class="text-2xl">&lt</span>
                <span class="mx-4">January 2024</span>
                <span class="text-2xl">&gt</span>
            </div>
        </div>
        <div class="flex text-white text-sm">
            <button class="bg-[#004E80] px-6 rounded-l-lg h-fit py-1">
                All
            </button>
            <button class="bg-[#006EB2] px-6 rounded-r-lg h-fit py-1">
                Today
            </button>
        </div>
    </div>
    <div class="relative overflow-x-auto sm:rounded-bl-lg border-b-2 border-l-2 border-[#004E80] rounded-bl-lg p-[1vw] h-[65vh] overflow-scroll">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody class="rounded-lg">
                {#if appointments}
                {#each appointments as appointment}
                    <AppointmentListItem on:updated={()=>{dispatch("updated")}} appointmentInfo={appointment}/>
                {/each}
                {/if}
            </tbody>
        </table>
    </div>
</div>
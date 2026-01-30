<script>
    import { onMount } from "svelte";
    import AppointmentListItem from "./AppointmentListItem.svelte";
    import { 
        getAllUpcomingAppointmentBooking, 
        getAllUpcomingAcceptedAppointmentBooking,
        getAllUpcomingPendingAppointmentBooking,
        getAllAppointmentBooking
    } from '$providers/actions/kchannel/appointment/dashboard';
    import { createEventDispatcher } from "svelte";

    export let type;

    let dispatch = createEventDispatcher();
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
    };

    // Main function to load bookings based on selected type
    const onLoadBookings = async (type) => {
        try {
            bookingsState.errMsg = "";
            bookingsState.loading = true;
            bookingsState.loaded = false;

            // Handle different appointment types
            if (type == "all") {
                const res = await getAllUpcomingAppointmentBooking.load();
                bookingsState.bookings = res.data;
                appointments = bookingsState.bookings.getAllUpcomingAppointmentBooking;
            }
            else if (type == "accepted") {
                const res = await getAllUpcomingAcceptedAppointmentBooking.load();
                bookingsState.bookings = res.data;
                appointments = bookingsState.bookings.getAllUpcomingAcceptedAppointmentBooking;
            } 
            else if (type == "pending") {
                const res = await getAllUpcomingPendingAppointmentBooking.load();
                bookingsState.bookings = res.data;
                appointments = bookingsState.bookings.getAllUpcomingPendingAppointmentBooking;
            }
            else if (type == "history") {
                const res = await getAllAppointmentBooking.load();
                bookingsState.bookings = res.data;
                appointments = bookingsState.bookings.getAllAppointmentBooking;
            }

            // Sort appointments by date in ascending order
            if (appointments && appointments.length > 0) {
                appointments.sort((a, b) => a.date - b.date);
            }

            bookingsState.loaded = true;
            bookingsState.loading = false;
        } catch (err) {
            bookingsState.errMsg = err.message;
            console.error("Error loading appointments:", err);
        } finally {
            bookingsState.loading = false;
            console.log("Appointment data loaded successfully");
        }
    };

    onMount(async () => {
        await onLoadBookings(type);
    });

    // Reactive statement: reload bookings whenever `type` changes
    $: {
        if (type) {
            onLoadBookings(type);
        }
    }
</script>

<div class="h-fit">
    <div class="flex justify-between">
        <div class="flex items-end">
            <div class="w-12 border-t-2 border-l-2 rounded-tl-lg h-4 border-[#004E80]"></div>
            <div class="text-[#004E80] font-bold px-2 flex items-center">
                <span class="text-2xl">&lt;</span>
                <span class="mx-4">January 2024</span>
                <span class="text-2xl">&gt;</span>
            </div>
        </div>
        <div class="flex text-white text-sm">
            <button class="bg-[#004E80] px-6 rounded-l-lg h-fit py-1 hover:bg-[#003d66] transition-colors duration-200">
                All Appointments
            </button>
            <button class="bg-[#006EB2] px-6 rounded-r-lg h-fit py-1 hover:bg-[#005a94] transition-colors duration-200">
                Today's Appointments
            </button>
        </div>
    </div>
    
    <div class="relative overflow-x-auto sm:rounded-bl-lg border-b-2 border-l-2 border-[#004E80] rounded-bl-lg p-[1vw] h-[65vh] overflow-scroll">
        {#if bookingsState.loading}
            <div class="flex justify-center items-center h-full">
                <div class="text-gray-500 animate-pulse">Loading appointments...</div>
            </div>
        {:else if bookingsState.errMsg}
            <div class="flex justify-center items-center h-full">
                <div class="text-red-500">Error: {bookingsState.errMsg}</div>
            </div>
        {:else}
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody class="rounded-lg">
                    {#if appointments && appointments.length > 0}
                        {#each appointments as appointment (appointment.id || appointment._id || appointment_index)}
                            <AppointmentListItem 
                                on:updated={() => { dispatch("updated") }} 
                                appointmentInfo={appointment}
                            />
                        {/each}
                    {:else}
                        <tr>
                            <td colspan="5" class="p-4 text-center text-gray-400">
                                No appointments found for the selected filter
                            </td>
                        </tr>
                    {/if}
                </tbody>
            </table>
        {/if}
    </div>
</div>
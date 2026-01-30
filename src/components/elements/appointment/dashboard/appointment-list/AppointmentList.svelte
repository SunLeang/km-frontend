<script>
    import { onMount } from "svelte";
    import AppointmentListItem from "./AppointmentListItem.svelte";
    import { 
        getAllUpcomingAppointmentBooking, 
        getAllUpcomingAcceptedAppointmentBooking,
        getAllUpcomingPendingAppointmentBooking,
        getAllAppointmentBooking
    } from '$providers/actions/kchannel/appointment/dashboard'
    import { createEventDispatcher } from "svelte";

    // Component prop to determine which type of appointments to display
    export let type;

    // Create dispatcher to communicate with parent component
    let dispatch = createEventDispatcher();

    // Holds the list of appointments to render
    let appointments;

    // State object to manage loading, error and data status
    let bookingsState = {
        bookings: null,
        loading: false,
        errMsg: "",
        loaded: false,
    };

    // Object to store counts per category (currently unused in UI)
    let sizes = {
        all: 0,
        pending: 0,
        accepted: 0
    };

    // Main function responsible for fetching appointment data
    const onLoadBookings = async (type) => {
        try {
            // Reset state before starting new request
            bookingsState.errMsg = "";
            bookingsState.loading = true;
            bookingsState.loaded = false;

            let res;

            // Load data depending on the selected type/filter
            if (type === "all") {
                res = await getAllUpcomingAppointmentBooking.load();
                appointments = res.data.getAllUpcomingAppointmentBooking;
            }
            else if (type === "accepted") {
                res = await getAllUpcomingAcceptedAppointmentBooking.load();
                appointments = res.data.getAllUpcomingAcceptedAppointmentBooking;
            } 
            else if (type === "pending") {
                res = await getAllUpcomingPendingAppointmentBooking.load();
                appointments = res.data.getAllUpcomingPendingAppointmentBooking;
            }
            else if (type === "history") {
                res = await getAllAppointmentBooking.load();
                appointments = res.data.getAllAppointmentBooking;
            }

            // Store raw response for possible future use
            bookingsState.bookings = res.data;

            // Sort appointments chronologically (oldest → newest)
            if (appointments) {
                appointments.sort((a, b) => a.date - b.date);
            }

            // Mark loading as complete
            bookingsState.loaded = true;
            bookingsState.loading = false;
        } catch (err) {
            bookingsState.errMsg = err.message || "Failed to load appointments";
            console.error("Error loading appointments:", err);
        } finally {
            bookingsState.loading = false;
            // TODO: update sizes object with actual counts
            console.log("Category sizes:", sizes);
        }
    };

    // Load data when component is first mounted
    onMount(async () => {
        await onLoadBookings(type);
    });

    // Reactively reload data when 'type' prop changes
    $: {
        onLoadBookings(type);
    }
</script>

<!-- Main container -->
<div class="h-fit">
    <!-- Header section with navigation and filters -->
    <div class="flex justify-between">
        <div class="flex items-end">
            <!-- Decorative left border element -->
            <div class="w-12 border-t-2 border-l-2 rounded-tl-lg h-4 border-[#004E80]"></div>
            
            <!-- Month navigation (currently static) -->
            <div class="text-[#004E80] font-bold px-2 flex items-center">
                <span class="text-2xl">&lt</span>
                <span class="mx-4">January 2024</span>
                <span class="text-2xl">&gt</span>
            </div>
        </div>

        <!-- Filter buttons (All / Today) - currently static styling -->
        <div class="flex text-white text-sm">
            <button class="bg-[#004E80] px-6 rounded-l-lg h-fit py-1">
                All
            </button>
            <button class="bg-[#006EB2] px-6 rounded-r-lg h-fit py-1">
                Today
            </button>
        </div>
    </div>

    <!-- Scrollable list of appointments -->
    <div class="relative overflow-x-auto sm:rounded-bl-lg border-b-2 border-l-2 border-[#004E80] rounded-bl-lg p-[1vw] h-[65vh] overflow-scroll">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody class="rounded-lg">
                {#if appointments}
                    {#each appointments as appointment}
                        <!-- Individual appointment row component -->
                        <AppointmentListItem 
                            on:updated={() => { dispatch("updated") }} 
                            appointmentInfo={appointment}
                        />
                    {/each}
                {:else if bookingsState.loading}
                    <!-- Could add loading indicator here in the future -->
                {:else if bookingsState.errMsg}
                    <!-- Could show error message here -->
                {/if}
            </tbody>
        </table>
    </div>
</div>

<!-- 
    Possible future improvements:
    - Add actual loading spinner / skeleton UI
    - Display error message when bookingsState.errMsg exists
    - Implement real month navigation
    - Make filter buttons functional (all/today + more)
    - Calculate and show real counts in sizes object
-->
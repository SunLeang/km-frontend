<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import {
        getAllUpcomingAppointmentBooking,
        getAllUpcomingAcceptedAppointmentBooking,
        getAllUpcomingPendingAppointmentBooking,
    } from "$providers/actions/kchannel/appointment/dashboard";
    import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";

    let allBookings = [];
    let loading = true;
    let currentDate = new Date();
    let selectedDate = null;
    let selectedBookings = [];

    // Get calendar data
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    // Helper to get days in month
    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    // Helper to get first day of month (0 = Sunday)
    function getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1).getDay();
    }

    // Format time from minutes
    function formatTime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const period = hours >= 12 ? "PM" : "AM";
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${mins.toString().padStart(2, "0")} ${period}`;
    }

    // Generate calendar days
    $: calendarDays = (() => {
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
        const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
        const days = [];

        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            days.push({ date: null, bookings: [] });
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const dayBookings = allBookings.filter((booking) => {
                const bookingDate = new Date(booking.date);
                return (
                    bookingDate.getFullYear() === date.getFullYear() &&
                    bookingDate.getMonth() === date.getMonth() &&
                    bookingDate.getDate() === date.getDate()
                );
            });
            days.push({ date: day, bookings: dayBookings });
        }

        return days;
    })();

    // Month names
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    // Day names
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    async function loadBookings() {
        loading = true;
        try {
            const res = await getAllUpcomingAppointmentBooking.load();
            if (res?.success) {
                allBookings =
                    res.data.getAllUpcomingAppointmentBooking || [];
            }
        } catch (error) {
            console.error("Failed to load bookings:", error);
        } finally {
            loading = false;
        }
    }

    function previousMonth() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
    }

    function nextMonth() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
    }

    function selectDay(day, bookings) {
        if (!day) return;
        selectedDate = new Date(currentYear, currentMonth, day);
        selectedBookings = bookings;
    }

    function getStatusColor(status) {
        switch (status) {
            case "accepted":
                return "bg-green-500";
            case "pending":
                return "bg-yellow-500";
            case "rejected":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    }

    function getStatusTextColor(status) {
        switch (status) {
            case "accepted":
                return "text-green-800";
            case "pending":
                return "text-yellow-800";
            case "rejected":
                return "text-red-800";
            default:
                return "text-gray-800";
        }
    }

    onMount(() => {
        loadBookings();
    });
</script>

<div class="max-w-7xl mx-auto p-6">
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Appointment Calendar
        </h1>
        <p class="text-gray-600">View all appointments in calendar format</p>
    </div>

    {#if loading}
        <div class="flex justify-center items-center h-64">
            <SMFBLoading />
        </div>
    {:else}
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Calendar -->
            <div class="lg:col-span-2">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <!-- Month Navigation -->
                    <div class="flex items-center justify-between mb-6">
                        <button
                            on:click={previousMonth}
                            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <h2 class="text-xl font-semibold text-gray-900">
                            {monthNames[currentMonth]}
                            {currentYear}
                        </h2>
                        <button
                            on:click={nextMonth}
                            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>

                    <!-- Day Names -->
                    <div class="grid grid-cols-7 gap-2 mb-2">
                        {#each dayNames as dayName}
                            <div
                                class="text-center text-sm font-semibold text-gray-600 py-2"
                            >
                                {dayName}
                            </div>
                        {/each}
                    </div>

                    <!-- Calendar Grid -->
                    <div class="grid grid-cols-7 gap-2">
                        {#each calendarDays as day}
                            <button
                                on:click={() => selectDay(day.date, day.bookings)}
                                disabled={!day.date}
                                class={`min-h-[80px] p-2 rounded-lg border transition-colors ${
                                    day.date
                                        ? "hover:bg-gray-50 border-gray-200 cursor-pointer"
                                        : "bg-gray-50 border-transparent cursor-default"
                                } ${
                                    selectedDate &&
                                    selectedDate.getDate() === day.date &&
                                    selectedDate.getMonth() === currentMonth &&
                                    selectedDate.getFullYear() === currentYear
                                        ? "ring-2 ring-teal-500 bg-teal-50"
                                        : ""
                                }`}
                            >
                                {#if day.date}
                                    <div class="text-sm font-medium text-gray-900 mb-1">
                                        {day.date}
                                    </div>
                                    {#if day.bookings.length > 0}
                                        <div class="space-y-1">
                                            {#each day.bookings.slice(0, 2) as booking}
                                                <div
                                                    class={`text-xs px-2 py-1 rounded ${getStatusColor(
                                                        booking.status
                                                    )} text-white truncate`}
                                                >
                                                    {formatTime(booking.time_start)}
                                                </div>
                                            {/each}
                                            {#if day.bookings.length > 2}
                                                <div class="text-xs text-gray-500">
                                                    +{day.bookings.length - 2} more
                                                </div>
                                            {/if}
                                        </div>
                                    {/if}
                                {/if}
                            </button>
                        {/each}
                    </div>
                </div>
            </div>

            <!-- Selected Day Details -->
            <div class="lg:col-span-1">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
                    {#if selectedDate}
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">
                            {selectedDate.toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </h3>

                        {#if selectedBookings.length === 0}
                            <p class="text-gray-500 text-sm">No appointments for this day</p>
                        {:else}
                            <div class="space-y-3">
                                {#each selectedBookings as booking}
                                    <div
                                        class="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div class="flex items-center justify-between mb-2">
                                            <span
                                                class={`px-2 py-1 text-xs font-medium rounded-full ${
                                                    booking.status === "accepted"
                                                        ? "bg-green-100 text-green-800"
                                                        : booking.status === "pending"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {booking.status}
                                            </span>
                                            <span class="text-sm font-semibold text-gray-900">
                                                {formatTime(booking.time_start)}
                                            </span>
                                        </div>
                                        <p class="text-sm text-gray-700">
                                            {booking.user.firstName}
                                            {booking.user.lastName}
                                        </p>
                                        <p class="text-xs text-gray-500">
                                            @{booking.user.username}
                                        </p>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    {:else}
                        <div class="text-center text-gray-500 py-8">
                            <p class="text-sm">Select a day to view appointments</p>
                        </div>
                    {/if}
                </div>

                <!-- Legend -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mt-4">
                    <h4 class="text-sm font-semibold text-gray-900 mb-3">Legend</h4>
                    <div class="space-y-2">
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 rounded bg-green-500"></div>
                            <span class="text-xs text-gray-600">Accepted</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 rounded bg-yellow-500"></div>
                            <span class="text-xs text-gray-600">Pending</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 rounded bg-red-500"></div>
                            <span class="text-xs text-gray-600">Rejected</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>

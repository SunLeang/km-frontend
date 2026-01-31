<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import {
        getAllUpcomingPendingAppointmentBooking,
        getAllUpcomingAcceptedAppointmentBooking,
        getAllUpcomingRejectedAppointmentBooking,
        approveAppointmentBooking,
        rejectAppointmentBooking,
    } from "$providers/actions/kchannel/appointment/dashboard";
    import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
    import Check from "$components/icons/Check.svelte";
    import CancelRounded from "$components/icons/Cancel/CancelRounded.svelte";

    let pendingBookings = [];
    let acceptedBookings = [];
    let rejectedBookings = [];
    let loading = true;
    let processingId = null;
    let showRejectModal = false;
    let rejectReason = "";
    let selectedBookingId = null;

    // Helper function to format date
    function formatDate(timestamp) {
        return new Date(timestamp).toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    // Helper function to format time from minutes
    function formatTime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const period = hours >= 12 ? "PM" : "AM";
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${mins.toString().padStart(2, "0")} ${period}`;
    }

    async function loadBookings() {
        loading = true;
        try {
            const [pendingRes, acceptedRes, rejectedRes] = await Promise.all([
                getAllUpcomingPendingAppointmentBooking.load(),
                getAllUpcomingAcceptedAppointmentBooking.load(),
                getAllUpcomingRejectedAppointmentBooking.load(),
            ]);

            if (pendingRes?.success) {
                pendingBookings =
                    pendingRes.data.getAllUpcomingPendingAppointmentBooking || [];
            }

            if (acceptedRes?.success) {
                acceptedBookings =
                    acceptedRes.data.getAllUpcomingAcceptedAppointmentBooking || [];
            }

            if (rejectedRes?.success) {
                rejectedBookings =
                    rejectedRes.data.getAllUpcomingRejectedAppointmentBooking || [];
            }
        } catch (error) {
            console.error("Failed to load bookings:", error);
        } finally {
            loading = false;
        }
    }

    async function handleApprove(bookingId) {
        processingId = bookingId;
        try {
            const res = await approveAppointmentBooking.load(bookingId);
            if (res?.success) {
                await loadBookings();
                alert("Booking approved successfully!");
            } else {
                alert("Failed to approve booking. Time slot may be already booked.");
            }
        } catch (error) {
            console.error("Failed to approve booking:", error);
            alert("Error: " + (error.message || "Failed to approve booking"));
        } finally {
            processingId = null;
        }
    }

    function openRejectModal(bookingId) {
        selectedBookingId = bookingId;
        rejectReason = "";
        showRejectModal = true;
    }

    async function handleReject() {
        if (!selectedBookingId) return;

        processingId = selectedBookingId;
        try {
            const res = await rejectAppointmentBooking.load({
                id: selectedBookingId,
                reason: rejectReason,
            });
            if (res?.success) {
                await loadBookings();
                alert("Booking rejected successfully!");
                showRejectModal = false;
                selectedBookingId = null;
                rejectReason = "";
            } else {
                alert("Failed to reject booking");
            }
        } catch (error) {
            console.error("Failed to reject booking:", error);
            alert("Error: " + (error.message || "Failed to reject booking"));
        } finally {
            processingId = null;
        }
    }

    onMount(() => {
        loadBookings();
    });
</script>

<div class="max-w-7xl mx-auto p-6">
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Booking Management</h1>
        <p class="text-gray-600">Approve or reject appointment bookings</p>
    </div>

    {#if loading}
        <div class="flex justify-center items-center h-64">
            <SMFBLoading />
        </div>
    {:else}
        <!-- Pending Bookings Section -->
        <div class="mb-8">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-xl font-semibold text-gray-900">
                        Pending Approvals
                        <span class="ml-2 text-sm font-normal text-gray-500">
                            ({pendingBookings.length})
                        </span>
                    </h2>
                </div>

                <div class="p-6">
                    {#if pendingBookings.length === 0}
                        <div class="text-center py-12 text-gray-500">
                            <p>No pending bookings</p>
                        </div>
                    {:else}
                        <div class="space-y-4">
                            {#each pendingBookings as booking (booking.id)}
                                <div
                                    class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                                >
                                    <div class="flex items-start justify-between">
                                        <div class="flex-1">
                                            <div class="flex items-center gap-3 mb-2">
                                                <span
                                                    class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full"
                                                >
                                                    Pending
                                                </span>
                                                <p class="text-lg font-semibold text-gray-900">
                                                    {booking.user.firstName}
                                                    {booking.user.lastName}
                                                </p>
                                            </div>

                                            <div class="space-y-1 text-sm text-gray-600">
                                                <p>
                                                    <span class="font-medium">Username:</span>
                                                    {booking.user.username}
                                                </p>
                                                <p>
                                                    <span class="font-medium">Date:</span>
                                                    {formatDate(booking.date)}
                                                </p>
                                                <p>
                                                    <span class="font-medium">Time:</span>
                                                    {formatTime(booking.time_start)}
                                                </p>
                                                <p>
                                                    <span class="font-medium">Booking ID:</span>
                                                    {booking.id}
                                                </p>
                                            </div>
                                        </div>

                                        <div class="flex gap-2 ml-4">
                                            <button
                                                on:click={() => handleApprove(booking.id)}
                                                disabled={processingId === booking.id}
                                                class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {#if processingId === booking.id}
                                                    <div class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                                {:else}
                                                    <Check class="w-4 h-4" />
                                                {/if}
                                                Approve
                                            </button>
                                            <button
                                                on:click={() => openRejectModal(booking.id)}
                                                disabled={processingId === booking.id}
                                                class="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <CancelRounded class="w-4 h-4" />
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>
        </div>

        <!-- Accepted Bookings Section -->
        <div class="mb-8">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-xl font-semibold text-gray-900">
                        Confirmed Bookings
                        <span class="ml-2 text-sm font-normal text-gray-500">
                            ({acceptedBookings.length})
                        </span>
                    </h2>
                </div>

                <div class="p-6">
                    {#if acceptedBookings.length === 0}
                        <div class="text-center py-12 text-gray-500">
                            <p>No confirmed bookings</p>
                        </div>
                    {:else}
                        <div class="space-y-4">
                            {#each acceptedBookings as booking (booking.id)}
                                <div
                                    class="border border-gray-200 rounded-lg p-4 bg-green-50/50"
                                >
                                    <div class="flex items-start justify-between">
                                        <div class="flex-1">
                                            <div class="flex items-center gap-3 mb-2">
                                                <span
                                                    class="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                                                >
                                                    Confirmed
                                                </span>
                                                <p class="text-lg font-semibold text-gray-900">
                                                    {booking.user.firstName}
                                                    {booking.user.lastName}
                                                </p>
                                            </div>

                                            <div class="space-y-1 text-sm text-gray-600">
                                                <p>
                                                    <span class="font-medium">Username:</span>
                                                    {booking.user.username}
                                                </p>
                                                <p>
                                                    <span class="font-medium">Date:</span>
                                                    {formatDate(booking.date)}
                                                </p>
                                                <p>
                                                    <span class="font-medium">Time:</span>
                                                    {formatTime(booking.time_start)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>
        </div>

        <!-- Rejected Bookings Section -->
        <div>
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-xl font-semibold text-gray-900">
                        Rejected Bookings
                        <span class="ml-2 text-sm font-normal text-gray-500">
                            ({rejectedBookings.length})
                        </span>
                    </h2>
                </div>

                <div class="p-6">
                    {#if rejectedBookings.length === 0}
                        <div class="text-center py-12 text-gray-500">
                            <p>No rejected bookings</p>
                        </div>
                    {:else}
                        <div class="space-y-4">
                            {#each rejectedBookings as booking (booking.id)}
                                <div
                                    class="border border-gray-200 rounded-lg p-4 bg-red-50/50"
                                >
                                    <div class="flex items-start justify-between">
                                        <div class="flex-1">
                                            <div class="flex items-center gap-3 mb-2">
                                                <span
                                                    class="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full"
                                                >
                                                    Rejected
                                                </span>
                                                <p class="text-lg font-semibold text-gray-900">
                                                    {booking.user.firstName}
                                                    {booking.user.lastName}
                                                </p>
                                            </div>

                                            <div class="space-y-1 text-sm text-gray-600">
                                                <p>
                                                    <span class="font-medium">Username:</span>
                                                    {booking.user.username}
                                                </p>
                                                <p>
                                                    <span class="font-medium">Date:</span>
                                                    {formatDate(booking.date)}
                                                </p>
                                                <p>
                                                    <span class="font-medium">Time:</span>
                                                    {formatTime(booking.time_start)}
                                                </p>
                                            </div>
                                        </div>

                                        <div class="flex gap-2 ml-4">
                                            <button
                                                on:click={() => handleApprove(booking.id)}
                                                disabled={processingId === booking.id}
                                                class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {#if processingId === booking.id}
                                                    <div class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                                {:else}
                                                    <Check class="w-4 h-4" />
                                                {/if}
                                                Approve
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    {/if}
</div>

<!-- Reject Modal -->
{#if showRejectModal}
    <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        on:click={() => (showRejectModal = false)}
    >
        <div
            class="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            on:click|stopPropagation
        >
            <h3 class="text-xl font-bold text-gray-900 mb-4">Reject Booking</h3>
            <p class="text-gray-600 mb-4">
                Please provide a reason for rejecting this booking (optional):
            </p>
            <textarea
                bind:value={rejectReason}
                class="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows="4"
                placeholder="e.g., Time slot no longer available..."
            ></textarea>
            <div class="flex gap-3 mt-4">
                <button
                    on:click={handleReject}
                    disabled={processingId}
                    class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                    {#if processingId}
                        <div class="flex items-center justify-center gap-2">
                            <div class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            Rejecting...
                        </div>
                    {:else}
                        Confirm Rejection
                    {/if}
                </button>
                <button
                    on:click={() => (showRejectModal = false)}
                    disabled={processingId}
                    class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
{/if}

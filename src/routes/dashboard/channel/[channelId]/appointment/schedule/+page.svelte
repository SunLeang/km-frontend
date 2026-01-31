<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import {
        getSchedulesByChannel,
        createAppointmentSchedule,
        updateAppointmentSchedule,
        deleteAppointmentSchedule,
    } from "$providers/actions/kchannel/appointment/schedules";
    import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
    import Trash from "$components/icons/Trash.svelte";
    import Edit from "$components/icons/Edit.svelte";
    import Plus from "$components/icons/Plus.svelte";

    $: channelId = $page.params.channelId;

    let schedules = [];
    let loading = true;
    let showModal = false;
    let editingSchedule = null;

    const DAYS = [
        { value: 0, label: "Sunday" },
        { value: 1, label: "Monday" },
        { value: 2, label: "Tuesday" },
        { value: 3, label: "Wednesday" },
        { value: 4, label: "Thursday" },
        { value: 5, label: "Friday" },
        { value: 6, label: "Saturday" },
    ];

    let formData = {
        day: 1,
        start_time: 540, // 9:00 AM
        end_time: 1020, // 5:00 PM
        is_active: true,
    };

    // Convert minutes to HH:MM format
    function minutesToTime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
    }

    // Convert HH:MM to minutes
    function timeToMinutes(time) {
        const [hours, mins] = time.split(":").map(Number);
        return hours * 60 + mins;
    }

    // Format time for display
    function formatTime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const period = hours >= 12 ? "PM" : "AM";
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${mins.toString().padStart(2, "0")} ${period}`;
    }

    async function loadSchedules() {
        loading = true;
        try {
            const res = await getSchedulesByChannel.load(channelId);
            if (res?.success) {
                schedules =
                    res.data.findAppointmentSchedulesByChannel || [];
            }
        } catch (error) {
            console.error("Failed to load schedules:", error);
        } finally {
            loading = false;
        }
    }

    function openAddModal() {
        editingSchedule = null;
        formData = {
            day: 1,
            start_time: 540,
            end_time: 1020,
            is_active: true,
        };
        showModal = true;
    }

    function openEditModal(schedule) {
        editingSchedule = schedule;
        formData = {
            day: schedule.day,
            start_time: schedule.start_time,
            end_time: schedule.end_time,
            is_active: schedule.is_active,
        };
        showModal = true;
    }

    async function handleSave() {
        try {
            if (editingSchedule) {
                // Update existing schedule
                const res = await updateAppointmentSchedule.load({
                    id: editingSchedule.id,
                    ...formData,
                });
                if (res?.success) {
                    alert("Schedule updated successfully!");
                    await loadSchedules();
                    showModal = false;
                }
            } else {
                // Create new schedule
                const res = await createAppointmentSchedule.load({
                    channel: channelId,
                    ...formData,
                });
                if (res?.success) {
                    alert("Schedule created successfully!");
                    await loadSchedules();
                    showModal = false;
                }
            }
        } catch (error) {
            console.error("Failed to save schedule:", error);
            alert("Error: " + (error.message || "Failed to save schedule"));
        }
    }

    async function handleDelete(scheduleId) {
        if (!confirm("Are you sure you want to delete this schedule?")) return;

        try {
            const res = await deleteAppointmentSchedule.load(scheduleId);
            if (res?.success) {
                alert("Schedule deleted successfully!");
                await loadSchedules();
            }
        } catch (error) {
            console.error("Failed to delete schedule:", error);
            alert("Error: " + (error.message || "Failed to delete schedule"));
        }
    }

    onMount(() => {
        loadSchedules();
    });
</script>

<div class="max-w-6xl mx-auto p-6">
    <div class="flex items-center justify-between mb-8">
        <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
                Schedule Management
            </h1>
            <p class="text-gray-600">
                Manage available appointment time slots for each day of the week
            </p>
        </div>
        <button
            on:click={openAddModal}
            class="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
            <Plus class="w-5 h-5" />
            Add Schedule
        </button>
    </div>

    {#if loading}
        <div class="flex justify-center items-center h-64">
            <SMFBLoading />
        </div>
    {:else}
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            {#if schedules.length === 0}
                <div class="p-12 text-center text-gray-500">
                    <p class="text-lg mb-2">No schedules yet</p>
                    <p class="text-sm">
                        Click "Add Schedule" to create your first availability slot
                    </p>
                </div>
            {:else}
                <div class="divide-y divide-gray-200">
                    {#each DAYS as dayInfo}
                        {@const daySchedules = schedules.filter(
                            (s) => s.day === dayInfo.value
                        )}
                        <div class="p-6">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4">
                                {dayInfo.label}
                            </h3>
                            {#if daySchedules.length === 0}
                                <p class="text-sm text-gray-500 italic">
                                    No schedules for this day
                                </p>
                            {:else}
                                <div class="space-y-3">
                                    {#each daySchedules as schedule (schedule.id)}
                                        <div
                                            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                                        >
                                            <div class="flex items-center gap-4">
                                                <div
                                                    class={`px-3 py-1 rounded-full text-xs font-medium ${
                                                        schedule.is_active
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-gray-200 text-gray-600"
                                                    }`}
                                                >
                                                    {schedule.is_active
                                                        ? "Active"
                                                        : "Inactive"}
                                                </div>
                                                <div class="text-sm">
                                                    <span class="font-medium"
                                                        >{formatTime(schedule.start_time)}</span
                                                    >
                                                    <span class="text-gray-500 mx-2">→</span>
                                                    <span class="font-medium"
                                                        >{formatTime(schedule.end_time)}</span
                                                    >
                                                </div>
                                            </div>
                                            <div class="flex gap-2">
                                                <button
                                                    on:click={() => openEditModal(schedule)}
                                                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit schedule"
                                                >
                                                    <Edit class="w-5 h-5" />
                                                </button>
                                                <button
                                                    on:click={() => handleDelete(schedule.id)}
                                                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete schedule"
                                                >
                                                    <Trash class="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
</div>

<!-- Add/Edit Modal -->
{#if showModal}
    <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        on:click={() => (showModal = false)}
    >
        <div
            class="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            on:click|stopPropagation
        >
            <h3 class="text-xl font-bold text-gray-900 mb-6">
                {editingSchedule ? "Edit Schedule" : "Add New Schedule"}
            </h3>

            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Day of Week
                    </label>
                    <select
                        bind:value={formData.day}
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                        {#each DAYS as day}
                            <option value={day.value}>{day.label}</option>
                        {/each}
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Start Time
                    </label>
                    <input
                        type="time"
                        value={minutesToTime(formData.start_time)}
                        on:change={(e) =>
                            (formData.start_time = timeToMinutes(e.target.value))}
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        End Time
                    </label>
                    <input
                        type="time"
                        value={minutesToTime(formData.end_time)}
                        on:change={(e) =>
                            (formData.end_time = timeToMinutes(e.target.value))}
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                </div>

                <div class="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="is_active"
                        bind:checked={formData.is_active}
                        class="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <label for="is_active" class="text-sm font-medium text-gray-700">
                        Active (available for booking)
                    </label>
                </div>
            </div>

            <div class="flex gap-3 mt-6">
                <button
                    on:click={handleSave}
                    class="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                    {editingSchedule ? "Update" : "Create"} Schedule
                </button>
                <button
                    on:click={() => (showModal = false)}
                    class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
{/if}

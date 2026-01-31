<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    $: channelId = $page.params.channelId;

    // Get API URL from environment or use window location
    const getApiUrl = () => {
        if (browser) {
            // In browser, use the same host as the frontend
            const protocol = window.location.protocol;
            const hostname = window.location.hostname;
            return `${protocol}//${hostname}:3000`;
        }
        return "http://localhost:3000";
    };

    let reportState = {
        loading: false,
        error: "",
        success: "",
    };

    let filters = {
        startDate: "",
        endDate: "",
        status: "all",
    };

    // Set default date range (last 30 days)
    onMount(() => {
        const today = new Date();
        const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        
        filters.endDate = today.toISOString().split("T")[0];
        filters.startDate = thirtyDaysAgo.toISOString().split("T")[0];
    });

    async function generateReport() {
        reportState.loading = true;
        reportState.error = "";
        reportState.success = "";

        try {
            const payload = {
                channelId: channelId,
                startDate: filters.startDate,
                endDate: filters.endDate,
            };

            if (filters.status !== "all") {
                payload.status = filters.status;
            }

            const apiUrl = getApiUrl();
            const response = await fetch(`${apiUrl}/reports/generate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (result.success) {
                reportState.success = "Report generated successfully!";
                // Download the file
                if (result.data?.downloadUrl) {
                    window.open(result.data.downloadUrl, "_blank");
                }
            } else {
                reportState.error = result.message || "Failed to generate report";
            }
        } catch (error) {
            reportState.error = error.message || "Error generating report";
        } finally {
            reportState.loading = false;
        }
    }

    async function listReports() {
        try {
            const apiUrl = getApiUrl();
            const response = await fetch(`${apiUrl}/reports/list`);
            const result = await response.json();

            if (result.success) {
                console.log("Available reports:", result.data);
                // You can display this in a modal or list
            }
        } catch (error) {
            console.error("Error listing reports:", error);
        }
    }
</script>

<div class="p-6">
    <h2 class="font-bold text-2xl text-[#004E80] mb-6">Generate Reports</h2>

    <div class="bg-white rounded-lg shadow p-6">
        <!-- Date Range Filters -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                </label>
                <input
                    type="date"
                    bind:value={filters.startDate}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                </label>
                <input
                    type="date"
                    bind:value={filters.endDate}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Status Filter
                </label>
                <select
                    bind:value={filters.status}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">All Appointments</option>
                    <option value="pending">Pending Only</option>
                    <option value="accepted">Accepted Only</option>
                    <option value="rejected">Rejected Only</option>
                </select>
            </div>
        </div>

        <!-- Generate Button -->
        <div class="flex items-center gap-4">
            <button
                on:click={generateReport}
                disabled={reportState.loading}
                class="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
                {#if reportState.loading}
                    <svg
                        class="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        ></circle>
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    Generating Report...
                {:else}
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
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    Generate CSV Report
                {/if}
            </button>

            <button
                on:click={listReports}
                class="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
            >
                View Past Reports
            </button>
        </div>

        <!-- Success/Error Messages -->
        {#if reportState.success}
            <div class="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                ✅ {reportState.success}
            </div>
        {/if}

        {#if reportState.error}
            <div class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                ❌ {reportState.error}
            </div>
        {/if}

        <!-- Info Box -->
        <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 class="font-semibold text-blue-800 mb-2">📊 Report Information</h3>
            <ul class="text-sm text-blue-700 space-y-1">
                <li>• Reports include all appointment bookings in the selected date range</li>
                <li>• CSV format includes: Booking ID, User Info, Date, Time, Status, Reason</li>
                <li>• Reports are stored securely in AWS S3</li>
                <li>• Download links expire after 1 hour for security</li>
            </ul>
        </div>
    </div>
</div>

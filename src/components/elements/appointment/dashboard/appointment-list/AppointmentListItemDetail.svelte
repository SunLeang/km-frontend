<script>
    import QuestionAnswerCard from "./QuestionAnswerCard.svelte";
    import Close from "$components/icons/Close/Close.svelte";
    import { createEventDispatcher, onMount } from 'svelte';
    import { getAnswersByBookingId } from "$providers/actions/kchannel/appointment/dashboard";
    import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";

    export let appointmentInfo;
    let showProfile = false;
    let loading = true;
    let answers = [];

    const dispatch = createEventDispatcher();

    onMount(async () => {
        if (appointmentInfo?.id) {
            try {
                loading = true;
                const res = await getAnswersByBookingId.load(appointmentInfo.id);
                if (res?.success) {
                    answers = res.data?.getAnswersByBookingId || [];
                }
            } catch (err) {
                console.error("Error loading answers:", err);
            } finally {
                loading = false;
            }
        } else {
            loading = false;
        }
    });
</script>

<div class="flex items-center justify-center w-full h-full">
    <div class=" w-[50%] bg-white rounded-lg shadow p-[1vw] min-h-1/2 h-fit">
        <div class="flex justify-end">
            <button on:click={(()=>(dispatch('close')))}>
                <Close />
            </button>
        </div>
        <ul class=" w-full my-[1.3vw] font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
            <li class="w-full">
                <button on:click={()=>{showProfile=false}} class="{!showProfile ? "text-white bg-[#004E80]" : "text-[#004E80] bg-[#fbfbfb]"} duration-150 w-full p-4 border-r border-gray-200 dark:border-gray-700 flex items-center justify-center ">Form Answers</button>
            </li>
            <li class="w-full">
                <button on:click={()=>{showProfile=true}} class="{showProfile ? "text-white bg-[#004E80]" : "text-[#004E80] bg-[#fbfbfb]"} duration-150 w-full p-4 border-r border-gray-200 dark:border-gray-700 flex items-center justify-center ">Profile</button>
            </li>
        </ul>
        {#if !showProfile}
        <div class=" overflow-scroll h-[50vh]">
            {#if loading}
                <div class="flex justify-center items-center h-full">
                    <SMFBLoading color="teal" />
                </div>
            {:else if answers.length === 0}
                <div class="flex justify-center items-center h-full text-gray-500">
                    <p>No answers found for this appointment.</p>
                </div>
            {:else}
                {#each answers as answer}
                    <QuestionAnswerCard 
                        question={answer.appointment_question?.question || "No question"} 
                        answer={typeof answer.answer === 'object' ? JSON.stringify(answer.answer) : (answer.answer || "No answer")}
                    />
                {/each}
            {/if}
        </div>
        {:else}
            <div class="max-w-lg mx-auto bg-white rounded-lg shadow-md p-5">
                <img class="w-32 h-32 rounded-full mx-auto" src="https://placehold.co/400" alt="Profile picture">
                <h2 class="text-center text-2xl font-semibold mt-3">{appointmentInfo?.user?.firstName || "User"} {appointmentInfo?.user?.lastName || ""}</h2>
                <p class="text-center text-gray-600 mt-1">@{appointmentInfo?.user?.username || "username"}</p>
                <div class="mt-5">
                <h3 class="text-xl font-semibold">Bio</h3>
                <p class="text-gray-600 mt-2">User profile information will be displayed here.</p>
                </div>
            </div>
        {/if}
    </div>
</div>
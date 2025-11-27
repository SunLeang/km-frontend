<script>
    import QuestionAnswerCard from "./QuestionAnswerCard.svelte";
    import Close from "$components/icons/Close/Close.svelte";
    import { createEventDispatcher } from 'svelte';

    let showProfile = false

    const dispatch = createEventDispatcher();
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
            <QuestionAnswerCard question="What are your systoms?" answer="My symptoms are a runny nose, sore throat, and a bit of coughing."/>
            <QuestionAnswerCard question="What are your systoms?" answer="My symptoms are a runny nose, sore throat, and a bit of coughing."/>
            <QuestionAnswerCard question="What are your systoms?" answer="My symptoms are a runny nose, sore throat, and a bit of coughing."/>
            <QuestionAnswerCard question="What are your systoms?" answer="My symptoms are a runny nose, sore throat, and a bit of coughing."/>
            <QuestionAnswerCard question="What are your systoms?" answer="My symptoms are a runny nose, sore throat, and a bit of coughing."/>
            <QuestionAnswerCard question="What are your systoms?" answer="My symptoms are a runny nose, sore throat, and a bit of coughing."/>
        </div>
        {:else}
            <div class="max-w-lg mx-auto bg-white rounded-lg shadow-md p-5">
                <img class="w-32 h-32 rounded-full mx-auto" src="https://i.redd.it/vik1m2dpa98a1.jpg" alt="Profile picture">
                <h2 class="text-center text-2xl font-semibold mt-3">John Doe</h2>
                <p class="text-center text-gray-600 mt-1">Software Engineer</p>
                <div class="mt-5">
                <h3 class="text-xl font-semibold">Bio</h3>
                <p class="text-gray-600 mt-2">John is a software engineer with over 10 years of experience in developing web and mobile applications. He is skilled in JavaScript, React, and Node.js.</p>
                </div>
            </div>
        {/if}
    </div>
</div>
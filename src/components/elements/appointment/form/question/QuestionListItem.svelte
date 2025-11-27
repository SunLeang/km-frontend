<script>
    import QuestionMark from "$components/icons/QuestionMark.svelte";
    import Trash from "$components/icons/Trash.svelte";
    import PenEdit from "$components/icons/Pen/PenEdit.svelte";
    import QuestionDelete from "$components/elements/modals/extension/appointment/form/QuestionDelete.svelte";
    import QuestionFormEdit from "$components/elements/modals/extension/appointment/form/QuestionFormEdit.svelte";
    import Modal from "$components/elements/modals/Modal.svelte";
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher()

    export let id;
    export let question = "";
    export let type = "Text";
    export let required = false;
    export let answers = {};

    let isDeleting = false
    let isEditing = false
    
</script>

<div>
    <div class=" flex items-end ">
        <div class="border-t-2 border-l-2 border-t-[#004E80] border-l-[#004E80] h-4 w-full bg-white rounded-tl-lg"></div>
        <Modal shown={isEditing}>
            <QuestionFormEdit on:updated={()=>{isEditing=false;dispatch("update")}} id={id} question={question} fieldType={type} required={required} options={Object.values(answers)} on:close={()=>{isEditing=false}}/>
        </Modal>
        <div class=" bg-white rounded-t-full">
            <button on:click={()=>{isEditing=true}} class=" border bg-white border-[#004E80] rounded-full text-[#004E80] p-1 hover:bg-gray-200"><PenEdit h=3 w=3/></button>
        </div>
        <div class="w-3 border-t-2 border-t-[#004E80]  h-4 bg-white"></div>
        <Modal shown={isDeleting}>
            <QuestionDelete id={id} on:close={()=>{isDeleting=false}} on:deleted={()=>{dispatch("deleted"), isDeleting=false}}/>
        </Modal>
        <div class=" bg-white rounded-t-full">
            <button on:click={()=>{isDeleting=true}} class=" border bg-white border-red-500 rounded-full text-red-500 p-1 hover:bg-gray-200"><Trash/></button>
        </div>
        <div class="border-t-2 border-r-2 border-t-[#004E80] border-r-[#004E80] h-4 w-2 bg-white rounded-tr-lg"></div>
    </div>
    <div class="border-b-2 border-x-2 border-b-[#004E80] border-x-[#004E80] rounded-b-lg pb-3 px-3 bg-white mb-3 pt-2">
        <div class="flex items-center justify-between">
            <div class="w-[80%] border-2 rounded-lg p-2 text-[#004E80] text-lg flex items-center">
                <QuestionMark/>
                <span class="ml-2">{question}</span>
                {#if required}
                <span class=" text-red-500 pl-1 text-xs">* Required</span>
                {/if}
            </div>
            <button class="w-[19%] border-2 rounded-lg p-2 text-[#004E80] text-lg flex items-center">Type: {type}</button>
        </div>
        <div class=" mt-4">
            {#if type == "Text"}
            <div class="px-3">
                <input placeholder="Answer here" type="text" class="w-full border-b focus:outline-none focus:border-b-[#004E80]">
            </div>
            {:else if type == "Number"}
                <div class="px-3">
                    <input placeholder="Answer here" type="number" class="w-full border-b focus:outline-none focus:border-b-[#004E80]">
                </div>
            {:else if type == "Check Box"}
                <div class="px-3">
                    {#each Object.values(answers) as answer}
                    <div class="my-[0.12rem] inline-flex items-center">
                        <input type="checkbox" class="form-checkbox">
                        <span class="ml-2">{answer}</span>
                    </div><br>
                    {/each}
                </div>
            {:else if type == "Select"}
                <ol class="pl-8">
                    {#each Object.values(answers) as answer}
                    <li>{answer}</li>
                    {/each}
                </ol>
            {/if}
        </div>
    </div>

</div>
<style>
    /* Add a style rule to ensure the list item markers are displayed */
    ol {
        list-style-type: decimal;
    }
</style>

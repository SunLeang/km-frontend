<script>
    import Add from "$components/icons/Add/Add.svelte";
    import Cancel from "$components/icons/Cancel/Cancel.svelte";
    import { fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import { page } from "$app/stores";
    import { createFormQuestion } from "$providers/actions/kchannel/appointment/form";

    const dispatch = createEventDispatcher();
    const animate = (node, args) => fly(node, { y: -50, duration: 300, ...args });
    const fieldOptions = [
        'Text',
        'Number',
        'Check Box',
        'Select'
    ]
    let question;
    let fieldType;
    let required=false;
    let answers = {}
    let loadACreateFormQuestionState = {
		newFormQuestion: null,
		loading: false,
		loaded: false,
		errMsg: "",
	};
    $: options = [
        "Option 1"
    ]

    function addOption() {
        options = [...options, "Option " + (options.length + 1)];
    }

    function removeOption(index) {
        options = options.filter((_, i) => i !== index);
    }

    const onLoadAFormQuestion = async () => {
		try {
			loadACreateFormQuestionState.errMsg = "";
			loadACreateFormQuestionState.loading = true;
			loadACreateFormQuestionState.loaded = false;
            options.forEach((value, index) => {
                answers[index] = value;
            });
			const res = await createFormQuestion.load({
				appointmentForm: $page.params.formId,
                question: question,
                type: fieldType,
                answer: answers,
                is_required: required,
                index: 0
			});
			loadACreateFormQuestionState.newFormQuestion = res.data;
			loadACreateFormQuestionState.loaded = true;
			dispatch("created");
		} catch (err) {
			loadACreateFormQuestionState.errMsg = err.message;
		} finally {
			loadACreateFormQuestionState.loading = false;
            console.log(loadACreateFormQuestionState);
		}
	};
</script>

<div class="flex items-center justify-center w-full h-full">
    <div class=" w-[50%] bg-white rounded-lg shadow p-[1vw] min-h-1/2">
        <form class="container mx-auto p-4" on:submit|preventDefault={onLoadAFormQuestion}>
            <h2 class="text-lg font-bold mb-4">Field Form</h2>
            <div class="mb-4">
                <label for="question" class="block text-gray-700 font-bold mb-2">Question</label>
                <input bind:value={question} type="text" id="question" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
          
            <div class="mb-4">
                <label for="field-selection" class="block text-gray-700 font-bold mb-2">Field Selection</label>
                <select bind:value={fieldType} id="field-selection" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <!-- <option selected disabled value="">Choose an option</option> -->
                    {#each fieldOptions as option}
                    <option value={option}>{option}</option>
                    {/each}
                </select>
            </div>

            {#if fieldType == "Check Box" | fieldType == "Select"}
                <div transition:animate class="p-3 border rounded-lg">
                    <button type="button" on:click={addOption} class="flex text-sm text-[#004E80] items-center hover:underline">
                    <Add h=4 w=4/><span class="mx-1">Add Option</span>
                    </button>
                    
                    <div>
                    {#each options as option, index (option, index)}
                        <div class="flex items-end my-2">
                            <div class="w-4 h-4 rounded border"></div>
                            <input key={index} bind:value={options[index]} type="text" class="w-full border-b ml-2 focus:outline-none focus:border-b-[#004E80]">
                            <button on:click={() => removeOption(index)} type="button" class="p-2 rounded-full hover:bg-gray-200">
                                <Cancel />
                            </button>
                        </div>
                    {/each}
                    </div>
                </div>
            {/if}
          
            <div class="my-4">
                <label class="inline-flex items-center">
                    <input bind:checked={required} type="checkbox" class="form-checkbox">
                    <span class="ml-2">Required</span>
                </label>
            </div>
          
            <div class="flex items-center justify-end">
                <button on:click={()=>dispatch("close")} type="button" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded-lg mr-4 duration-100">Cancel</button>
                <button type="submit" class="bg-[#004E80] hover:bg-[rgb(27,54,71)] text-white py-1 px-2 rounded-lg duration-100">Create</button>
            </div>
        </form>
          
    </div>
</div>

<script>
    import Add from "$components/icons/Add/Add.svelte";
    import QuestionListItem from "./QuestionListItem.svelte";
    import Modal from "$components/elements/modals/Modal.svelte";
	import QuestionFormAdd from "$components/elements/modals/extension/appointment/form/QuestionFormAdd.svelte";
    import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action'
    import { getAllAppointmentQuestions } from '$providers/actions/kchannel/appointment/form'
	import { onMount } from "svelte";
    import { page } from "$app/stores";

	let flipDuartionMs = 0;
    let showAddQuestionPopup = false
	let questionsState = {
		questions: null,
		loading: false,
		errMsg: "",
		loaded: false,
	};

    const onLoadQuestions = async () => {
		try {
			questionsState.errMsg = "";
			questionsState.loading = true;
			questionsState.loaded = false;
			const res = await getAllAppointmentQuestions.load({id: $page.params.formId,});
			questionsState.questions = res.data;
			questionsState.loaded = true;
			questionsState.loading = false;
		} catch (err) {
			questionsState.errMsg = err.message;
		} finally {
			questionsState.loading = false;
			console.log(questionsState);
		}
	};

    const handleConsider = (evt ) => {
        flipDuartionMs = 100
		console.log("consider");
		// evt.detail.items <--
		questionsState.questions.findAppoitmentQuestionByAppointmentFormId = evt.detail.items;
	}

	const handleFinalize = (evt) => {
        flipDuartionMs = 0
		console.log("finalize");
		questionsState.questions.findAppoitmentQuestionByAppointmentFormId = evt.detail.items;
	}

	onMount(async () => {
		await onLoadQuestions();
	});
</script>

<div class="rounded-lg bg-[#F4F4F4] p-[1vw] h-fit">
    {#if questionsState.questions}
        <div
            use:dndzone="{{ items: questionsState.questions.findAppoitmentQuestionByAppointmentFormId, flipDurationMs: flipDuartionMs, dropTargetStyle: {} }}"
            on:consider="{handleConsider}"
            on:finalize="{handleFinalize}"
        >
            {#each questionsState.questions.findAppoitmentQuestionByAppointmentFormId as question (question.id)}
                <div animate:flip="{{ duration: flipDuartionMs}}">
                    <QuestionListItem on:update={onLoadQuestions} on:deleted={onLoadQuestions} id={question.id} type={question.type} question={question.question} required={question.is_required} answers={question.answer}/>
                </div>
            {/each}
        </div>
        <div class="flex justify-end mt-5">
            <Modal shown={showAddQuestionPopup}>
                <QuestionFormAdd 
				on:close={()=>{showAddQuestionPopup=false}}
				on:created={()=>{
					onLoadQuestions();
					showAddQuestionPopup=false
				}}
				/>
            </Modal>
            <button on:click={()=>{showAddQuestionPopup = true}} class="flex items-center text-white bg-[#004E80] text-sm p-1 rounded"><Add/> Add Question</button>
        </div>
    {/if}
</div>
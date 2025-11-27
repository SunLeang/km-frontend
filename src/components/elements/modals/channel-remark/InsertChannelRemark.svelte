<script>
	import SMFBLoading from '$components/materials/spinners/fbLoading/SMFBLoading.svelte';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let datas = [];
	export let shown;
	function convertTextToArray() {
		var textValue = document.querySelector('#textArea').value;
		// split value of textarea by \n
		var lineArray = textValue.split('\n');
		console.log(JSON.stringify(lineArray));
		dispatch('datas', { getNewCard: lineArray });
	}
	let loadCardState = {
		createCard: null,
		loading: false,
		loaded: false,
		errMsg: '',
	};
	const onLoadACardData = async () => {
		try {
			loadCardState.errMsg = '';
			loadCardState.loading = true;
			loadCardState.loaded = false;
			loadCardState.loaded = true;
		} catch (err) {
			loadCardState.errMsg = err.message;
		} finally {
			loadCardState.loading = false;
		}
	};
</script>

{#if shown}
	<div class="flex items-center justify-center w-full h-full">
		<div
			class="  flex flex-col relative bg-white z-50 w-[550px] h-[calc(70vh_-_20px)] min-h-[calc(100vh_-_100px)] rounded-lg shadow-md"
		>
			<form
				on:submit|preventDefault={convertTextToArray}
				class="flex flex-col w-full h-full p-7"
			>
				<div class="flex flex-col flex-grow py-2 space-y-4">
					<div for="message" class="flex-grow-0 pl-2 text-center">
						Import Inputs
					</div>
					<textarea
						name="textArea"
						id="textArea"
						bind:value={datas}
						cols="10"
						maxlength="1000"
						class="flex-grow p-4 border-2 rounded-lg resize-none text-subtitle focus:outline-none"
						placeholder="Insert/paste your new input here"
					/>
				</div>
				<div class="flex-grow-0">
					<div class="flex justify-end w-full space-x-3">
						<button
							on:click={() => dispatch('close')}
							class="inline-flex items-center px-6 py-2 text-center outline-none cursor-pointer text-subtitle bg-background hover:bg-background-1 focus:ring-4 focus:outline-none rounded-xl"
						>
							Cancel
						</button>
						<button
							type="submit"
							class="flex items-center px-10 py-2 space-x-3 text-center text-white cursor-pointer bg-tertiary-3 hover:bg-tertiary-2 focus:ring-4 focus:outline-none rounded-xl"
						>
							{#if loadCardState.loading}
								<SMFBLoading color="white" />
							{:else}
								Add lsit
							{/if}
							{#if !loadCardState.loading && loadCardState.errMsg}
								<div class="p-5 font-semibold text-center text-subtitle-2">
									{loadCardState.errMsg}
								</div>
							{/if}
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
{/if}

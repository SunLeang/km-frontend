<script>
	import { page } from '$app/stores';
	import Modal from '$components/elements/modals/Modal.svelte';
	import Add from '$components/icons/Add/Add.svelte';
	import Cancel from '$components/icons/Cancel/Cancel.svelte';
	import MenuDots from '$components/icons/Menu/Menu-dots.svelte';
	import MenuList from '$components/icons/Menu/Menu-list.svelte';
	import SMFBLoading from '$components/materials/spinners/fbLoading/SMFBLoading.svelte';
	import { clickOutside } from '$lib/utils/click-outside';
	import { updateChannelRemark } from '$providers/actions/kchannel/channel';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import InsertChannelRemark from './InsertChannelRemark.svelte';
	const dispatch = createEventDispatcher();

	export let cardId;
	export let newCard;
	export let shown;
	export let remark;

	let remarkName = remark?.name;
	let remarkDesc = '2023';
	let data = remark?.validationValues;
	let required = remark?.isRequired;
	let insertNewCardRemarkShown = false;
	let isMenuSettingOpen = false;
	let isButtonDisable = false;
	let tout;
	let loadChannelRemarkState = {
		channelRemark: null,
		loading: false,
		loaded: false,
		errMsg: '',
	};

	let newData = '';
	function addTodoList() {
		data = [...data, newData];
		newData = '';
	}
	function removeFromList(list) {
		data.splice(list, 1);
		data = data;
	}

	function clear() {
		data = [];
	}
	console.log('id', remark.id);
	const onLoadUpdateCardRemark = async () => {
		try {
			loadChannelRemarkState.errMsg = '';
			loadChannelRemarkState.loading = true;
			loadChannelRemarkState.loaded = false;
			console.log('dfd', cardId);
			const res = await updateChannelRemark.load({
				id: remark.id,
				name: remarkName,
				desc: remarkDesc,
				channel: $page.params.channelId,
				isRequired: required,
				validationValues: data,
				isEnable: remark.isEnable,
			});
			loadChannelRemarkState.channelRemark = res.data;
			loadChannelRemarkState.loaded = true;
			dispatch('done', {
				newChannelRemark: loadChannelRemarkState.channelRemark,
			});
			console.log('result', loadChannelRemarkState.channelRemark);
		} catch (err) {
			loadChannelRemarkState.errMsg = err.message;
		} finally {
			loadChannelRemarkState.loading = false;
		}
	};
</script>

{#if shown}
	<div class="flex items-center justify-center w-full h-full">
		<div
			class="  flex flex-col relative bg-white z-50 w-[600px] h-[calc(70vh_-_20px)] min-h-[calc(100vh_-_50px)] rounded-lg shadow-md"
		>
			<form
				on:submit|preventDefault={onLoadUpdateCardRemark}
				class="flex flex-col w-full h-full p-7"
			>
				<div class="flex flex-col flex-grow py-2 space-y-4">
					<div class="flex flex-col flex-grow-0 space-y-2">
						<div for="" class="pl-2">Name (ex. id, email, phone, etc)</div>
						<div>
							<input
								name="text"
								bind:value={remarkName}
								required
								type="text"
								class="w-full h-12 px-2 text-gray-600 transition duration-100 ease-in-out bg-white border-2 border-gray-200 rounded-lg cursor-pointer focus:outline-none"
								placeholder=""
							/>
						</div>
						<div class="flex items-center">
							<label
								for="check-approve"
								class="flex items-center space-x-3 cursor-pointer"
							>
								<input
									id="check-approve"
									type="checkbox"
									bind:checked={required}
									class="w-5 h-5 cursor-pointer"
								/>
								<div class="cursor-pointer">
									Required (User must complete this field to join)
								</div>
							</label>
						</div>
					</div>
					<div
						class="flex flex-col flex-grow p-2 space-y-2 border-2 border-gray-200 rounded-lg"
					>
						<div class="flex flex-col flex-grow-0">
							<div class="flex space-x-2">
								<div
									class="flex items-center flex-grow pr-1 border-2 border-gray-200 rounded-lg"
								>
									<input
										name="text"
										bind:value={newData}
										type="text"
										class="flex-grow w-full h-12 px-2 text-gray-600 transition duration-100 ease-in-out border-none rounded-lg cursor-pointer focus:outline-none"
										placeholder="Input here"
									/>
									<button
										type="button"
										on:click={addTodoList}
										class={`${
											newData == ''
												? 'bg-gray-400 cursor-not-allowed'
												: ' bg-gray-700 hover:bg-title-1'
										} flex items-center  h-10 px-2 space-x-2 text-white rounded-md cursor-pointer `}
										disabled={`${newData == '' ? 'disabled' : ''}`}
									>
										<div class="text-white">
											<Add />
										</div>
										Insert
									</button>
								</div>

								<div class="flex flex-grow-0 space-x-2">
									<div
										on:click={() => {
											insertNewCardRemarkShown = true;
										}}
										class="flex items-center h-12 px-3 rounded-md cursor-pointer bg-background-1"
									>
										<div class="text-subtitle">
											<MenuList />
										</div>
									</div>
									<div
										class="relative items-center inline-block space-x-1 text-left"
									>
										<div
											disabled={isButtonDisable}
											on:click={() => {
												isMenuSettingOpen = true;
											}}
											class="relative items-center inline-block h-12 px-3 rounded-md cursor-pointer text-subtitle bg-background-1"
										>
											<div class="flex items-center h-full"><MenuDots /></div>
										</div>
										{#if isMenuSettingOpen}
											<div
												in:fade={{ duration: 100 }}
												class="absolute right-0 z-10 mt-2 space-y-2 origin-top-right bg-white rounded-md shadow-lg w-max ring-1 ring-black ring-opacity-5 focus:outline-none"
											>
												<div
													class="flex items-center px-4 py-2 space-x-2 rounded-md cursor-pointer hover:bg-background-1 text-secondary-3"
													use:clickOutside
													on:click_outside={() => {
														isButtonDisable = true;
														tout = setTimeout(() => {
															isButtonDisable = false;
															isMenuSettingOpen = false;
														}, 50);
													}}
												>
													<div class=" text-secondary-2">Save as file</div>
												</div>
												<div
													class="flex items-center px-4 py-2 space-x-2 rounded-md cursor-pointer hover:bg-background-1 text-primary-4"
													use:clickOutside
													on:click={clear}
													on:click_outside={() => {
														isButtonDisable = true;
														tout = setTimeout(() => {
															isButtonDisable = false;
															isMenuSettingOpen = false;
														}, 50);
													}}
												>
													<div class=" text-primary-3">Clear all</div>
												</div>
											</div>
										{/if}
									</div>
								</div>
							</div>
						</div>
						<div class="relative flex flex-col flex-grow h-full">
							<div class="absolute inset-0 h-full overflow-auto">
								<div class="space-y-2">
									{#each data as id, list}
										<div class="flex items-center pr-3 space-x-2">
											<div class="flex-grow px-2 py-2 bg-background-1">
												{id}
											</div>
											<div
												on:click={() => removeFromList(list)}
												class="flex-grow-0 cursor-pointer text-primary-4 hover:text-primary-3"
											>
												<Cancel />
											</div>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
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
							{#if loadChannelRemarkState.loading}
								<SMFBLoading color="white" />
							{:else}
								Done
							{/if}
						</button>
						{#if !loadChannelRemarkState.loading && loadChannelRemarkState.errMsg}
							<div class="p-5 font-semibold text-center text-subtitle-2">
								{loadChannelRemarkState.errMsg}
							</div>
						{/if}
					</div>
				</div>
			</form>
		</div>
	</div>
{/if}

<Modal shown={insertNewCardRemarkShown}>
	<InsertChannelRemark
		shown={true}
		on:close={() => (insertNewCardRemarkShown = false)}
		on:datas={(evt) => {
			const getArrayData = evt.detail.getNewCard;
			data = [...data, ...getArrayData];
			console.log('Here', getArrayData);
			insertNewCardRemarkShown = false;
		}}
	/>
</Modal>

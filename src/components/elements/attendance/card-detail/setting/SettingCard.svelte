<script>
	import { page } from "$app/stores";
	import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
	import { updateCardAttd } from "$providers/actions/kchannel/card/card";
	export let card;
	let cardName = card.name;
	let approved = card.autoApproved;

	let loadUpdateCardAttdState = {
		updateCardAttd: null,
		loading: false,
		loaded: false,
		errMsg: "",
	};
	
	const onLoadUpdateCardAttd = async () => {
		try {
			loadUpdateCardAttdState.loading = true;
			loadUpdateCardAttdState.errMsg = "";
			loadUpdateCardAttdState.loaded = false;
			const res = await updateCardAttd.load({
				id: card.id,
				name: cardName,
				channel: $page.params.channelId,
				desc: card.desc,
				extensionKeyname: card.extensionKeyname,
				autoApproved: approved,
				deleted: false,
			});
			loadUpdateCardAttdState.updateCardAttd = res.data;
			loadUpdateCardAttdState.loaded = true;
			card = res.data;
		} catch (err) {
			loadUpdateCardAttdState.errMsg = err.message;
		} finally {
			loadUpdateCardAttdState.loading = false;
		}
	};
</script>

<div
	class="flex flex-col flex-grow-0 p-4 border rounded-md shadow border-background-1"
>
	<form on:submit|preventDefault={onLoadUpdateCardAttd}>
		<div class="flex-grow space-y-4">
			<div class="w-full space-y-2">
				<div>Card name</div>
				<div class="w-full border-2 rounded-md border-background-1">
					<input
						type="text"
						id="default-search"
						maxlength="80"
						bind:value={cardName}
						class="w-full p-2 px-4 text-base rounded-full outline-none text-subtitle dark:placeholder-gray-400"
						placeholder="neme here..."
					/>
				</div>
			</div>
			<div class="flex items-center">
				<label
					for="check-approve"
					class="flex items-center space-x-3 cursor-pointer"
				>
					<input
						id="check-approve"
						type="checkbox"
						bind:checked={approved}
						class="w-5 h-5 cursor-pointer"
					/>
					<div class="cursor-pointer">Auto approval</div>
				</label>
			</div>
		</div>
		<div class="flex justify-end flex-grow-0">
			<button
				type="submit"
				class="flex justify-center w-32 py-2 text-white rounded-md shadow cursor-pointer hover:bg-tertiary-2 bg-tertiary-3"
			>
				{#if loadUpdateCardAttdState.loading}
					<SMFBLoading color="white" />
				{:else}
					Save change
				{/if}
				{#if !loadUpdateCardAttdState.loading && loadUpdateCardAttdState.errMsg}
					<div class="p-5 font-semibold text-center text-subtitle-2">
						{loadUpdateCardAttdState.errMsg}
					</div>
				{/if}
			</button>
		</div>
	</form>
</div>

<script>
	import { page } from '$app/stores';
	import SMFBLoading from '$components/materials/spinners/fbLoading/SMFBLoading.svelte';
	import {
		subscribeChannelExtension,
		unsubscribeChannelExtension,
	} from '$providers/actions/kchannel/extension.js';
	import { createEventDispatcher } from 'svelte';
	$: channelId = $page.params.channelId;
	const dispatch = createEventDispatcher();
	export let extensionDetail;
	console.log(extensionDetail);
	export let shown;

	let currentDate = new Date();
	let futureDate = new Date();
	futureDate.setDate(currentDate.getDate() + 365); // + days

	let currentUnixTime = currentDate.getTime();
	let futureUnixTime = futureDate.getTime();

	let expired = futureUnixTime;
	console.log(expired);

	let issused = currentUnixTime;
	console.log(issused);

	let loadSubOrUnsubChannel = {
		subscriptionChannel: null,
		unsubscriptionChannel: null,
		loading: false,
		errMsg: '',
		loaded: false,
	};

	const onLoadSubOrUnsubChannelExtension = async () => {
		try {
			loadSubOrUnsubChannel.errMsg = '';
			loadSubOrUnsubChannel.loading = true;
			loadSubOrUnsubChannel.loaded = false;
			if (extensionDetail.subscription === null) {
				loadSubOrUnsubChannel.subscriptionChannel =
					await subscribeChannelExtension.load({
						extension: extensionDetail?.id,
						channel: $page.params.channelId,
					});
			} else {
				loadSubOrUnsubChannel.unsubscriptionChannel =
					await unsubscribeChannelExtension.load({
						extension: extensionDetail?.id,
						channel: $page.params.channelId,
					});
			}
			loadSubOrUnsubChannel.loaded = true;
			dispatch('onSubscribed');
		} catch (err) {
			loadSubOrUnsubChannel.errMsg = err.message;
		} finally {
			loadSubOrUnsubChannel.loading = false;
		}
	};
</script>

{#if shown}
	<div class="flex items-center justify-center w-full h-full">
		<form on:submit|preventDefault={onLoadSubOrUnsubChannelExtension}>
			<div
				class=" flex flex-col px-6 py-6 bg-white w-[1100px] h-[calc(70vh_-_20px)] min-h-[calc(100vh_-_50px)] rounded-lg shadow-md"
			>
				<div class="flex flex-col flex-grow">
					<div class="flex-grow-0">
						<div class="text-2xl text-center">Subscription</div>
						<div class="flex h-full py-4 space-x-4">
							<div class="flex-grow-0">
								<img
									class="object-cover max-w-[70px] border rounded-full"
									src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRiq1bLrcauiDM9M25zOVemm6a6kYDITVQ7Q&usqp=CAU"
									alt=""
								/>
							</div>

							<div class="flex-grow">
								<div class="text-xl">{extensionDetail?.name}</div>

								<div>
									To keep using this account after the trial ends, set up a
									subscription.
								</div>
							</div>
						</div>
					</div>
					<div class="flex flex-col flex-grow text-base">
						<hr class=" flex-grow-0 bg-subtitle-2 h-[2px]" />

						<div class="flex flex-grow py-3 text-subtitle">
							<div>
								list main options of each Extension
							</div>
						</div>
					</div>
				</div>
				<div class="flex justify-end flex-grow-0 space-x-3">
					<button
						on:click={() => dispatch('close')}
						class="inline-flex items-center px-6 py-2 text-center cursor-pointer text-subtitle bg-background hover:bg-background-1 focus:ring-4 focus:outline-none rounded-xl"
					>
						Cancel
					</button>
					<button
						disabled={loadSubOrUnsubChannel.loading}
						class="items-center px-10 py-2 text-center text-white cursor-pointer bg-tertiary-3 hover:bg-tertiary-2 focus:ring-4 focus:outline-none rounded-xl"
						type="submit"
					>
						{#if loadSubOrUnsubChannel.loading}
							<SMFBLoading color="white" />
						{:else}
							Submit
						{/if}
						{#if !loadSubOrUnsubChannel.loading && loadSubOrUnsubChannel.errMsg}
							<div class="p-5 font-semibold text-center text-subtitle-2">
								{loadSubOrUnsubChannel.errMsg}
							</div>
						{/if}
					</button>
				</div>
			</div>
		</form>
	</div>
{/if}

<!-- 
<div class="flex flex-col flex-grow py-4 space-x-3 bg-red-100">
	<div class="flex">
		<div class="flex-grow-0">Select Plan</div>
		<div
			class="flex flex-grow space-x-2 bg-red-100 border-2 border-red-200"
		>
			<div class="px-2 py-2 bg-blue-200 hover:bg-slate-300">
				Monthly
			</div>
			<div class="px-2 py-2 hover:bg-slate-300">Yearly</div>
			<div class="px-2 py-2 hover:bg-slate-300">Annually</div>
		</div>
	</div>
	<div class="border-2 border-background-1">
		<div class="flex border-2 rounded-lg border-subtitle-2">
			<div class="flex items-center flex-grow space-x-4">
				<input type="radio" class="scale-150" />
				<div>
					<div>Plus</div>
					<div>for individuals</div>
				</div>
			</div>
			<div class="flex-grow-0 text-right">
				<div>9,000 រៀល</div>
				<div>User | Month</div>
			</div>
		</div>
		<div
			class="flex flex-col border-2 rounded-lg border-subtitle-2"
		>
			<div class="flex">
				<div class="flex items-center flex-grow space-x-4">
					<input type="radio" class="scale-150" />
					<div>
						<div>Standard</div>
						<div>for Teams</div>
					</div>
				</div>
				<div class="flex-grow-0 text-right">
					<div>19,000 រៀល</div>
					<div>User | Month</div>
				</div>
			</div>
			<div>
				<div>10 Grups</div>
				1000 Members
			</div>
		</div>
		<div
			class="flex flex-col border-2 rounded-lg border-subtitle-2"
		>
			<div class="flex">
				<div class="flex items-center flex-grow space-x-4">
					<input type="radio" class="scale-150" />
					<div>
						<div>Advanced</div>
						<div>for Teams</div>
					</div>
				</div>
				<div class="flex-grow-0 text-right">
					<div>49,000 រៀល</div>
					<div>User | Month</div>
				</div>
			</div>
			<div>
				<div>10+ Grups</div>
				1000+ Members
			</div>
		</div>
	</div>
</div>
<div
	class="flex flex-col flex-grow-0 py-4 space-x-3 bg-purple-200"
>
	<div class="flex">
		<div class="flex-grow-0">Payment</div>
		<div
			class="flex flex-grow space-x-2 bg-red-100 border-2 border-red-200"
		>
			<div class="px-2 py-2 hover:bg-slate-300">KCard</div>
			<div class="px-2 py-2 bg-blue-200 hover:bg-slate-300">
				Credit Card
			</div>
		</div>
	</div>
	<div class="border-2 border-background-1">
		<div class="flex border-2 rounded-lg border-subtitle-2">
			<div class="flex items-center flex-grow space-x-4">
				<input type="radio" class="scale-150" />
				<div>
					<div>Plus</div>
					<div>for individuals</div>
				</div>
			</div>
			<div class="flex-grow-0 text-right">
				<div>19,000 រៀល</div>
				<div>User | Month</div>
			</div>
		</div>
		<div
			class="flex flex-col border-2 rounded-lg border-subtitle-2"
		>
			<div class="flex">
				<div class="flex items-center flex-grow space-x-4">
					<input type="radio" class="scale-150" />
					<div>
						<div>Standard</div>
						<div>for Teams</div>
					</div>
				</div>
				<div class="flex-grow-0 text-right">
					<div>49,000 រៀល</div>
					<div>User | Month</div>
				</div>
			</div>
			<div>10 Grups 1000 Members</div>
		</div>
		<div
			class="flex flex-col border-2 rounded-lg border-subtitle-2"
		>
			<div class="flex">
				<div class="flex items-center flex-grow space-x-4">
					<input type="radio" class="scale-150" />
					<div>
						<div>Advanced</div>
						<div>for Teams</div>
					</div>
				</div>
				<div class="flex-grow-0 text-right">
					<div>99,000 រៀល</div>
					<div>User | Month</div>
				</div>
			</div>
			<div>Grups Unlimited 1000+ Members</div>
		</div>
	</div>
</div> -->
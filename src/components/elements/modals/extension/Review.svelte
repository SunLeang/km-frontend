<script>
	import BigStar from '$components/icons/Star/BigStar.svelte';
	import BigStarFill from '$components/icons/Star/BigStarFill.svelte';
	import SMFBLoading from '$components/materials/spinners/fbLoading/SMFBLoading.svelte';
	import {
		createChannelReview,
		updateChannelReview,
	} from '$providers/actions/kchannel/extension.js';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	export let extensionDetail;
	export let shown;
	let rating = extensionDetail.review?.rate || 0;
	let feedback = extensionDetail.review?.feedback;
	let rate;

	let loadUserReview = {
		createReview: null,
		updateReview: null,
		loading: false,
		errMsg: '',
		loaded: false,
	};
	function selectRating(value) {
		rating = value;
		rate = rating;
		dispatch('ratingSelected', { rating });
	}

	const onCreateAReviewer = async () => {
		try {
			loadUserReview.errMsg = '';
			loadUserReview.loading = true;
			loadUserReview.loaded = false;
			if (extensionDetail.review === null) {
				loadUserReview.createReview = await createChannelReview.load({
					extension: extensionDetail?.id,
					feedback: feedback,
					rate: rating,
				});
			} else {
				loadUserReview.updateReview = await updateChannelReview.load({
					id: extensionDetail.review?.id,
					feedback: feedback,
					rate: rating,
				});
			}
			loadUserReview.loaded = true;
			dispatch('onReviewed');
		} catch (err) {
			loadUserReview.errMsg = err.message;
		} finally {
			loadUserReview.loading = false;
		}
	};

	onMount(() => {
		// Trigger an initial event dispatch with the default rating
		dispatch('ratingSelected', { rating });
	});
</script>

{#if shown}
	<div class="flex items-center justify-center w-full h-full">
		<div class=" relative bg-white w-[600px] h-[540px] rounded-lg shadow-md">
			<form on:submit|preventDefault={onCreateAReviewer} class="px-6 py-6">
				<div class="flex items-center h-full space-x-4">
					<img
						class="object-cover w-16 border rounded-full"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRiq1bLrcauiDM9M25zOVemm6a6kYDITVQ7Q&usqp=CAU"
						alt=""
					/>
					<div class="text-2xl">
						{extensionDetail?.name}
						{extensionDetail?.id}
					</div>
				</div>

				<div class="py-3 text-xl text-subtitle">
					Tap to rate
					<div class="flex py-4 space-x-3">
						{#each [1, 2, 3, 4, 5] as star}
							<div
								class={`fill-current cursor-pointer ${
									star <= rating ? 'text-secondary-4' : 'text-secondary-4'
								}`}
								on:click={() => selectRating(star)}
							>
								{#if star <= rating}
									<BigStarFill />
								{:else}
									<BigStar />
								{/if}
							</div>
						{/each}
					</div>
				</div>
				<div class="">
					<div for="message" class="py-4">Share your feedback</div>
					<textarea
						name="feedback"
						bind:value={feedback}
						id="feedback"
						cols="30"
						rows="5"
						maxlength="500"
						class="w-full p-4 border-2 rounded-lg resize-none text-subtitle focus:outline-none"
						placeholder="Write down your opinion here..."
					/>
				</div>

				<div
					class="absolute flex justify-end w-full space-x-3 bottom-6 right-6"
				>
					<button
						on:click={() => dispatch('close')}
						class="inline-flex items-center px-6 py-2 text-center cursor-pointer text-subtitle bg-background hover:bg-background-1 focus:ring-4 focus:outline-none rounded-xl"
					>
						Cancel
					</button>
					<button
						disabled={loadUserReview.loading}
						class="items-center px-10 py-2 text-center text-white cursor-pointer bg-tertiary-3 hover:bg-tertiary-2 focus:ring-4 focus:outline-none rounded-xl"
						type="submit"
					>
						{#if loadUserReview.loading}
							<SMFBLoading color="white" />
						{:else}
							Submit
						{/if}
						{#if !loadUserReview.loading && loadUserReview.errMsg}
							<div class="p-5 font-semibold text-center text-subtitle-2">
								{loadUserReview.errMsg}
							</div>
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

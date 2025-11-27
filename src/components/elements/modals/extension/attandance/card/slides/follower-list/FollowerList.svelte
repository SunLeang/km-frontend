<script>
	import SMFBLoading from '$components/materials/spinners/fbLoading/SMFBLoading.svelte';
	import { createEventDispatcher } from 'svelte';
	import InfiniteScoll from '../../../../../../../utils/InfiniteScoll.svelte';
	import FollowerItem from './FollowerItem.svelte';
	const dispatch = createEventDispatcher();
	export let followships;
	export let scrollEle;
	export let hasMore;
</script>

{#each followships.allFollowship as followship, index (followship.id)}
	<FollowerItem
		{followship}
		active={followship?.active}
		on:select={(evt) =>
			dispatch('select', { followship: evt.detail.followship })}
	/>
{/each}
{#if followships.allFollowship.length !== null}
	{#if followships.loading}
		<div class="flex items-center justify-center w-full h-full">
			<SMFBLoading color="gray" />
		</div>
	{/if}
{:else}
	<div class="flex items-center justify-center w-full h-full">hello</div>
{/if}

{#if !followships.loading && followships.errMsg}
	<div
		class="absolute inset-0 z-50 flex items-center justify-center w-full h-full"
	>
		{followships.errMsg}
	</div>
{/if}

<InfiniteScoll
	elementScroll={scrollEle}
	threshold={20}
	bind:hasMore
	on:loadMore={() => {
		dispatch('loadMore');
	}}
/>

<script>
	import { page } from "$app/stores";
	import Group from "$components/icons/Group/Group.svelte";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	export let card;

	$: cardId = $page.params.cid;
	$: active = cardId == card.id;
</script>

<div>
	<div
		on:click={() => {
			dispatch("select", { card });
		}}
		class="flex items-center justify-center shadow cursor-pointer hover:bg-tertiary-1 w-52 h-28 rounded-2xl {active
			? 'bg-tertiary-1'
			: 'bg-tertiary-2'}"
	>
		<div class="flex flex-col px-2 text-white">
			<div class="text-center">
				<div class="flex justify-center"><Group /></div>
				<div class="text-base break-all line-clamp-2">{card.name}</div>
				<div>{card.memberTotal} members</div>
			</div>
		</div>
	</div>
</div>

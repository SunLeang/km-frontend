<script>
	import AddCircle from '$components/icons/Add/AddCircle.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>
<div
	on:click={() => {
		dispatch('addNewCard');
	}}
	class=" flex items-center cursor-pointer hover:bg-tertiary-1 justify-center w-52 h-28 bg-tertiary-2 rounded-2xl shadow"
>
	<div class=" flex flex-col text-white text-center">
		<div class=" m-auto">
			<div class=" flex justify-center"><AddCircle /></div>
			<div>New card</div>
		</div>
	</div>
</div>

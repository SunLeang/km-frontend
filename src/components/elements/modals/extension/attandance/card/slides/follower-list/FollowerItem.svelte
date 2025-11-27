<script>
	import { formatDate } from '$lib/utils/date';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let followship;
	export let active;
</script>

<label
	class="flex items-center cursor-pointer"
	for={`checkbox-${followship.id}`}
>
	<input
		type="checkbox"
		id={`checkbox-${followship.id}`}
		class="scale-150 cursor-pointer form-checkbox"
		bind:checked={active}
		on:change={() => {
			dispatch('select', { followship });
		}}
	/>
	<div class="w-full pl-6">
		<div
			class="flex items-center justify-between w-full p-2 px-4 bg-white rounded-xl"
		>
			<div class="flex items-center">
				<img
					class="w-16 h-16 rounded-full shadow-sm"
					src="https://cdn-icons-png.flaticon.com/512/4835/4835386.png"
					alt=""
				/>
				<span class="ml-4 text-subtitle"
					>{followship?.user?.firstName}
					{followship?.user?.lastName}
					<div class=" text-subtitle-2">
						{followship?.user?.username}
					</div></span
				>
			</div>

			<div>{formatDate(followship?.updatedAt)}</div>
		</div>
	</div>
</label>

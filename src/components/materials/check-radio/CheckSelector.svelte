<script>
	export let checked = false;
</script>

{#if checked === true}
	<div class=" m-auto">
		<div class=" border-2 border-tertiary-4 p-[2px] rounded-full">
			<div class=" w-4 h-4 rounded-full bg-tertiary-4" />
		</div>
	</div>
{:else}
	<div class=" m-auto">
		<div class=" border-2 border-background-1 p-[2px] rounded-full">
			<div class=" w-4 h-4" />
		</div>
	</div>
{/if}

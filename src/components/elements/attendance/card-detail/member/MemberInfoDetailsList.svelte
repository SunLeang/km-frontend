<script>
	import { createEventDispatcher } from "svelte";
	import { flip } from "svelte/animate";
	import MemberInfoDetailsListItem from "./MemberInfoDetailsListItem.svelte";
	export let memberships = [];
	const dispatch = createEventDispatcher();
	let memberRemarks = [
		{ id: "1", status: "Present", remark: "" },
		{ id: "2", status: "Late", remark: "" },
		{ id: "3", status: "Absent", remark: "" },
		{ id: "4", status: "Excuse", remark: "" },
	];
</script>

{#each memberships as membership (membership.id)}
	<div animate:flip class="w-full">
		<MemberInfoDetailsListItem
			{membership}
			{memberRemarks}
			on:select={(evt) => {
				dispatch("select", { membership });
			}}
		/>
	</div>
{/each}

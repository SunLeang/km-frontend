<style>
	div {
		height: 1.5em;
		text-align: center;
		border: 1px solid black;
		margin: 0.2em;
		padding: 3em;
	}
	section {
		border: 1px solid black;
		width: 10em;
		padding: 0.5em;
		height: fit-content;
	}
	:global(.red-text) {
		color: red;
	}
</style>
<script>
	import {dndzone} from 'svelte-dnd-action';
	import {flip} from 'svelte/animate';
	const flipDurationMs = 200;
	let items = [
		{
			id: 1, // need to be unique
			title: "Blog post 1",
			description: "Blog post 1 description :)",
			tags: ["Cooper Codes"]
		},
		{
			id: 2, // need to be unique
			title: "Blog post 2",
			description: "Blog post 2 description :)",
			tags: ["Development", "Coding"]
		},
		{
			id: 3, // need to be unique
			title: "Blog post 3",
			description: "Make sure to subscribe and like the video.",
			tags: ["Subscribe"]
		},
		{
			id: 4, // need to be unique
			title: "Blog post 1",
			description: "Blog post 1 description :)",
			tags: ["Cooper Codes"]
		},
		{
			id: 5, // need to be unique
			title: "Blog post 2",
			description: "Blog post 2 description :)",
			tags: ["Development", "Coding"]
		},
		{
			id: 6, // need to be unique
			title: "Blog post 3",
			description: "Make sure to subscribe and like the video.",
			tags: ["Subscribe"]
		},
		{
			id: 7, // need to be unique
			title: "Blog post 3",
			description: "Make sure to subscribe and like the video.",
			tags: ["Subscribe"]
		},
		{
			id: 8, // need to be unique
			title: "Blog post 1",
			description: "Blog post 1 description :)",
			tags: ["Cooper Codes"]
		},
		{
			id: 9, // need to be unique
			title: "Blog post 2",
			description: "Blog post 2 description :)",
			tags: ["Development", "Coding"]
		},
		{
			id: 10, // need to be unique
			title: "Blog post 3",
			description: "Make sure to subscribe and like the video.",
			tags: ["Subscribe"]
		},
	];
	let dropTargetStyle;
	function handleSort(e) {
		items = e.detail.items;
		const isParty = (Math.random() < 0.2); 
		dropTargetStyle = {
			"background-color": isParty? 'green' : 'yellow' 
		};
	}   
</script>
<section use:dndzone={{items, flipDurationMs, dropTargetStyle, dropTargetClasses: ["red-text"]}} on:consider={handleSort} on:finalize={handleSort}>
	{#each items as item(item.id)}
		<div animate:flip={{duration:flipDurationMs}}>
			{item.title}	
		</div>
	{/each}
</section>
<script>
	import { createEventDispatcher } from 'svelte';
	import CardAddFollower from './slides/CardAddFollower.svelte';
	import NewCard from './slides/NewCard.svelte';
	const dispatch = createEventDispatcher();
	export let newCard;
	export let shown;
	let createCard, cardAddFollow, getCard;
	const slides = {
		NEWCARD: 'createCard',
		CARDADDFOLLOW: 'cardAddFollow',
	};

	let currSlide = slides.NEWCARD;
</script>

<div class="flex items-center justify-center w-full h-full">
	
		<NewCard
			{newCard}
			shown={currSlide === slides.NEWCARD}
			on:next={(evt) => {
				getCard = evt.detail.getNewCard;
				currSlide = slides.CARDADDFOLLOW;
			}}
			on:close={() => {
				dispatch('close');
			}}
		/>
		
		<CardAddFollower
			shown={currSlide === slides.CARDADDFOLLOW}
			{getCard}
			on:created={() => {
				dispatch('created');
			}}
		/>
	
</div>

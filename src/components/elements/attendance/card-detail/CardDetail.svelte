<script>
	import Group from "$components/icons/Group/Group.svelte";
	import Setting from "$components/icons/Setting/Setting.svelte";
	import TimeSet from "$components/icons/Time/TimeSet.svelte";
	import { createEventDispatcher, onMount } from "svelte";
	import CardSelectedHeader from "./CardDetailHeader.svelte";
	import CardSelectedMembers from "./CardMembers.svelte";
	import CardSelectedSessions from "./CardSessions.svelte";
	import CardSelectedSetting from "./CardSetting.svelte";
	import { getCardMembershipByCard } from "$providers/actions/kchannel/card/card-membership";
	import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";

	export let selectedCard;
</script>

<div class="flex flex-col h-screen p-4 bg-white rounded-lg shadow-sm">
	<div class="flex justify-between flex-grow-0">
		<CardSelectedHeader bind:selectedCard />
	</div>
	<div class="relative flex flex-col flex-grow pt-3 pl-4">
		<div class="absolute inset-0">
			<div class="flex flex-col w-full h-full pl-3">
				<div class="flex-grow-0">
					<hr class=" bg-background h-[2px]" />
				</div>
				<div class="relative flex-grow w-full">
					<div class="absolute inset-0">
						<slot />
						<!-- {#if switchButton === "session"}
							<div class="w-full h-full py-4">
								<CardSelectedSessions
									bind:selectedCard
									{loadCardMemberByCardState}
								/>
							</div>
						{:else}
							<div class="w-full h-full py-4">
								<CardSelectedSetting
									bind:selectedCard
									bind:loadCardMemberByCardState
									on:cardDeleted={(evt) => {
										dispatch("cardDeleted", { card: evt.detail.card });
									}}
								/>
							</div>
						{/if}
						{#if loadCardMemberByCardState.loading}
							<div class="m-auto"><SmfbLoading color="gray" /></div>
						{/if} -->
				
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

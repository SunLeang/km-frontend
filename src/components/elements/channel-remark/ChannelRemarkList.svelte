<script>
	import { myChannelRemarks } from '$providers/stores/kchannel/my-channel-remarks';
	import { createEventDispatcher } from 'svelte';
	import ChannelRemarkListItem from './ChannelRemarkListItem.svelte';
	let updateChannelRemarkShown = false;

   const dispatch = createEventDispatcher();
	let selectedRemarkChannel;
   
</script>

{#each $myChannelRemarks as remark}
   <div  class="w-full">
      <ChannelRemarkListItem
         {remark}
         on:reloadData={(evt) => {
            dispatch('reloadData');
         }} 
      />
   </div>
{/each}

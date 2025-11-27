<script>
	import KeyIcon from '$components/icons/Key.svelte';
	import UserIcon from '$components/icons/User.svelte';
	import { user } from '$providers/stores/kauth/user';
</script>

{#if $user}
	<div class="flex bg-green-50 rounded border p-4 text-gray-600">
		<div class="flex-1 space-y-4">
			<div class="flex flex-row space-x-2">
				<UserIcon />
				<div>{$user.username}</div>
			</div>
		</div>
		<div class="flex-1">
			<div class="flex flex-row space-x-2">
				<KeyIcon />
				<div>{$user.role == '1' ? 'Admin' : 'User'}</div>
			</div>
		</div>
	</div>
{:else}
	<div class="bg-red-50 rounded border p-4 text-center font-semibold">Who are you?</div>
{/if}

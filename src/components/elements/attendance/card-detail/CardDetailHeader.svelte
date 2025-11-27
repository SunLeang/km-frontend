<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import Group from "$components/icons/Group/Group.svelte";
	import QRCode from "$components/icons/QRCode/QRCode.svelte";
	import Setting from "$components/icons/Setting/Setting.svelte";
	import Share from "$components/icons/Share/Share.svelte";
	import TimeSet from "$components/icons/Time/TimeSet.svelte";
	import { formatDate } from "$lib/utils/date";
	import { beforeUpdate } from "svelte";
	const HeaderMenu = {
		SESSION: "",
		MEMBER: "member",
		SETTING: "setting",
	};

	export let selectedCard;
	let selectedMenu = HeaderMenu.SESSION;
	const onInitMenu = () => {
		try {
			const name = $page.route.id.split("/")[7];
			if(!name) throw "Not found";
			selectedMenu = name;
		} catch {
			selectedMenu = HeaderMenu.SESSION;
		}
	};

	$: chId = $page.params?.channelId;
	$: cardId = $page.params?.cid;

	beforeUpdate(() => {
		onInitMenu();
	});
</script>

<div class=" w-full">
	<div class="flex w-full space-x-2">
		<div class="flex flex-grow pl-2 space-x-4">
			<div class="flex justify-center"><Group /></div>
			<div class=" text-subtitle">
				<div class="text-2xl font-medium break-all text-title-1 line-clamp-1">
					{selectedCard?.name}
				</div>
				<div>{selectedCard?.memberTotal} members</div>
				<div>{formatDate(selectedCard?.createdAt)}</div>
			</div>
		</div>
		<div class="flex-grow-0 space-y-3">
			<div
				class="flex p-2 px-3 space-x-2 rounded-lg cursor-pointer w-max text-title-1 bg-background hover:bg-background-1"
			>
				<div>Registration QRCode</div>
				<QRCode />
			</div>
			<div class="flex justify-end">
				<div
					class="flex p-2 px-3 space-x-2 rounded-lg cursor-pointer w-max text-title-1 bg-background hover:bg-background-1"
				>
					<div>Csv export</div>
					<Share />
				</div>
			</div>
		</div>
	</div>
	<div>
		<div class="flex space-x-1">
			<div
				on:click={() => {
					selectedMenu = HeaderMenu.SESSION;
					const chId = $page.params?.channelId;
					const cardId = $page.params?.cid;
					goto(`/dashboard/channel/${chId}/attendance/card/${cardId}`);
				}}
				class=" py-2 px-4 space-x-4 flex cursor-pointer {selectedMenu ===
				HeaderMenu.SESSION
					? 'bg-subtitle text-white'
					: 'bg-background text-title'}"
			>
				<div class=""><TimeSet /></div>
				<div>Sessions</div>
			</div>
			<div
				on:click={() => {
					selectedMenu = HeaderMenu.MEMBER;
					goto(`/dashboard/channel/${chId}/attendance/card/${cardId}/member`);
				}}
				class=" py-2 px-4 space-x-4 flex cursor-pointer {selectedMenu ===
				HeaderMenu.MEMBER
					? 'bg-subtitle text-white'
					: 'bg-background text-title'}"
			>
				<div class=""><Group /></div>
				<div>Members</div>
			</div>
			<div
				on:click={() => {
					selectedMenu = HeaderMenu.SETTING;
					goto(`/dashboard/channel/${chId}/attendance/card/${cardId}/setting`);
				}}
				class=" py-2 px-4 flex space-x-4 cursor-pointer {selectedMenu ===
				HeaderMenu.SETTING
					? 'bg-subtitle text-white'
					: 'bg-background text-title'}"
			>
				<div><Setting /></div>
				<div>Setting</div>
			</div>
		</div>
	</div>
</div>

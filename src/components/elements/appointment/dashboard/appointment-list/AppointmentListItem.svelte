<script>
    import Clock from "$components/icons/Clock.svelte";
    import Eye from "$components/icons/Eye.svelte";
    import CancelRounded from "$components/icons/Cancel/CancelRounded.svelte";
    import Check from "$components/icons/Check.svelte";
    import AppointmentListItemDetail from "./AppointmentListItemDetail.svelte";
    import Modal from "$components/elements/modals/Modal.svelte";
    import { updateAppointmentBookingStatus } from '$providers/actions/kchannel/appointment/dashboard'
    import { Button, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
    import { createEventDispatcher } from "svelte";

    export let appointmentInfo;

    let dispatch = createEventDispatcher()
    let showDetail = false;

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    async function updateStatus (status) {
        let tmp = await updateAppointmentBookingStatus.load({id: appointmentInfo.id, status: status})
        console.log(tmp);
        appointmentInfo = tmp.data.updateAppointmentBooking
        dispatch("updated")
    }

    $: appointmentInfo
</script>

<tr class="bg-white flex items-center justify-between rounded-xl border w-full my-1">
    <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <div>
            {#if appointmentInfo.date}
            <div>{new Date(appointmentInfo.date).getDate()} {months[new Date(appointmentInfo.date).getMonth()]} {new Date(appointmentInfo.date).getFullYear()}</div>
            {/if}
            <div class="flex items-center text-gray-500 text-sm mt-1"><Clock /> {new Date(appointmentInfo.date).getHours()}:{new Date(appointmentInfo.date).getMinutes()}</div>
        </div>
    </th>
    <td class="px-6 py-3">
        <div class="flex items-center">
            <img src="https://placehold.co/400" alt="" class="h-10 rounded-full mr-2">
            <div>
                <div class="text-gray-900">{appointmentInfo.user.firstName} {appointmentInfo.user.lastName}</div>
                <div class="flex items-center text-gray-500 text-sm mt-1">@{appointmentInfo.user.username}</div>
            </div>
        </div>
    </td>
    <td class="px-6 py-3">
        <Modal shown={showDetail}>
            <AppointmentListItemDetail on:close={()=>{showDetail=false}}/>
        </Modal>
        <button on:click={()=>{showDetail=true}} class="whitespace-nowrap flex items-center text-sm text-[#004E80] border-2 border-[#004E80] rounded-md px-1 duration-100 hover:bg-[#004E80] hover:text-white overflow-hidden">
            <Eye/>View Detail
        </button>
    </td>
    <td class="px-6 py-3 ml-12">
        {#if appointmentInfo.status == "accepted"}
        <div class="w-32 flex justify-end">
            <Button class="text-[#004E80] text-sm text-end p-0 w-fit">Accepted</Button>
            <Dropdown>
              <DropdownItem on:click={()=>{ updateStatus("rejected")}}>Reject</DropdownItem>
            </Dropdown>
        </div>
        {:else if appointmentInfo.status == "rejected"}
        <div class="w-32 flex justify-end">
            <Button class="text-[#DE5757] text-sm text-end p-0 w-fit">Rejected</Button>
            <Dropdown>
              <DropdownItem on:click={()=>{ updateStatus("accepted")}}>Accept</DropdownItem>
            </Dropdown>
        </div>
        {:else if appointmentInfo.status == "pending"}
            <div class=" flex items-center w-32 justify-end">
                <button class="text-[#DE5757] mx-1" on:click={()=>{ updateStatus("rejected")}}><CancelRounded /></button>
                <button class="text-[#004E80] mx-1" on:click={()=>{ updateStatus("accepted")}}><Check /></button>
            </div>
        {/if}
    </td>
</tr>
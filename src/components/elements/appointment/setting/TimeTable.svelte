<script>
    import { Button, Modal, Toggle, Tabs, TabItem } from "flowbite-svelte";
    import {
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
    } from "flowbite-svelte";
    import AddHours from "$components/elements/modals/extension/appointment/setting/AddHours.svelte";
    import TimeTableItem from "./TimeTableItem.svelte";

    let defaultModal = false;
</script>

<Table striped={true}>
    <TableHead>
        <TableHeadCell class="">Day of week</TableHeadCell>
        <TableHeadCell class="">Status</TableHeadCell>
        <TableHeadCell class="">start Time</TableHeadCell>
        <TableHeadCell class="pl-7">End Time</TableHeadCell>
        <TableHeadCell class="pl-7">Action</TableHeadCell>
        <TableHeadCell class="pl-12">Add Time</TableHeadCell>
    </TableHead>
    <TableBody class="">
        <TimeTableItem day=0 />
        <TimeTableItem day=1 />
        <TimeTableItem day=2 />
        <TimeTableItem day=3 />
        <TimeTableItem day=4 />
        <TimeTableItem day=5 />
        <TimeTableItem day=6 />
    </TableBody>
</Table>

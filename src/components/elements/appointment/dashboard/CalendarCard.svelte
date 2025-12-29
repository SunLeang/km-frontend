<script>
  import Close from "$components/icons/Close/Close.svelte";
  import { createEventDispatcher } from "svelte";
  import FullCalendar, { Draggable } from "svelte-fullcalendar";
  import daygridPlugin from "@fullcalendar/daygrid";
  import timegridPlugin from "@fullcalendar/timegrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import { onMount } from "svelte";
  import { getAllAppointmentBooking } from "$providers/actions/kchannel/appointment/dashboard";

  let bookingsState = {
    bookings: null,
    loading: false,
    errMsg: "",
    loaded: false,
  };

  const onLoadBookings = async () => {
    try {
      bookingsState.errMsg = "";
      bookingsState.loading = true;
      bookingsState.loaded = false;
      const res = await getAllAppointmentBooking.load();
      bookingsState.bookings = res.data;
      options = {
        dateClick: handleDateClick,
        eventClick: handleEventClick,
        droppable: true,
        editable: true,
        events: [],
        initialView: "dayGridMonth",
        plugins: [daygridPlugin, timegridPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        allDaySlot: false,
        // businessHours:[
        // 	{
        // 		daysOfWeek: [1, 2, 3, 4, 5, 6, 0], // Monday - Friday
        // 		startTime: '8:00', // 8 am
        // 		endTime: '11:00'     // 8 pm
        // 	},
        // 	{
        // 		daysOfWeek: [1, 2, 3, 4, 5, 6, 0], // Monday - Friday
        // 		startTime: '13:00', // 8 am
        // 		endTime: '19:00'     // 8 pm
        // 	},
        // {
        // 	daysOfWeek: [6, 0], // Monday - Friday
        // 	startTime: '010:00', // 8 am
        // 	endTime: '18:00'     // 8 pm
        // },
        // ],
        // views: {
        // 	timeGridWeek: {
        // 		// Set the time range for the week view
        // 		slotMinTime: '08:00:00', // 7 am
        // 		slotMaxTime: '19:00:00'  // 7 pm
        // 	},
        // 	timeGridDay: {
        // 		// Set the time range for the week view
        // 		slotMinTime: '08:00:00', // 7 am
        // 		slotMaxTime: '19:00:00'  // 7 pm
        // 	},
        // },
        height: "100%",
        weekends: true,
      };

      bookingsState.bookings.getAllAppointmentBooking.forEach((appointment) => {
        options.events.push({
          id: appointment.id,
          title: appointment.user.username,
          start: new Date(appointment.date),
        });
        console.log(options.events);
      });
      bookingsState.loaded = true;
      bookingsState.loading = false;
    } catch (err) {
      bookingsState.errMsg = err.message;
    } finally {
      bookingsState.loading = false;
      console.log(bookingsState);
    }
  };

  let options;

  let calendarComponentRef;

  function toggleWeekends() {
    options = { ...options, weekends: !options.weekends };
  }

  function gotoPast() {
    let calendarApi = calendarComponentRef.getAPI();
    calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
  }

  function handleDateClick(event) {
    console.log(event);
    if (confirm("Would you like to add an event to " + event.dateStr + " ?")) {
      const { events } = options;
      const calendarEvents = [
        ...events,
        {
          title: "New Event",
          start: event.date,
          allDay: event.allDay,
        },
      ];
      options = {
        ...options,
        events: calendarEvents,
      };
    }
  }

  // Function to handle event click
  function handleEventClick(info) {
    const eventID = info.event.id;
    alert("Event ID: " + eventID);
    const indexToDelete = options.events.findIndex(
      (event) => event.id === eventID
    );
    if (indexToDelete !== -1) {
      // Use splice to remove the object from the array
      options.events.splice(indexToDelete, 1);
      console.log(options.events);
    } else {
      console.log(`Event with id ${id} not found.`);
    }
  }
  const dispatch = createEventDispatcher();

  onMount(() => {
    onLoadBookings();
  });
</script>

<div class="flex items-center justify-center w-full h-full">
  <div class=" w-[70%] bg-white rounded-lg shadow p-[1vw] h-[92vh]">
    <div class="flex justify-end mb-4">
      <button on:click={() => dispatch("close")}>
        <Close />
      </button>
    </div>
    <div class="demo-app">
      <div class="demo-app-calendar">
        {#if options}
          <FullCalendar bind:this={calendarComponentRef} {options} />
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .demo-app {
    width: 100%;
    height: 90%;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family:
      Arial,
      Helvetica Neue,
      Helvetica,
      sans-serif;
    font-size: 14px;
  }

  .demo-app-calendar {
    width: 100%;
    flex-grow: 1;
    margin: 0 auto;
    max-width: 900px;
  }
</style>

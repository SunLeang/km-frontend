export function convertDateToTimestamp(date, time) {
	const [year, month, day] = date.split('-');
	const [hours, minutes] = time.split(':');
	const selectedDate = new Date(year, month - 1, day, hours, minutes);
	const timestamp = selectedDate.getTime() / 1000; //convert to seconds
	return timestamp;
}

export function addMinutesToDatetime(date, time, additionalMinutes) {
	const startTimeObject = new Date(`${date}T${time}`);
	startTimeObject.setMinutes(startTimeObject.getMinutes() + additionalMinutes);
	const timestamp = startTimeObject.getTime() / 1000;
	return timestamp;
}

export function formatDate(inputDateStr) {
	const date = new Date(inputDateStr);
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	const month = months[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();
	return `${month} ${day}, ${year}`;
}

export const formatTime = (timestamp) => {
	let date = new Date(timestamp * 1000); // Convert to milliseconds if timestamp is in seconds

	// Helper function to add leading zeros to single-digit numbers
	function addLeadingZero(num) {
		return num < 10 ? `0${num}` : num;
	}

	let formattedDate = `${addLeadingZero(date.getHours())}:${addLeadingZero(
		date.getMinutes()
	)} ${date.toLocaleString('en', {
		month: 'short',
	})} ${date.getDate()}, ${date.getFullYear()}`;

	return formattedDate;
};

export const formatHours = (timestamp) => {
	let date = new Date(timestamp * 1000); // Convert to milliseconds if timestamp is in seconds

	// Helper function to add leading zeros to single-digit numbers
	function addLeadingZero(num) {
		return num < 10 ? `0${num}` : num;
	}

	let formattedDate = `${addLeadingZero(date.getHours())}:${addLeadingZero(
		date.getMinutes()
	)}`;

	return formattedDate;
};

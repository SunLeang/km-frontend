export function convertToTime(minutes) {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    if (mins < 10) {
        mins = `0${mins}`;
    }
    return `${hours}: ${mins}`;
}
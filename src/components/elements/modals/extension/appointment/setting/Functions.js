export function increaseTimeByOne(time){
    if(time == 23){
        return 0
    }
    return time+1
}

export function decreaseTimeByOne(time){
    if(time == 0){
        return 23
    }
    return time-1
}

export function increaseMinuteByOne(minute){
    if(minute == 59){
        return 0
    }
    return minute+1
}

export function decreaseMinuteByOne(minute){
    if(minute == 0){
        return 59
    }
    return minute-1
}

export function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

export function convertTimeAndMinuteToMinute(time, minute){
    return time*60 + minute
}
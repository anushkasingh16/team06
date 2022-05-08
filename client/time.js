export function day() {
    const date = new Date();
    const datetime = date.getDay();
    if (datetime == 0) {
        return "Sunday";
    }
    if (datetime == 1) {
        return "Monday";
    }
    if (datetime == 2) {
        return "Tuesday";
    }
    if (datetime == 3) {
        return "Wednesday";
    }
    if (datetime == 4) {
        return "Thursday";
    }
    if (datetime == 5) {
        return "Friday";
    }
    if (datetime == 6) {
        return "Saturday";
    }
}

export function time() {
    const currentdate = new Date();
    const time = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    return time;
}

export function timestamp() {
    return Date.now();
}

export function unixToDate(unix){
    const date = new Date(unix);
    const day = date.getDay();
    let day2 = "";
    if (day == 0) {
        day2 =  "Sunday";
    }
    if (day == 1) {
        day2 =  "Monday";
    }
    if (day == 2) {
        day2 =  "Tuesday";
    }
    if (day == 3) {
        day2 =  "Wednesday";
    }
    if (day == 4) {
        day2 =  "Thursday";
    }
    if (day == 5) {
        day2 =  "Friday";
    }
    if (day == 6) {
        day2 =  "Saturday";
    }

    return (day2 + " @ " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}
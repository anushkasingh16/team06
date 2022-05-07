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
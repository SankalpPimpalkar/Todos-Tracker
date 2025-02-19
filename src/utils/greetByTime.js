function greetByTime(dateString) {
    const date = new Date(dateString);

    const hour = date.getHours();

    if (hour >= 5 && hour < 12) {
        return "Good Morning";
    } else if (hour >= 12 && hour < 18) {
        return "Good Afternoon";
    } else if (hour >= 18) {
        return "Good Evening";
    }
}

export default greetByTime;
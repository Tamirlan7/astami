export default function convertTimeStringToMilliseconds(timeString: string | string[]): number {
    let time: string;

    if (Array.isArray(timeString)) {
        // Join the array into a single string if timeString is an array
        time = timeString.join(" ");
    } else {
        time = timeString;
    }

    // Extract hours and minutes using a regular expression
    const hoursMatch = time.match(/(\d{2}) ч\./);
    const minutesMatch = time.match(/(\d{2}) м\./);

    if (!hoursMatch || !minutesMatch) {
        throw new Error("Invalid time format");
    }

    const hours = Number(hoursMatch[1]);
    const minutes = Number(minutesMatch[1]);

    // Convert hours and minutes to milliseconds
    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
}
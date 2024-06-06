export default function convertMillisecondsToTimeString(milliseconds: number): string {
    if (milliseconds < 0) {
        return ''
    }

    const totalMinutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const hoursString = hours.toString().padStart(2, '0');
    const minutesString = minutes.toString().padStart(2, '0');

    return `${hoursString} ч. - ${minutesString} м.`;
}

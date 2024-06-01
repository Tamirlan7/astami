import {Weekdays} from "@/types/model.ts";

class WeekdayConverter {

    private static readonly weekdaysRu: {
        [key: string]: string
    } = {
        'MONDAY': 'Понедельник',
        'TUESDAY': 'Вторник',
        'WEDNESDAY': 'Среда',
        'THURSDAY': 'Четверг',
        'FRIDAY': 'Пятница',
        'SATURDAY': 'Суббота',
        'SUNDAY': 'Воскресенье',
    };

    static convertToRu(day: string | Weekdays) {
        return this.weekdaysRu[day.toUpperCase()];
    }

}

export default WeekdayConverter

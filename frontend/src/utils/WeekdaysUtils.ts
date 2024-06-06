import {Weekdays} from "@/types/model.ts";
import type {LiteralUnion} from "antd/es/_util/type";
import type {PresetColorType, PresetStatusColorType} from "antd/es/_util/colors";

class WeekdaysUtils {

    private static readonly weekdaysRu: {
        [key: string]: string
    } = {
        [Weekdays.MONDAY]: 'Понедельник',
        [Weekdays.TUESDAY]: 'Вторник',
        [Weekdays.WEDNESDAY]: 'Среда',
        [Weekdays.THURSDAY]: 'Четверг',
        [Weekdays.FRIDAY]: 'Пятница',
        [Weekdays.SATURDAY]: 'Суббота',
        [Weekdays.SUNDAY]: 'Воскресенье',
    };

    private static readonly weekdaysColors: {
        [key: string]: LiteralUnion<PresetColorType | PresetStatusColorType>
    } = {
        [Weekdays.MONDAY]: 'gold',
        [Weekdays.TUESDAY]: 'red',
        [Weekdays.WEDNESDAY]: 'geekblue',
        [Weekdays.THURSDAY]: 'cyan',
        [Weekdays.FRIDAY]: 'lime',
        [Weekdays.SATURDAY]: 'volcano',
        [Weekdays.SUNDAY]: 'purple',
    }

    static convertToRu(day: string | Weekdays) {
        return this.weekdaysRu[day.toUpperCase()];
    }

    static getWeekdayColor(day: string | Weekdays) {
        return this.weekdaysColors[day.toUpperCase()];
    }
}

export default WeekdaysUtils

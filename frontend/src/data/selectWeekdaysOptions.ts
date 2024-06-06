import {Weekdays} from "@/types/model.ts";

interface IOption {
    label: string
    value: string
}

export const selectWeekdaysOptions: IOption[] = [
    {
        label: 'Понедельник',
        value: Weekdays.MONDAY,
    },
    {
        label: 'Вторник',
        value: Weekdays.TUESDAY,
    },
    {
        label: 'Среда',
        value: Weekdays.WEDNESDAY,
    },
    {
        label: 'Четверг',
        value: Weekdays.THURSDAY,
    },
    {
        label: 'Пятница',
        value: Weekdays.FRIDAY,
    },
    {
        label: 'Суббота',
        value: Weekdays.SATURDAY,
    },
    {
        label: 'Воскресенье',
        value: Weekdays.SUNDAY,
    },
]
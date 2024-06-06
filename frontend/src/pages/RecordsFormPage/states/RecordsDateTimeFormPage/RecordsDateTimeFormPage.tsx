import React, {FC, useEffect, useState} from 'react';
import c from './RecordsDateTimeFormPage.module.scss'
import {Card, DatePicker, List, Space} from "antd";
import dayjs, {Dayjs} from "dayjs";
import {getRecordFreeTimes} from "@thunks/recordThunk.ts";
import {useAppDispatch} from "@hooks/reduxHooks.ts";
import extractDateStrFromDate from "@utils/extractDateStrFromDate.ts";

interface RecordsDateTimeFormPageProps {
    onDateChange?: (datetime: Date) => void
    serviceId: number
}


type SelectedDate = 'today' | 'tomorrow' | 'other'

const RecordsDateTimeFormPage: FC<RecordsDateTimeFormPageProps> = ({onDateChange, serviceId}) => {
    const dispatch = useAppDispatch()
    const [selectedDate, setSelectedDate] = useState<SelectedDate>('today')
    const [date, setDate] = useState<Date>(new Date())
    const [freeTimes, setFreeTimes] = useState<string[]>([]);

    const handleOnDateChange = (time: string) => {
        if (onDateChange) {
            const [hours, minutes] = time.split(':').map(Number);
            console.log([hours, minutes])
            const datetime = new Date(date);
            datetime.setHours(hours)
            datetime.setMinutes(minutes)
            datetime.setSeconds(0);
            datetime.setMilliseconds(0);
            onDateChange(datetime)
        }
    }

    useEffect(() => {
        dispatch(getRecordFreeTimes({
            serviceId,
            date: date,
        })).then((res) => {
            if (Array.isArray(res.payload)) {
                setFreeTimes(res.payload)
            }
        })
    }, [date, dispatch, serviceId]);

    const onTomorrowClick = () => {
        if (selectedDate === 'tomorrow') {
            return;
        }

        setSelectedDate('tomorrow')
        const currentDate = new Date()
        currentDate.setDate(currentDate.getDate() + 1)
        setDate(currentDate)
    }

    const onTodayClick = () => {
        if (selectedDate === 'today') {
            return;
        }

        setSelectedDate('today')
        setDate(new Date())
    }

    const onOtherDateClick = (_: Dayjs, dateString: string | string[]) => {
        setSelectedDate('other')
        let date: string;

        if (Array.isArray(dateString)) {
            date = dateString.join('-')
        } else {
            date = dateString
        }

        setDate(new Date(date));
    }

    return (
        <div className={c.block}>
            <div className={c.date}>

                <div className={c['date-list']}>
                    <div onClick={onTodayClick}
                         className={`${c['date-list-item']} ${selectedDate === 'today' && c['date-list-item-selected']}`}>Сегодня
                    </div>
                    <div onClick={onTomorrowClick}
                         className={`${c['date-list-item']} ${selectedDate === 'tomorrow' && c['date-list-item-selected']}`}>Завтра
                    </div>
                    <DatePicker minDate={dayjs(Date.now())} onChange={onOtherDateClick} variant={'filled'}
                                placeholder={'Выбрать дату'}/>
                </div>

                <div className={c.main}>
                    <Space className={c['time-list']} direction={'horizontal'}>
                        {freeTimes.map((freeTime) => (
                            <Card onClick={() => handleOnDateChange(freeTime)} hoverable
                                  size={'small'}>{freeTime}</Card>
                        ))}
                    </Space>
                </div>
            </div>
        </div>
    );
};

export default RecordsDateTimeFormPage;
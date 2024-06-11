import React, {FC, useEffect, useState} from 'react';
import c from './RecordsDateTimeFormPage.module.scss'
import {Card, DatePicker, Divider, List, Skeleton, Space} from "antd";
import dayjs, {Dayjs} from "dayjs";
import {getRecordFreeTimes} from "@thunks/recordThunk.ts";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import extractDateStrFromDate from "@utils/extractDateStrFromDate.ts";
import Title from "@ui/Title/Title.tsx";

interface RecordsDateTimeFormPageProps {
    onDateChange?: (datetime: Date) => void
    serviceId: number
}


type SelectedDate = 'today' | 'tomorrow' | 'other'

const RecordsDateTimeFormPage: FC<RecordsDateTimeFormPageProps> = ({onDateChange, serviceId}) => {
    const dispatch = useAppDispatch()
    const {currentCompany} = useAppSelector(state => state.company)
    const [selectedDate, setSelectedDate] = useState<SelectedDate>('today')
    const [date, setDate] = useState<Date>(new Date())
    const [freeTimes, setFreeTimes] = useState<string[]>([]);
    const [loading, setLoading] = useState(false)

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
        async function fetchFreeTimes() {
            try {
                setLoading(true)
                const res = await dispatch(getRecordFreeTimes({
                    serviceId,
                    date: date,
                }))

                if (Array.isArray(res.payload)) {
                    setFreeTimes(res.payload)
                }
            } catch (e) {
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }

        fetchFreeTimes()
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

        if (!date) {
            onTodayClick()
            return;
        }

        setDate(new Date(date));
    }

    return (
        <div className={c.block}>
            <div className={c.container}>
                <div className={c.header}>
                    <Title style={{marginBottom: 5}}>Онлайн Запись</Title>
                    {currentCompany && (
                        <div className={c.title}>
                            <h2>{currentCompany.title}</h2>
                            <h3><strong>({currentCompany.currentBranch.title})</strong></h3>
                        </div>
                    )}
                    <p>Выберите дату и время:</p>
                </div>

                <Divider/>


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
                        <Skeleton active loading={loading} paragraph={{rows: 4}}>
                            <Space className={c['time-list']} direction={'horizontal'}>
                                {freeTimes.map((freeTime) => (
                                    <Card onClick={() => handleOnDateChange(freeTime)} hoverable
                                          size={'small'}>{freeTime}</Card>
                                ))}
                            </Space>
                        </Skeleton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecordsDateTimeFormPage;
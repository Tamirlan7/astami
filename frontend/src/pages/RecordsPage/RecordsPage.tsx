import React, {useEffect, useState} from 'react';
import c from './RecordsPage.module.scss'
import ControlPanelWrapper from "@components/ControlPanelWrapper/ControlPanelWrapper.tsx";
import IntroduceTitle from "@ui/IntroduceTitle/IntroduceTitle.tsx";
import {DatePicker, Table} from "antd";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import recordTableColumns from "@/data/recordTableColumns.ts";
import {getRecordsThunk} from "@thunks/recordThunk.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {HttpMethod} from "@/types/types.ts";
import dayjs from "dayjs";

const RecordsPage = () => {
    const dispatch = useAppDispatch()
    const {records, pagination, lastRequest} = useAppSelector(state => state.record)
    const {currentCompany} = useAppSelector(state => state.company)
    const [currentPage, setCurrentPage] = useState(0)
    const [date, setDate] = useState<Date>(new Date())

    useEffect(() => {
        if (currentCompany) {
            dispatch(getRecordsThunk({
                companyId: currentCompany.id,
                branchId: currentCompany.currentBranch.id,
                page: currentPage,
                date: date,
            }))
        }
    }, [currentCompany, currentPage, date, dispatch, pagination.currentPage]);

    const onPageChanged = (page: number, _: number) => {
        setCurrentPage(page - 1)
    }

    const handleOnDateChange = (_: object, dateString: string | string[]) => {
        let date: string;

        if (Array.isArray(dateString)) {
            date = dateString.join('-')
        } else {
            date = dateString
        }

        if (!date) {
            setDate(new Date())
            return;
        }

        setDate(new Date(date));
    }

    return (
        <ControlPanelWrapper>
            <div className={c.main}>
                <div className={c.header}>

                    <div>
                        <IntroduceTitle
                            title={'Записи'}
                            description={'Список'}
                            specialText={'записей'}
                        />
                    </div>

                    <div className={c.filter}>
                        <DatePicker minDate={dayjs(Date.now())} onChange={handleOnDateChange} variant={'filled'}
                                    placeholder={'Выбрать дату'}/>
                    </div>
                </div>

                <div className={c.content}>
                    <Table className={c.table}
                           loading={(lastRequest.isPending && lastRequest.path === BackendEndpoints.GET_RECORDS && lastRequest.method === HttpMethod.GET)}
                           rowClassName={c.row}
                           pagination={{
                               total: pagination.totalElements ?? 0,
                               pageSize: pagination.size ?? 10,
                               showSizeChanger: false,
                               onChange: onPageChanged,
                               size: 'default',
                           }}
                           size={'small'}
                           dataSource={records}
                           rowKey={record => record.id}
                           columns={recordTableColumns}
                    />
                </div>
            </div>
        </ControlPanelWrapper>
    );
};

export default RecordsPage;
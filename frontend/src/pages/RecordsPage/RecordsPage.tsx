import React, {useEffect, useState} from 'react';
import c from './RecordsPage.module.scss'
import ControlPanelWrapper from "@components/ControlPanelWrapper/ControlPanelWrapper.tsx";
import IntroduceTitle from "@ui/IntroduceTitle/IntroduceTitle.tsx";
import {Table} from "antd";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import recordTableColumns from "@/data/recordTableColumns.ts";
import {getRecordsThunk} from "@thunks/recordThunk.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {HttpMethod} from "@/types/types.ts";

const RecordsPage = () => {
    const dispatch = useAppDispatch()
    const {records, pagination, lastRequest} = useAppSelector(state => state.record)
    const {currentCompany} = useAppSelector(state => state.company)
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        if (currentCompany) {
            if (pagination.currentPage !== currentPage) {
                dispatch(getRecordsThunk({
                    companyId: currentCompany.id,
                    branchId: currentCompany.currentBranch.id,
                    page: currentPage,
                }))
            }
        }
    }, [currentCompany, currentPage, dispatch, pagination.currentPage]);

    const onPageChanged = (page: number, _: number) => {
        setCurrentPage(page - 1)
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
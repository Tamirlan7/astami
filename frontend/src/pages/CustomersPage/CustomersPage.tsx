import React, {useEffect, useState} from 'react';
import ControlPanelWrapper from "@components/ControlPanelWrapper/ControlPanelWrapper.tsx";
import c from './CustomersPage.module.scss'
import IntroduceTitle from "@ui/IntroduceTitle/IntroduceTitle.tsx";
import {Table} from "antd";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import {getCustomersThunk} from "@thunks/customerThunk.ts";
import customerTableColumns from "@/data/customerTableColumns.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {HttpMethod} from "@/types/types.ts";

const CustomersPage = () => {
    const dispatch = useAppDispatch()
    const {customers, pagination, lastRequest} = useAppSelector(state => state.customer)
    const {currentCompany} = useAppSelector(state => state.company)
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        if (currentCompany) {
            if (pagination.currentPage !== currentPage) {
                dispatch(getCustomersThunk({
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
                           loading={(lastRequest.isPending && lastRequest.path === BackendEndpoints.GET_CUSTOMERS && lastRequest.method === HttpMethod.GET)}
                           rowClassName={c.row}
                           pagination={{
                               total: pagination.totalElements ?? 0,
                               pageSize: pagination.size ?? 10,
                               showSizeChanger: false,
                               onChange: onPageChanged,
                               size: 'default',
                           }}
                           size={'small'}
                           dataSource={customers}
                           rowKey={record => record.id}
                           columns={customerTableColumns}
                    />
                </div>
            </div>
        </ControlPanelWrapper>
    );
};

export default CustomersPage;
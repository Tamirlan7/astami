import React, {useEffect, useState} from 'react';
import c from './ServicesPage.module.scss'
import ControlPanelWrapper from "@components/ControlPanelWrapper/ControlPanelWrapper.tsx";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import {getServicesThunk} from "@thunks/serviceThunk.ts";
import {Table} from "antd";
import {servicesTableColumns} from "@/data/servicesTableColumns.tsx";
import ServicesFilter from "@components/ServicesFilter/ServicesFilter.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import ServicesFormModal from "@components/ServicesFormModal/ServicesFormModal.tsx";
import IntroduceTitle from "@ui/IntroduceTitle/IntroduceTitle.tsx";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {HttpMethod} from "@/types/types.ts";

const ServicesPage = () => {
    const dispatch = useAppDispatch()
    const {services, pagination, lastRequest} = useAppSelector(state => state.service)
    const {currentCompany} = useAppSelector(state => state.company)
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        if (currentCompany && currentCompany.currentBranch) {
            dispatch(getServicesThunk({
                companyId: currentCompany.id,
                branchId: currentCompany.currentBranch.id,
                page: currentPage,
                title: title,
            }))
        }

    }, [currentCompany, currentPage, dispatch, pagination.currentPage, title]);

    const handleOnAddServiceClick = () => {
        setIsFormVisible(true)
    }

    const handleOnTitleChange = (value: string) => {
        setTitle(value)
    }

    const onPageChanged = (page: number, _: number) => {
        setCurrentPage(page - 1)
    }

    return (
        <ControlPanelWrapper>
            <div className={c.main}>
                <div className={c.header}>
                    <div>
                        <IntroduceTitle
                            title={'Услуги'}
                            description={'Список'}
                            specialText={'услуг'}
                        />
                    </div>

                    <div className={c.filter}>
                        <ServicesFilter onTitleChange={handleOnTitleChange}
                                        onAddServiceClick={handleOnAddServiceClick}/>
                    </div>
                </div>

                <div className={c.content}>
                    <Table
                        loading={(lastRequest.isPending && lastRequest.path === BackendEndpoints.GET_EMPLOYEES && lastRequest.method === HttpMethod.GET)}
                        rootClassName={c.table}
                        columns={servicesTableColumns}
                        dataSource={services}
                        rowKey='id'
                        size={'small'}

                        pagination={{
                            total: pagination.totalElements ?? 0,
                            pageSize: pagination.size ?? 10,
                            showSizeChanger: false,
                            onChange: onPageChanged,
                            size: 'default',
                        }}
                    />
                </div>
            </div>

            <ServicesFormModal
                visible={isFormVisible}
                setVisible={setIsFormVisible}
            />
        </ControlPanelWrapper>
    );
};

export default ServicesPage;
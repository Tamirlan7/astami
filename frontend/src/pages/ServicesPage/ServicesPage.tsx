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

const ServicesPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const {services, pagination} = useAppSelector(state => state.service)
    const {currentCompany} = useAppSelector(state => state.company)
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false)

    useEffect(() => {
        if (currentCompany && currentCompany.currentBranch) {
            if (pagination.currentPage !== currentPage) {
                dispatch(getServicesThunk({
                    companyId: currentCompany.id,
                    branchId: currentCompany.currentBranch.id,
                    page: currentPage,
                    title: '',
                }))
            }
        }

    }, [currentCompany, currentPage, dispatch, pagination.currentPage]);

    const handleOnAddServiceClick = () => {
        setIsFormVisible(true)
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
                        <ServicesFilter onAddServiceClick={handleOnAddServiceClick}/>
                    </div>
                </div>

                <div className={c.content}>
                    <Table
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
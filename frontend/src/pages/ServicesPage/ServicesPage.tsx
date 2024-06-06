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

    return (
        <ControlPanelWrapper>
            <div className={c.main}>
                <div className={c.filter}>
                    <ServicesFilter onAddServiceClick={handleOnAddServiceClick}/>
                </div>

                <div className={c.content}>
                    <Table
                        columns={servicesTableColumns}
                        dataSource={services}
                        rowKey='id'
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
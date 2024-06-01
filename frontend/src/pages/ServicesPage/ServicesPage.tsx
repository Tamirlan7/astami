import React, {useEffect, useState} from 'react';
import c from './ServicesPage.module.scss'
import ControlPanelWrapper from "@components/ControlPanelWrapper/ControlPanelWrapper.tsx";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import {getServicesThunk} from "@thunks/serviceThunk.ts";

const ServicesPage = () => {
    const dispatch = useAppDispatch()
    const {services, pagination} = useAppSelector(state => state.service)
    const {currentCompany} = useAppSelector(state => state.company)
    const [currentPage, setCurrentPage] = useState<number>(0);

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

    return (
        <ControlPanelWrapper>
            <div className={c.main}>
                Services
            </div>
        </ControlPanelWrapper>
    );
};

export default ServicesPage;
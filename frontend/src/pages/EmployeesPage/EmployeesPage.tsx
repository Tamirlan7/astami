import React, {useEffect, useState} from 'react';
import c from './EmployeesPage.module.scss'
import ControlPanelWrapper from "@components/ControlPanelWrapper/ControlPanelWrapper.tsx";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import {Table} from "antd";
import employeeTableColumns from "@/data/employeeTableColumns.tsx";
import {getEmployeesThunk} from "@thunks/employeeThunk.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {HttpMethod} from "@/types/types.ts";
import EmployeesFilter from "@components/EmployeesFilter/EmployeesFilter.tsx";
import Modal from "@ui/Modal/Modal.tsx";
import EmployeeForm from "@components/EmployeeForm/EmployeeForm.tsx";

const EmployeesPage = () => {
    const dispatch = useAppDispatch()
    const {employees, pagination} = useAppSelector(state => state.employee)
    const {currentCompany, lastRequest} = useAppSelector(state => state.company)
    const [currentPage, setCurrentPage] = useState(0);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        if ((currentCompany &&
            lastRequest.path === BackendEndpoints.GET_EMPLOYEES &&
            lastRequest.method === HttpMethod.GET &&
            pagination.currentPage !== currentPage &&
            !lastRequest.isPending) || currentCompany && lastRequest.path !== BackendEndpoints.GET_EMPLOYEES
        ) {
            dispatch(getEmployeesThunk({
                companyId: currentCompany.id,
                branchId: currentCompany.currentBranch.id,
                page: currentPage
            }))
        }
    }, [currentCompany, currentPage, dispatch, lastRequest.isPending, lastRequest.method, lastRequest.path, pagination.currentPage]);

    const onPageChanged = (page: number, pageSize: number) => {
        setCurrentPage(page - 1)
    }

    const handleOnAddEmployeeClick = () => {
        showFormModal();
    }

    const showFormModal = () => {
        setIsFormVisible(true)
    }

    const hideFormModal = () => {
        setIsFormVisible(false)
    }

    return (
        <ControlPanelWrapper>
            <div className={c.main}>
                <div className={c.filter}>
                    <EmployeesFilter onAddEmployeeClick={handleOnAddEmployeeClick}/>
                </div>

                <div className={c.content}>
                    <Table className={c.table}
                           rowClassName={c.row}
                           pagination={{
                               total: pagination.totalElements ?? 0,
                               pageSize: pagination.size ?? 10,
                               showSizeChanger: false,
                               onChange: onPageChanged,
                           }}
                           size={'small'}
                           dataSource={employees}
                           columns={employeeTableColumns}
                    />
                </div>

                {/*modals*/}
                <Modal
                    isActive={isFormVisible}
                    setIsActive={setIsFormVisible}
                >
                    <EmployeeForm isVisible={isFormVisible} closeModal={hideFormModal} />
                </Modal>
            </div>
        </ControlPanelWrapper>
    );
};

export default EmployeesPage;
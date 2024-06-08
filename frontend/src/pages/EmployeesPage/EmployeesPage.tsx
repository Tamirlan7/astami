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
import {createSearchParams, useLocation, useNavigate} from "react-router-dom";
import {RoutePaths} from "@config/RoutePaths.ts";
import IntroduceTitle from "@ui/IntroduceTitle/IntroduceTitle.tsx";
import {IEmployee} from "@/types/model.ts";
import EmployeeDetailsModal from "@components/EmployeeDetailsModal/EmployeeDetailsModal.tsx";

const EmployeesPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const location = useLocation();
    const [currentEmployee, setCurrentEmployee] = useState<IEmployee | null>(null)
    const {employees, pagination} = useAppSelector(state => state.employee)
    const {currentCompany, lastRequest} = useAppSelector(state => state.company)
    const [currentPage, setCurrentPage] = useState(0);
    const [isEmployeeModalVisible, setIsEmployeeModalVisible] = useState<boolean>(false)

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

    const onPageChanged = (page: number, _: number) => {
        setCurrentPage(page - 1)
    }

    const handleOnAddEmployeeClick = () => {
        navigateToEmployeeFormPage();
    }

    const navigateToEmployeeFormPage = () => {

        if (currentCompany) {
            navigate({
                pathname: RoutePaths.EMPLOYEES_FORM
                    .replace(':companyId', currentCompany.id.toString()),
                search: createSearchParams({
                    redirectBack: location.pathname
                }).toString()
            });
        }
    }

    function handleOnRowClick(data: IEmployee, index: number | undefined) {
        setCurrentEmployee(data)
        setIsEmployeeModalVisible(true)
    }

    return (
        <ControlPanelWrapper>
            <div className={c.main}>
                <div className={c.header}>

                    <div>
                        <IntroduceTitle
                            title={'Сотрудники'}
                            description={'Список'}
                            specialText={'сотрудников'}
                        />
                    </div>

                    <div className={c.filter}>
                        <EmployeesFilter onAddEmployeeClick={handleOnAddEmployeeClick}/>
                    </div>
                </div>

                <div className={c.content}>
                    <Table className={c.table}
                           rowClassName={c.row}
                           pagination={{
                               total: pagination.totalElements ?? 0,
                               pageSize: pagination.size ?? 10,
                               showSizeChanger: false,
                               onChange: onPageChanged,
                               size: 'default',
                           }}
                           size={'small'}
                           dataSource={employees}
                           rowKey={record => record.id}
                           onRow={(data, index) => {
                               return {
                                   onClick: () => handleOnRowClick(data, index)

                               }
                           }}
                           columns={employeeTableColumns}
                    />
                </div>

                <EmployeeDetailsModal
                    employee={currentEmployee}
                    visible={isEmployeeModalVisible}
                    setVisible={setIsEmployeeModalVisible}
                />
            </div>

        </ControlPanelWrapper>
    );
};

export default EmployeesPage;
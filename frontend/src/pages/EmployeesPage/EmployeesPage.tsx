import React, {useEffect} from 'react';
import c from './EmployeesPage.module.scss'
import ControlPanelWrapper from "@components/ControlPanelWrapper/ControlPanelWrapper.tsx";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import {getEmployeesThunk} from "@thunks/employeeThunk.ts";
import {useParams} from "react-router-dom";
import {Table} from "antd";
import employeeTableColumns from "@/data/employeeTableColumns.tsx";

const EmployeesPage = () => {
    const dispatch = useAppDispatch()
    const {employees} = useAppSelector(state => state.employee)
    const {currentCompany} = useAppSelector(state => state.company)

    useEffect(() => {
        if (currentCompany) {
            dispatch(getEmployeesThunk({
                companyId: currentCompany.id,
                branchId: currentCompany.currentBranch.id
            }))
        }
    }, [currentCompany, dispatch]);

    return (
        <ControlPanelWrapper>
            <div className={c.main}>
                <Table className={c.table}
                       rowClassName={c.row}
                       size={'small'}
                       dataSource={employees}
                       columns={employeeTableColumns}
                />
            </div>
        </ControlPanelWrapper>
    );
};

export default EmployeesPage;
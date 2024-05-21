import React from 'react';
import c from './EmployeesPage.module.scss'
import ControlPanelWrapper from "@components/ControlPanelWrapper/ControlPanelWrapper.tsx";

const EmployeesPage = () => {
    return (
        <ControlPanelWrapper>
            <div className={c.main}>
                Employees
            </div>
        </ControlPanelWrapper>
    );
};

export default EmployeesPage;
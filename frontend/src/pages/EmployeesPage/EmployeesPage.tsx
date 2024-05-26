import React, {useEffect} from 'react';
import c from './EmployeesPage.module.scss'
import ControlPanelWrapper from "@components/ControlPanelWrapper/ControlPanelWrapper.tsx";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";

const EmployeesPage = () => {
    const dispatch = useAppDispatch()
    const {} = useAppSelector(state => state.employee)

    useEffect(() => {
        // fetch for employees list
    }, []);

    return (
        <ControlPanelWrapper>
            <div className={c.main}>
                Employees
            </div>
        </ControlPanelWrapper>
    );
};

export default EmployeesPage;
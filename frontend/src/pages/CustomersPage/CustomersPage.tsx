import React from 'react';
import ControlPanelWrapper from "@components/ControlPanelWrapper/ControlPanelWrapper.tsx";
import c from './CustomersPage.module.scss'

const CustomersPage = () => {
    return (
        <ControlPanelWrapper>
            <div className={c.main}>
                Customers
            </div>
        </ControlPanelWrapper>
    );
};

export default CustomersPage;
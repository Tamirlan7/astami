import React from 'react';
import c from './ServicesPage.module.scss'
import ControlPanelWrapper from "@components/ControlPanelWrapper/ControlPanelWrapper.tsx";

const ServicesPage = () => {
    return (
        <ControlPanelWrapper>
            <div className={c.main}>
                Services
            </div>
        </ControlPanelWrapper>
    );
};

export default ServicesPage;
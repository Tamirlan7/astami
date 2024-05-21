import React from 'react';
import c from './RecordsPage.module.scss'
import ControlPanelWrapper from "@components/ControlPanelWrapper/ControlPanelWrapper.tsx";

const RecordsPage = () => {
    return (
        <ControlPanelWrapper>
            <div className={c.main}>
                Records
            </div>
        </ControlPanelWrapper>
    );
};

export default RecordsPage;
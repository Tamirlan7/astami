import React from 'react';
import c from './ControlPanelHeader.module.scss'
import Container from "@components/Container/Container.tsx";
import Logo from "@ui/Logo/Logo.tsx";
import Logout from "@components/Logout/Logout.tsx";

const ControlPanelHeader = () => {
    return (
        <div className={c.block}>
            <Container>
                <div className={c.inner}>
                    <Logo />

                    <Logout />
                </div>
            </Container>
        </div>
    );
};

export default ControlPanelHeader;
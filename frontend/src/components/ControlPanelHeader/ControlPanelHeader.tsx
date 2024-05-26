import React from 'react';
import c from './ControlPanelHeader.module.scss'
import Container from "@components/Container/Container.tsx";
import Logo from "@ui/Logo/Logo.tsx";
import Logout from "@components/Logout/Logout.tsx";
import BranchesListSelect from "@components/BranchesSelect/BranchesSelect.tsx";
import {useAppSelector} from "@hooks/reduxHooks.ts";

const ControlPanelHeader = () => {

    const {currentCompany} = useAppSelector(state => state.company)

    return (
        <div className={c.block}>
            <Container>
                <div className={c.inner}>
                    <Logo/>

                    {(currentCompany && currentCompany.currentBranch) && (
                        <BranchesListSelect
                            defaultSelectedBranch={currentCompany.currentBranch}
                            branches={currentCompany.branches}/>
                    )}

                    <Logout/>
                </div>
            </Container>
        </div>
    );
};

export default ControlPanelHeader;
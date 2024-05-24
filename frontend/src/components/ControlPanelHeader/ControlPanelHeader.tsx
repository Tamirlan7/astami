import React from 'react';
import c from './ControlPanelHeader.module.scss'
import Container from "@components/Container/Container.tsx";
import Logo from "@ui/Logo/Logo.tsx";
import Logout from "@components/Logout/Logout.tsx";
import BranchesListSelect from "@components/BranchesSelect/BranchesSelect.tsx";

const ControlPanelHeader = () => {
    return (
        <div className={c.block}>
            <Container>
                <div className={c.inner}>
                    <Logo/>

                    <BranchesListSelect
                        defaultSelectedBranch={
                            {
                                id: 1,
                                companyId: 1,
                                city: 'Astana',
                                country: 'Kazakhstan',
                                title: 'test',
                                employees: [],
                                services: [],
                            }
                        }
                        branches={[
                            {
                                id: 1,
                                companyId: 1,
                                city: 'Astana',
                                country: 'Kazakhstan',
                                title: 'test',
                                employees: [],
                                services: [],
                            },
                            {
                                id: 2,
                                companyId: 1,
                                city: 'Uralsk',
                                country: 'Kazakhstan',
                                title: 'test 2',
                                employees: [],
                                services: [],
                            },
                            {
                                id: 3,
                                companyId: 1,
                                city: 'Almaty',
                                country: 'Kazakhstan',
                                title: 'test 3',
                                employees: [],
                                services: [],
                            },
                            {
                                id: 4,
                                companyId: 1,
                                city: 'Astana',
                                country: 'Kazakhstan',
                                title: 'test 4',
                                employees: [],
                                services: [],
                            },
                            {
                                id: 5,
                                companyId: 1,
                                city: 'Uralsk',
                                country: 'Kazakhstan',
                                title: 'test 5',
                                employees: [],
                                services: [],
                            },
                            {
                                id: 6,
                                companyId: 1,
                                city: 'Almaty',
                                country: 'Kazakhstan',
                                title: 'test 6',
                                employees: [],
                                services: [],
                            },
                            {
                                id: 7,
                                companyId: 1,
                                city: 'Astana',
                                country: 'Kazakhstan',
                                title: 'test 7',
                                employees: [],
                                services: [],
                            },
                            {
                                id: 8,
                                companyId: 1,
                                city: 'Uralsk',
                                country: 'Kazakhstan',
                                title: 'test 8',
                                employees: [],
                                services: [],
                            },
                            {
                                id: 9,
                                companyId: 1,
                                city: 'Almaty',
                                country: 'Kazakhstan',
                                title: 'test 9',
                                employees: [],
                                services: [],
                            },
                        ]}/>

                    <Logout/>
                </div>
            </Container>
        </div>
    );
};

export default ControlPanelHeader;
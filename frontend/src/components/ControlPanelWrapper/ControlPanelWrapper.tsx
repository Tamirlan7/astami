import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import c from './ControlPanelWrapper.module.scss'
import ControlPanelMenu from "@components/ControlPanelMenu/ControlPanelMenu.tsx";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import {getCompanyById} from "@thunks/companyThunk.ts";
import {useParams} from "react-router-dom";

interface ControlPanelWrapperProps extends PropsWithChildren {
}

const ControlPanelWrapper: FC<ControlPanelWrapperProps> = ({children}) => {
    const [isMenuExtended, setIsMenuExtended] = useState(false);
    const dispatch = useAppDispatch()
    const {companyId} = useParams()
    const {currentCompany} = useAppSelector(state => state.company)

    const onBurgerMenuStateChanged = (value: boolean) => {
        setIsMenuExtended(value);
    }

    useEffect(() => {
        if ((currentCompany && currentCompany.id === Number(companyId))) {
            return
        }

        dispatch(getCompanyById(Number(companyId)))
    }, [companyId, dispatch, currentCompany]);

    return (
        <div className={c.block}>
            <aside className={c.aside}>
                <nav className={c.nav}>
                    <ControlPanelMenu
                        burgerMenuState={isMenuExtended}
                        onBurgerMenuStateChanged={onBurgerMenuStateChanged}
                    />
                </nav>
            </aside>

            <div className={`${c.main} ${isMenuExtended && c['menu-extended']}`}>
                {children}
            </div>
        </div>
    );
}

export default ControlPanelWrapper;
import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import c from './ControlPanelWrapper.module.scss'
import ControlPanelMenu from "@components/ControlPanelMenu/ControlPanelMenu.tsx";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import {getCompanyById} from "@thunks/companyThunk.ts";
import {useNavigate, useParams} from "react-router-dom";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {HttpMethod} from "@/types/types.ts";
import {RoutePaths} from "@config/RoutePaths.ts";

interface ControlPanelWrapperProps extends PropsWithChildren {
}

const ControlPanelWrapper: FC<ControlPanelWrapperProps> = ({children}) => {
    const [isMenuExtended, setIsMenuExtended] = useState(false);
    const dispatch = useAppDispatch()
    const {companyId} = useParams()
    const {currentCompany, lastRequest} = useAppSelector(state => state.company)
    const navigate = useNavigate()

    const onBurgerMenuStateChanged = (value: boolean) => {
        setIsMenuExtended(value);
    }

    useEffect(() => {
        if (
            !lastRequest.isPending &&
            lastRequest.error.status === 404 &&
            lastRequest.path === BackendEndpoints.GET_COMPANY_BY_ID &&
            lastRequest.method === HttpMethod.GET
        ) {
            navigate(RoutePaths.COMPANIES)
        }
    }, [lastRequest.error.status, lastRequest.isPending, lastRequest.method, lastRequest.path, navigate]);

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
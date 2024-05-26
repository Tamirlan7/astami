import React, {FC} from 'react';
import c from './ControlPanelMenu.module.scss'
import controlPanelPages from "@/data/controlPanelPages.tsx";
import ControlPanelIcon from "@ui/ControlPanelIcon/ControlPanelIcon.tsx";
import BurgerMenuIcon from '@assets/icons/burger-menu.svg?react'
import ControlPanelMenuItem from "@components/ControlPanelMenuItem/ControlPanelMenuItem.tsx";
import {Link, useNavigate, useParams} from "react-router-dom";

interface ControlPanelMenuProps {
    burgerMenuState?: boolean
    onBurgerMenuStateChanged?: (value: boolean) => void
}

const ControlPanelMenu: FC<ControlPanelMenuProps> = ({onBurgerMenuStateChanged, burgerMenuState}) => {
    const {companyId} = useParams()
    const navigate = useNavigate();

    const handleMenuBtnClick = () => {
        if (onBurgerMenuStateChanged) {
            onBurgerMenuStateChanged(!burgerMenuState)
        }
    }

    const handleOnMenuItemClick = (path: string) => {
        if (companyId) {
            navigate(path.replace(':companyId', companyId))
        }
    }

    return (
        <div className={`${c.block} ${burgerMenuState && c['block-extended']}`}>
            <ul className={`${burgerMenuState && c['menu-extended']} ${c.menu}`}>
                <li className={c['menu-item']}>
                    <ControlPanelMenuItem
                        item={{
                            id: 'burger-button',
                            title: '',
                            icon: <BurgerMenuIcon/>
                        }}
                        onClick={handleMenuBtnClick}
                        burgerMenuState={burgerMenuState as boolean}/>
                </li>
                {controlPanelPages.map(p => (
                    <li key={p.path} className={c['menu-item']}>
                        <div onClick={() => handleOnMenuItemClick(p.path)}>
                            <ControlPanelMenuItem burgerMenuState={burgerMenuState as boolean}
                                                  item={p}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ControlPanelMenu;
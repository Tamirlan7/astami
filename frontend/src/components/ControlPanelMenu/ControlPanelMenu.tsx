import React, {FC} from 'react';
import c from './ControlPanelMenu.module.scss'
import controlPanelPages from "@/data/controlPanelPages.tsx";
import ControlPanelIcon from "@ui/ControlPanelIcon/ControlPanelIcon.tsx";
import BurgerMenuIcon from '@assets/icons/burger-menu.svg?react'
import ControlPanelMenuItem from "@components/ControlPanelMenuItem/ControlPanelMenuItem.tsx";
import {Link} from "react-router-dom";

interface ControlPanelMenuProps {
    burgerMenuState?: boolean
    onBurgerMenuStateChanged?: (value: boolean) => void
}

const ControlPanelMenu: FC<ControlPanelMenuProps> = ({onBurgerMenuStateChanged, burgerMenuState}) => {

    const handleMenuBtnClick = () => {
        if (onBurgerMenuStateChanged) {
            onBurgerMenuStateChanged(!burgerMenuState)
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
                        <Link to={p.path}>
                            <ControlPanelMenuItem burgerMenuState={burgerMenuState as boolean}
                                                  item={p}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ControlPanelMenu;
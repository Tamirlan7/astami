import React, {FC, HTMLAttributes} from 'react';
import c from './ControlPanelMenuItem.module.scss'
import {IControlPanelPage} from "@/types/types.ts";
import ControlPanelIcon from "@ui/ControlPanelIcon/ControlPanelIcon.tsx";
import {CSSTransition} from "react-transition-group";

interface ControlPanelMenuItemProps extends HTMLAttributes<HTMLDivElement> {
    item: Omit<IControlPanelPage, 'path'>
    burgerMenuState: boolean
}

const ControlPanelMenuItem: FC<ControlPanelMenuItemProps> = ({item, burgerMenuState, ...props}) => {
    return (
        <div
            {...props}
            className={`${c.main} ${props.className}`}
        >
            <div className={c.icon}>
                <ControlPanelIcon>
                    {item.icon}
                </ControlPanelIcon>
            </div>

            {item.title && (
                <CSSTransition
                    in={burgerMenuState}
                    timeout={{
                        enter: 150,
                    }}
                    classNames={{
                        enter: c['title-enter'],
                        enterDone: c['title-enter-done'],
                    }}
                    mountOnEnter
                    unmountOnExit
                >
                    <span className={c.title}>{item.title}</span>
                </CSSTransition>
            )}
        </div>
    );
};

export default ControlPanelMenuItem;

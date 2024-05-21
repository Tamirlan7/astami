import React, {FC, PropsWithChildren} from 'react';
import c from './ControlPanelIcon.module.scss'
import Icon from "@ui/Icon/Icon.tsx";

interface ControlPanelIconProps extends PropsWithChildren {}

const ControlPanelIcon: FC<ControlPanelIconProps> = ({children}) => {
    return (
        <Icon className={c.icon} pointerEnabled width={28} height={28}>
            {children}
        </Icon>
    );
};

export default ControlPanelIcon;
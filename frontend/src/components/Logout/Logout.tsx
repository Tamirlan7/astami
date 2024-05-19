import React, {FC, HTMLAttributes} from 'react';
import c from './Logout.module.scss'
import LogoutIcon from '@assets/icons/logout.svg?react'
import Icon from "@ui/Icon/Icon.tsx";
import {TOKENS, UNAUTHENTICATED_ENTRY} from "@config/AppConstants.ts";
import {useAppDispatch} from "@hooks/reduxHooks.ts";
import {clearTokens} from "@slices/userSlice.ts";
import {raisePopupNotification} from "@slices/popupNotificationSlice.ts";
import {useNavigate} from "react-router-dom";

interface LogoutProps extends HTMLAttributes<HTMLDivElement> {
}

const Logout: FC<LogoutProps> = ({...props}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch(clearTokens())
        localStorage.removeItem(TOKENS);
        dispatch(raisePopupNotification({
            type: 'success',
            message: 'Авторизационное сообщение',
            description: 'Вы успешно вышли из аккаунта.'
        }))
        navigate(UNAUTHENTICATED_ENTRY)
    }

    return (
        <Icon pointerEnabled width={24} height={24} onClick={handleClick}
              className={`${c.icon} ${props.className}`} {...props}>
            <LogoutIcon/>
        </Icon>
    );
};

export default Logout;
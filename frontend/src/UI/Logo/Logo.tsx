import React, {FC, HTMLAttributes} from 'react';
import c from './Logo.module.scss'
import ShortLogoIcon from '@assets/icons/logo-short.svg?react'
import LongLogoIcon from '@assets/icons/logo-long.svg?react'
import {useNavigate} from "react-router-dom";
import {RoutePaths} from "@config/RoutePaths.ts";

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
    type?: 'short' | 'long'
}

const Logo: FC<LogoProps> = ({type = 'long', ...props}) => {
    const navigate = useNavigate()

    return (
        <figure
            onClick={() => navigate(RoutePaths.COMPANIES)}
            {...props}
            className={`${type === 'long' ? c['logo-long'] : c['logo-short']} ${c.logo} ${props.className}`}
        >
            {type === 'short' ? (
                <ShortLogoIcon/>
            ) : (
                <LongLogoIcon/>
            )}
        </figure>
    );
};

export default Logo;
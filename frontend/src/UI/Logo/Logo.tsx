import React, {FC, HTMLAttributes} from 'react';
import c from './Logo.module.scss'
import ShortLogoIcon from '@assets/icons/logo-short.svg?react'
import LongLogoIcon from '@assets/icons/logo-long.svg?react'

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
    type?: 'short' | 'long'
}

const Logo: FC<LogoProps> = ({type = 'long', ...props}) => {
    return (
        <figure
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
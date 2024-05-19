import React, {FC, HTMLAttributes, PropsWithChildren} from 'react';
import c from './Icon.module.scss'

interface IconProps extends PropsWithChildren, HTMLAttributes<HTMLElement> {
    width?: number
    height?: number
    pointerEnabled?: boolean
}

const Icon: FC<IconProps> = ({children, pointerEnabled, width = 16, height = 16, ...props}) => {

    return (
        <figure className={`${c.icon} ${props.className}`}
                style={{
                    width,
                    height,
                    cursor: pointerEnabled ? 'pointer' : 'default',
                }}
                {...props}
        >
            {children}
        </figure>
    )
}

export default Icon;
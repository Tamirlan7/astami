import React, {FC, HTMLAttributes, PropsWithChildren} from 'react';
import c from './Title.module.scss'

interface TitleProps extends PropsWithChildren, HTMLAttributes<HTMLHeadingElement> {

}

const Title: FC<TitleProps> = ({children, ...props}) => {
    return (
        <h1 className={`${c.title} ${props.className}`} {...props}>
            {children}
        </h1>
    );
};

export default Title;
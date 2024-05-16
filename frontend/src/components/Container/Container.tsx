import c from './Container.module.scss'
import {FC, HTMLAttributes, PropsWithChildren} from "react";

interface IContainerProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
}

const Container: FC<IContainerProps> = ({children, className, ...props}) => {
    return (
        <div {...props}
             className={`${className} ${c.container}`}
        >
            {children}
        </div>
    );
}

export default Container;

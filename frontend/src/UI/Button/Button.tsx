import {ButtonHTMLAttributes, FC, MouseEvent} from "react";
import c from './Button.module.scss'
import Loader from "@ui/Loader/Loader.tsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean,
    rootClassName?: string,
}

const Button: FC<ButtonProps> = ({children, isLoading, rootClassName, onClick, className, ...props}) => {

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (isLoading) {
            return;
        }

        if (onClick) {
            onClick(e);
        }
    }

    return (
        <div className={`${c.wrapper} ${rootClassName}`}>
            {isLoading && (
                <div className={c['loader-wrapper']}>
                    <Loader loaderClassName={c.loader} color={'white'}/>
                </div>
            )}

            <button
                {...props}
                onClick={handleClick}
                className={`${c.btn} ${className}`}
            >
                {children}
            </button>
        </div>
    )
};

export default Button;
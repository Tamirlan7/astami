import {ButtonHTMLAttributes, FC} from "react";
import c from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({children, className, ...props}) => {
    return (
        <button className={`${c.btn} ${className}`} {...props}>
            {children}
        </button>
    )
};

export default Button;
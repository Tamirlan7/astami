import {FC, InputHTMLAttributes, ReactElement} from "react";
import c from './PlainInput.module.scss'

interface PlainInputProps extends InputHTMLAttributes<HTMLInputElement> {
    isInvalid?: boolean,
    label?: string
    postIcon?: ReactElement
}

const PlainInput: FC<PlainInputProps> = ({className, label, isInvalid, postIcon, ...props}) => {
    return (
        <div className={c.block}>
            <label className={c.label}>{label}</label>
            <div className={c['input-wrapper']}>
                <input
                    {...props}
                    className={`${c.input} ${className}`}
                />
                {postIcon && (
                    <figure className={`${c.icon} ${c['post-icon']}`}>
                        {postIcon}
                    </figure>
                )}
            </div>
            <div className={c['error-block']}>
                <span className={c.error}></span>
            </div>
        </div>
    );
}

export default PlainInput;
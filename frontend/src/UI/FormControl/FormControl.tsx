import React, {FC, HTMLAttributes} from 'react';
import c from './FormControl.module.scss'

interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
    label?: string
    required?: boolean
}

const FormControl: FC<FormControlProps> = ({label, children, required, ...props}) => {
    return (
        <div className={`${c.block} ${props.className}`} {...props}>
            {label && (
                <>
                    <div className={c.label}>
                        {label}

                        {required && <span className={c.required}>обязательное поле</span>}
                    </div>
                    <div className={c.separator}/>
                </>
            )}

            <div className={c.main}>
                {children}
            </div>
        </div>
    );
};

export default FormControl;
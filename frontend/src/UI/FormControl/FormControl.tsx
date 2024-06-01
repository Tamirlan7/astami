import React, {FC, HTMLAttributes} from 'react';
import c from './FormControl.module.scss'

interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
    label?: string
}

const FormControl: FC<FormControlProps> = ({label, children, ...props}) => {
    return (
        <div className={`${c.block} ${props.className}`} {...props}>
            {label && (
                <>
                    <div className={c.label}>
                        {label}
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
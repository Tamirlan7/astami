import React, {FC, useMemo} from 'react';
import c from './PlainTextArea.module.scss'
import TextArea, {TextAreaProps} from "antd/es/input/TextArea";
import {IPropertyValid} from "@/types/types.ts";

interface PlainTextArea extends TextAreaProps {
    validations?: IPropertyValid[]
    label?: string
    required?: boolean
    rootClassName?: string
}

const PlainTextArea: FC<PlainTextArea> = ({validations, label, required, rootClassName, ...props}) => {

    const invalidProperty = useMemo<IPropertyValid | undefined>(() => {
        return validations?.find(v => v.isInvalid)
    }, [validations])

    return (
        <div className={`${c.root} ${rootClassName}`}>
            {label && (
                <label className={c.label}>
                    {label}
                    {required && <span className={c.required}>обязательное поле</span>}
                </label>
            )}
            <div className={c['textarea-wrapper']}>
                <TextArea
                    classNames={{
                        textarea: `${props.disabled && c['input-disabled']} ${invalidProperty && c.invalid} ${props.className}`
                    }}
                    {...props}
                />
            </div>
            <span className={c.error}>{invalidProperty?.message}</span>
        </div>
    );
};

export default PlainTextArea;
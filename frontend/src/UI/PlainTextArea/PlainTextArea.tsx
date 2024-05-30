import React, {FC, useMemo} from 'react';
import c from './PlainTextArea.module.scss'
import TextArea, {TextAreaProps} from "antd/es/input/TextArea";
import {IPropertyValid} from "@/types/types.ts";

interface PlainTextArea extends TextAreaProps {
    validations?: IPropertyValid[]
    label?: string
}

const PlainTextArea: FC<PlainTextArea> = ({validations, label, ...props}) => {

    const invalidProperty = useMemo<IPropertyValid | undefined>(() => {
        return validations?.find(v => v.isInvalid)
    }, [validations])

    return (
        <div className={c.root}>
            {label && (
                <label className={c.label}>{label}</label>
            )}
            <div className={c['textarea-wrapper']}>
                <TextArea
                    className={`${props.disabled && c['input-disabled']} ${invalidProperty && c.invalid} ${props.className}`}
                    {...props}
                />
            </div>
            <span className={c.error}>{invalidProperty?.message}</span>
        </div>
    );
};

export default PlainTextArea;
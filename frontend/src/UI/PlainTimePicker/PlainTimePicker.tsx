import React, {FC} from 'react';
import c from './PlainTimePicker.module.scss'
import {TimePicker, TimePickerProps} from "antd";

interface PlainTimePickerProps extends TimePickerProps {
    label?: string
}

const PlainTimePicker: FC<PlainTimePickerProps> = ({label, ...props}) => {
    return (
        <div className={c.root}>
            {label && (
                <label className={c.label}>{label}</label>
            )}
            <div className={c.main}>
                <TimePicker
                    {...props}
                    className={`${c.picker} ${props.className}`}
                />
            </div>
        </div>
    );
};

export default PlainTimePicker;
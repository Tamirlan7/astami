import React, {ChangeEvent, FC} from 'react';
import c from './PlainNumberInput.module.scss'
import PlainInput, {PlainInputProps} from "@ui/PlainInput/PlainInput.tsx";


interface PlainNumberInputProps extends Omit<PlainInputProps, 'onChange'> {
    value?: number
    onChange?: (value: number) => void
}

const PlainNumberInput: FC<PlainNumberInputProps> = ({value, onChange, ...props}) => {

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!onChange) {
            return
        }

        const newValue = e.target.value;
        if (!isNaN(Number(newValue))) {
            onChange(Number(newValue));
        }
    };

    return (
        <PlainInput
            {...props}
            value={value}
            onChange={handleOnChange}
        />
    );
};

export default PlainNumberInput;
import React, {ChangeEvent, FC, ReactElement, useMemo, useRef, useState} from 'react';
import c from './PasswordInput.module.scss'
import PlainInput, {PlainInputProps} from "@ui/PlainInput/PlainInput.tsx";
import EyeOpened from '@assets/icons/eye-opened.svg?react'
import EyeClosed from '@assets/icons/eye-closed.svg?react'

interface PasswordInputProps extends PlainInputProps {

}

const PasswordInput: FC<PasswordInputProps> = ({onChange, ...props}) => {
    const icons = useRef<ReactElement[]>([<EyeClosed/>, <EyeOpened/>])
    const [currentIconIdx, setCurrentIconIdx] = useState<number>(0)
    const currentIcon = useMemo<ReactElement>(() => icons.current[currentIconIdx],
        [currentIconIdx, icons])
    const currentInputType = useMemo<string>(() => currentIconIdx === 0 ? 'password' : 'text',
        [currentIconIdx])

    const onPostIconClicked = () => {
        toggleIcons()
    }

    const toggleIcons = () => {
        if (currentIconIdx === 0) {
            setCurrentIconIdx(1)
        } else {
            setCurrentIconIdx(0)
        }
    }

    const allowedChars = useRef<RegExp>(/^[a-zA-Z0-9!@#$%^&*()_+]*$/);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (allowedChars.current.test(value)) {
            if (onChange) {
                onChange(event);
            }
        }
    };

    return (
        <PlainInput
            {...props}
            type={currentInputType}
            onPostIconClick={onPostIconClicked}
            postIcon={currentIcon}
            postIconClassName={c.icon}
            onChange={handleChange}
        />
    );
}

export default PasswordInput;
import React, {FC, FormEvent, useEffect, useRef} from 'react';
import c from './EmployeeForm.module.scss'
import PlainInput from "@ui/PlainInput/PlainInput.tsx";
import Button from "@ui/Button/Button.tsx";
import Title from "@ui/Title/Title.tsx";
import PlainTextArea from "@ui/PlainTextArea/PlainTextArea.tsx";
import {Upload} from "antd";

interface EmployeeFormProps {
    onSubmit?: () => void;
    closeModal?: () => void;
    isVisible: boolean
}

const EmployeeForm: FC<EmployeeFormProps> = ({onSubmit, isVisible, closeModal}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isVisible) {
            inputRef.current?.focus();
        }
    }, [isVisible])

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit()
        }
    }

    const handleOnClose = () => {
        if (closeModal) {
            closeModal()
        }
    }

    return (
        <div className={c.block}>
            <div className={c['text-block']}>
                <Title>Форма</Title>
                <p className={c.text}>Форма для добавления <span>сотрудника</span></p>
            </div>

            <form onSubmit={handleOnSubmit} className={c.form}>
                <div className={c['picture-control']}>
                    <Upload
                        type={'drag'}
                    />
                </div>

                <PlainInput
                    ref={inputRef}
                    className={`${c.input}`}
                    label={'ФИО'}
                />

                <PlainInput
                    className={`${c.input}`}
                    label={'Возраст'}
                />

                <PlainInput
                    className={`${c.input}`}
                    label={'Должность'}
                />

                <PlainTextArea
                    label={'Описание'}
                    className={`${c.input} ${c.textarea}`}
                />

                <div className={c.btns}>
                    <Button className={c.btn} type={'submit'} onClick={handleOnClose}>Закрыть</Button>
                    <Button type={'submit'}>Подтвердить</Button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
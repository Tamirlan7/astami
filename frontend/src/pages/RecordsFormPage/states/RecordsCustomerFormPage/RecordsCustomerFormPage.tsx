import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import c from './RecordsCustomerFormPage.module.scss'
import {Button} from "antd";
import PlainInput from "@ui/PlainInput/PlainInput.tsx";

interface RecordsCustomerFormPageProps {
    onSubmit?: (data: FormData) => void
}

interface FormData {
    email: string
    phone: string
    name: string
}

const RecordsCustomerFormPage: FC<RecordsCustomerFormPageProps> = ({onSubmit}) => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        phone: '',
        name: '',
    })

    const handleOnSubmit = () => {
        if (onSubmit) {
            onSubmit({
                ...formData
            })
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))

    return (
        <div className={c.block}>
            <div className={c.main}>
                <form className={c.form}>
                    <PlainInput
                        className={c.input}
                        label='Имя'
                        name={'name'}
                        onChange={onChange}
                        value={formData.name}
                    />
                    <PlainInput
                        className={c.input}
                        label='Номер телефона'
                        name={'phone'}
                        onChange={onChange}
                        value={formData.phone}
                    />
                    <PlainInput
                        className={c.input}
                        label='Почта'
                        name={'email'}
                        onChange={onChange}
                        value={formData.email}
                    />

                    <Button className={c.btn} onClick={handleOnSubmit} type={'primary'}>Записаться</Button>
                </form>
            </div>
        </div>
    );
};

export default RecordsCustomerFormPage;
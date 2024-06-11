import React, {ChangeEvent, FC, useState} from 'react';
import c from './RecordsCustomerFormPage.module.scss'
import {Button, Divider} from "antd";
import PlainInput from "@ui/PlainInput/PlainInput.tsx";
import Title from "@ui/Title/Title.tsx";
import {useAppSelector} from "@hooks/reduxHooks.ts";

interface RecordsCustomerFormPageProps {
    onSubmit?: (data: FormData) => void
}

interface FormData {
    email: string
    phone: string
    name: string
}

const RecordsCustomerFormPage: FC<RecordsCustomerFormPageProps> = ({onSubmit}) => {
    const {currentCompany} = useAppSelector(state => state.company)
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
            <div className={c.container}>
                <div className={c.header}>
                    <Title style={{marginBottom: 5}}>Онлайн Запись</Title>
                    {currentCompany && (
                        <div className={c.title}>
                            <h2>{currentCompany.title}</h2>
                            <h3><strong>({currentCompany.currentBranch.title})</strong></h3>
                        </div>
                    )}
                    <p>Заполните форму:</p>
                </div>

                <Divider/>

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
        </div>
    );
};

export default RecordsCustomerFormPage;
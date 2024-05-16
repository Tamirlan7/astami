import c from './LoginPage.module.scss'
import {ChangeEvent, FormEvent, useState} from "react";
import PlainInput from "@ui/PlainInput/PlainInput.tsx";
import {useAppDispatch} from "@hooks/reduxHooks.ts";
import {loginThunk} from "@thunks/authThunk.ts";
import UnderlineText from "@ui/UnderlineText/UnderlineText.tsx";
import Button from "@ui/Button/Button.tsx";
import InfoIcon from '@assets/icons/info.svg?react'

interface ILoginFormData {
    login: string
    password: string
}

function LoginPage() {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<ILoginFormData>({
        login: '',
        password: '',
    })

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login();
    }

    const login = () => {
        const loginIsEmail: boolean = formData.login.includes('@')

        dispatch(loginThunk({
            password: formData.password,
            email: loginIsEmail ? formData.login : '',
            phone: !loginIsEmail ? formData.password : '',
        }))
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))

    return (
        <div className={c.block}>
            <div className={c['form-block']}>
                <form className={c.form} onSubmit={handleOnSubmit}>
                    <h1 className={c.title}>Вход</h1>

                    <div className={c.inputs}>
                        <PlainInput
                            label={'Номер телефона или почта'}
                            name={'login'}
                            className={c.input}
                            value={formData.login}
                            onChange={handleOnChange}
                            postIcon={<InfoIcon/>}
                        />
                        <PlainInput
                            label={'Пароль'}
                            name={'password'}
                            className={c.input}
                            value={formData.password}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className={c.text}>
                        <UnderlineText underlineColor={'#5B8CEB'} thickness={1.1}>
                            Забыл пароль?
                        </UnderlineText>
                    </div>

                    <Button type={'submit'} className={c.btn}>Войти</Button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
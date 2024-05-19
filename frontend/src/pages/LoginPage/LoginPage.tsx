import {useNavigate} from 'react-router-dom'
import c from './LoginPage.module.scss'
import {ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState} from "react";
import PlainInput from "@ui/PlainInput/PlainInput.tsx";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import {loginThunk} from "@thunks/authThunk.ts";
import UnderlineText from "@ui/UnderlineText/UnderlineText.tsx";
import Button from "@ui/Button/Button.tsx";
import InfoIcon from '@assets/icons/info.svg?react'
import PasswordInput from "@ui/PasswordInput/PasswordInput.tsx";
import {IFormValid} from "@/types/types.ts";
import {RoutePaths} from "@config/RoutePaths.ts";

interface ILoginFormData {
    login: string
    password: string
}

function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loginInput = useRef<HTMLInputElement>(null);
    const {isLoading, tokens} = useAppSelector(state => state.user)
    const [formData, setFormData] = useState<ILoginFormData>({
        login: '',
        password: '',
    })

    useEffect(() => {
        loginInput.current?.focus();
    }, []);

    useEffect(() => {
        if (!isLoading && tokens) {
            navigate(RoutePaths.COMPANIES)
        }

    }, [isLoading, tokens, navigate]);

    const isFormValid = useMemo<IFormValid>(() => {
        const isValid = {
            password: [
                {
                    isInvalid: formData.password.length < 8,
                    message: 'Количество символов должна быть больше либо равна 8',
                },
            ]
        }

        isValid['all'] = [{
            isInvalid: isValid.password.some(v => v.isInvalid),
        }]

        return isValid
    }, [formData])

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
                            tabIndex={1}
                            ref={loginInput}
                            label={'Номер телефона или почта'}
                            name={'login'}
                            className={c.input}
                            value={formData.login}
                            onChange={handleOnChange}
                            postIcon={(
                                <figure style={{ cursor: 'pointer' }}>
                                    <InfoIcon/>
                                </figure>
                            )}
                        />
                        <PasswordInput
                            tabIndex={2}
                            validations={isFormValid['password']}
                            label={'Пароль'}
                            name={'password'}
                            className={c.input}
                            value={formData.password}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className={c.text} tabIndex={3}>
                        <UnderlineText underlineColor={'#5B8CEB'} thickness={1.1}>
                            Забыл пароль?
                        </UnderlineText>
                    </div>

                    <Button disabled={isFormValid['all'][0].isInvalid}
                            isLoading={isLoading}
                            tabIndex={4}
                            type={'submit'}
                            className={c.btn}
                            rootClassName={c['btn-root']}
                    >
                        Войти
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
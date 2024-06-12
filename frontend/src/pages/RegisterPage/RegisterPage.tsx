import c from './RegisterPage.module.scss'
import PlainInput from "@ui/PlainInput/PlainInput.tsx";
import PasswordInput from "@ui/PasswordInput/PasswordInput.tsx";
import Button from "@ui/Button/Button.tsx";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import {useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState} from "react";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {HttpMethod, IFormValid} from "@/types/types.ts";
import {RoutePaths} from "@config/RoutePaths.ts";
import {registerThunk} from "@thunks/authThunk.ts";

interface IRegisterFormData {
    email: string
    phone: string
    password: string
}

function RegisterPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const emailInput = useRef<HTMLInputElement>(null);
    const {lastRequest, tokens} = useAppSelector(state => state.user)
    const [formData, setFormData] = useState<IRegisterFormData>({
        email: '',
        password: '',
        phone: '',
    })

    useEffect(() => {
        emailInput.current?.focus();
    }, []);

    useEffect(() => {
        if (!lastRequest.isPending &&
            lastRequest.success &&
            lastRequest.path === BackendEndpoints.REGISTER &&
            lastRequest.method === HttpMethod.POST &&
            tokens) {
            navigate(RoutePaths.COMPANIES)
        }
    }, [lastRequest, tokens, navigate]);

    const isFormValid = useMemo<IFormValid>(() => {
        const isValid = {
            password: [
                {
                    isInvalid: formData.password.length < 8,
                    message: 'Количество символов должна быть больше либо равна 8',
                    exception: formData.password.length === 0,
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
        register();
    }

    const register = () => {
        dispatch(registerThunk({
            password: formData.password,
            email: formData.email,
            phone: formData.phone,
        }))
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))

    return (
        <div className={c.block}>
            <div className={c['form-block']}>
                <form className={c.form} onSubmit={handleOnSubmit}>
                    <h1 className={c.title}>Регистрация</h1>

                    <div className={c.inputs}>
                        <PlainInput
                            tabIndex={1}
                            ref={emailInput}
                            label={'Почта'}
                            name={'email'}
                            className={c.input}
                            value={formData.email}
                            onChange={handleOnChange}
                        />
                        <PlainInput
                            tabIndex={1}
                            ref={emailInput}
                            label={'Номер телефона'}
                            name={'phone'}
                            className={c.input}
                            value={formData.phone}
                            onChange={handleOnChange}
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

                    <Button disabled={isFormValid['all'][0].isInvalid}
                            isLoading={lastRequest.isPending}
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

export default RegisterPage;
import React, {ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState} from 'react';
import c from './CompaniesFormPage.module.scss'
import Container from "@components/Container/Container.tsx";
import Title from "@ui/Title/Title.tsx";
import PlainInput from "@ui/PlainInput/PlainInput.tsx";
import Button from "@ui/Button/Button.tsx";
import {useNavigate, createSearchParams, useLocation} from "react-router-dom";
import {RoutePaths} from "@config/RoutePaths.ts";
import {IFormValid} from "@/types/types.ts";
import Icon from "@ui/Icon/Icon.tsx";
import BackIcon from '@assets/icons/back.svg?react'


function CompaniesFormPage() {
    const navigate = useNavigate();
    const {state} = useLocation()
    const titleInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        title: ''
    })

    useEffect(() => {
        if (state?.companyTitle) {
            setFormData({
                title: state.companyTitle,
            })
        }
    }, [state]);
    
    const formValidation = useMemo<IFormValid>(() => {
        const obj: IFormValid = {
            title: [
                {
                    isInvalid: formData.title.trim().length <= 1,
                    message: 'Название компании должна быть больше одного символа',
                    exception: formData.title.trim().length === 0,
                },
                {
                    isInvalid: formData.title.trim().length > 100,
                    message: 'Название компании не должна превышать более 100 символов'
                },
            ]
        }

        obj['all'] = [
            {
                isInvalid: obj.title.some(v => v.isInvalid)
            }
        ]

        return obj;
    }, [formData])

    useEffect(() => {
        titleInputRef.current?.focus();
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        navigate({
            pathname: RoutePaths.BRANCH_FORM,
            search: createSearchParams({
                'companyTitle': formData.title,
            }).toString(),
        })
    }

    const navigateToCompaniesPage = () => {
        navigate(RoutePaths.COMPANIES)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))

    return (
        <div className={c.block}>
            <Container>
                <div className={c.inner}>

                    <figure className={c.back} onClick={navigateToCompaniesPage}>
                        <Icon pointerEnabled width={28} height={28}>
                            <BackIcon/>
                        </Icon>
                    </figure>
                    <div className={c.content}>

                        <div className={c['text-block']}>
                            <Title>
                                Компании
                            </Title>
                            <p>Форма для регистрации вашей компании в наш сервис</p>
                        </div>

                        <form onSubmit={handleSubmit} className={c.form}>
                            <PlainInput
                                validations={formValidation.title}
                                value={formData.title}
                                name={'title'}
                                onChange={handleChange}
                                ref={titleInputRef}
                                label={'Название компании'}
                            />

                            <Button disabled={formValidation.all[0].isInvalid}
                                    type={'submit'}
                                    className={c.btn}>Подтвердить</Button>
                        </form>

                    </div>

                </div>
            </Container>
        </div>
    );
}

export default CompaniesFormPage;
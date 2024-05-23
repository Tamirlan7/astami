import React, {ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState} from 'react';
import c from "@pages/CompaniesFormPage/CompaniesFormPage.module.scss";
import Container from "@components/Container/Container.tsx";
import Title from "@ui/Title/Title.tsx";
import PlainInput from "@ui/PlainInput/PlainInput.tsx";
import Button from "@ui/Button/Button.tsx";
import {RoutePaths} from "@config/RoutePaths.ts";
import Back from "@ui/Back/Back.tsx";
import {useNavigate, useSearchParams} from 'react-router-dom';
import {HttpMethod, IFormValid} from "@/types/types.ts";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import {createCompanyThunk} from "@thunks/companyThunk.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {addBranchToCompanyThunk} from "@thunks/branchThunk.ts";

const BranchFormPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        country: '',
        city: '',
    })
    const dispatch = useAppDispatch()
    const {lastRequest} = useAppSelector(state => state.company)
    const titleInputRef = useRef<HTMLInputElement>(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const companyTitle = useMemo<string | null>(() => searchParams.get("companyTitle"), [searchParams]);
    const redirectBack = useMemo<string | null>(() => searchParams.get("redirectBack"), [searchParams]);
    const companyId = useMemo<string | null>(() => searchParams.get("companyId"), [searchParams]);

    useEffect(() => {
        titleInputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (
            (lastRequest.success &&
                lastRequest.method === HttpMethod.POST &&
                lastRequest.path === BackendEndpoints.CREATE_COMPANY &&
                !lastRequest.isPending) ||
            (lastRequest.success &&
                lastRequest.method === HttpMethod.POST &&
                lastRequest.path === BackendEndpoints.ADD_BRANCH_TO_COMPANY &&
                !lastRequest.isPending)
        ) {
            if (redirectBack) {
                navigate(redirectBack)
            } else {
                navigate(RoutePaths.COMPANIES)
            }
        }
    }, [lastRequest, navigate, redirectBack]);

    useEffect(() => {
        if (companyId) {
            return;
        }

        if (!companyTitle) {
            navigate(RoutePaths.COMPANIES_FORM)
        }

        if (companyTitle) {
            if (companyTitle.length < 2 || companyTitle.length > 100) {
                navigate(RoutePaths.COMPANIES_FORM)
            }
        }
    }, [navigate, companyTitle, companyId]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (companyId && !Object.is(Number(companyId), NaN)) {
            dispatch(addBranchToCompanyThunk({
                companyId: Number(companyId),
                title: formData.title,
                city: formData.city,
                country: formData.country
            }))
        } else {
            dispatch(createCompanyThunk({
                title: companyTitle as string,
                branches: [{
                    title: formData.title,
                    city: formData.city,
                    country: formData.country
                }]
            }))
        }

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))

    const formValidation = useMemo<IFormValid>(() => {
        const obj: IFormValid = {
            title: [
                {
                    isInvalid: formData.title.trim().length <= 1,
                    message: 'Название филиала должна быть больше одного символа'
                },
                {
                    isInvalid: formData.title.trim().length > 100,
                    message: 'Название филиала не должна превышать более 100 символов'
                },
            ],
            city: [
                {
                    isInvalid: formData.city.trim().length <= 1,
                    message: 'Название страны должна быть больше 1 символа'
                },
                {
                    isInvalid: formData.city.trim().length > 100,
                    message: 'Название страны не должна превышать более 100 символов'
                },
            ],
            country: [
                {
                    isInvalid: formData.country.trim().length <= 4,
                    message: 'Название страны должна быть больше 4 символов'
                },
                {
                    isInvalid: formData.country.trim().length > 100,
                    message: 'Название филиала не должна превышать более 100 символов'
                },
            ]

        }

        obj['all'] = [
            {
                isInvalid: (
                    obj.title.some(v => v.isInvalid) ||
                    obj.country.some(v => v.isInvalid) ||
                    obj.city.some(v => v.isInvalid)
                )
            }
        ]

        return obj;
    }, [formData])

    return (
        <div className={c.block}>
            <Container>
                <div className={c.inner}>

                    <figure className={c.back}>
                        <Back to={RoutePaths.COMPANIES_FORM} state={{
                            companyTitle
                        }}/>
                    </figure>
                    <div className={c.content}>

                        <div className={c['text-block']}>
                            <Title>
                                Филиалы
                            </Title>
                            <p>Форма для регистрации филиалов</p>
                        </div>

                        <form onSubmit={handleSubmit} className={c.form}>
                            <PlainInput
                                validations={formValidation.title}
                                value={formData.title}
                                name={'title'}
                                onChange={handleChange}
                                ref={titleInputRef}
                                label={'Название филиала'}
                            />

                            <PlainInput
                                validations={formValidation.country}
                                value={formData.country}
                                name={'country'}
                                onChange={handleChange}
                                label={'Страна'}
                            />

                            <PlainInput
                                validations={formValidation.city}
                                value={formData.city}
                                name={'city'}
                                onChange={handleChange}
                                label={'Город'}
                            />

                            <Button isLoading={lastRequest.isPending} disabled={formValidation.all[0].isInvalid}
                                    type={'submit'}
                                    className={c.btn}>Подтвердить</Button>
                        </form>

                    </div>

                </div>
            </Container>
        </div>
    );
};

export default BranchFormPage;
import React, {FC, FormEvent, useState} from 'react';
import c from './ServicesFormPage.module.scss'
import ControlPanelWrapper from "@components/ControlPanelWrapper/ControlPanelWrapper.tsx";
import Title from "@ui/Title/Title.tsx";
import {RoutePaths} from "@config/RoutePaths.ts";
import {useAppSelector} from "@hooks/reduxHooks.ts";
import {useNavigate} from "react-router-dom";
import {ICreateServiceRequest, ICreateServiceRequestBody} from "@/types/payload.ts";

const ServicesFormPage: FC = () => {
    const navigate = useNavigate();
    const {currentCompany} = useAppSelector(state => state.company)
    const [formData, setFormData] = useState<ICreateServiceRequestBody>({
        title: '',
        description: '',
        duration: '',
        price: 0
    })

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <ControlPanelWrapper>
            <div className={c.main}>

                <div className={c.header}>
                    <div className={c['text-block']}>
                        <Title>Форма</Title>
                        <p className={c.text}>Форма для добавления <span onClick={() => {
                            if (currentCompany) {
                                navigate(RoutePaths.SERVICES.replace(':companyId', currentCompany.id.toString()))
                            }
                        }}>сервисов</span></p>
                    </div>
                </div>

                <div className={c.content}>
                    <form onSubmit={handleOnSubmit} className={c.form}>
                        <div className={c['form-inner']}>

                        </div>
                    </form>
                </div>
            </div>
        </ControlPanelWrapper>
    );
};

export default ServicesFormPage;
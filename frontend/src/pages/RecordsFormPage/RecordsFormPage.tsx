import React, {FC, ReactNode, useEffect, useMemo, useState} from 'react';
import c from './RecordsFormPage.module.scss'
import Container from "@components/Container/Container.tsx";
import RecordsServicesFormPage from "@pages/RecordsFormPage/states/RecordsServicesFormPage/RecordsServicesFormPage.tsx";
import RecordsDateTimeFormPage from "@pages/RecordsFormPage/states/RecordsDateTimeFormPage/RecordsDateTimeFormPage.tsx";
import RecordsCustomerFormPage from "@pages/RecordsFormPage/states/RecordsCustomerFormPage/RecordsCustomerFormPage.tsx";
import RecordsEmployeeFormPage from "@pages/RecordsFormPage/states/RecordsEmployeeFormPage/RecordsEmployeeFormPage.tsx";
import {Steps} from "antd";
import {IEmployee, IService} from "@/types/model.ts";
import {ICreateRecordRequestBody} from "@/types/payload.ts";
import {ArrowLeftOutlined} from '@ant-design/icons'
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import {createRecordThunk} from "@thunks/recordThunk.ts";
import {useParams} from "react-router-dom";
import {getCompanyByIdThunk} from "@thunks/companyThunk.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {HttpMethod} from "@/types/types.ts";


const RecordsFormPage: FC = () => {
    const dispatch = useAppDispatch()
    const [formData, setFormData] = useState<ICreateRecordRequestBody>({
        serviceId: 0,
        employeeId: 0,
        customer: {
            email: '',
            phone: '',
            name: '',
        },
        datetime: null,
    })

    const states: ReactNode[] = [
        <RecordsServicesFormPage onServiceSelect={(s) => onServiceSelect(s)}/>,
        <RecordsDateTimeFormPage serviceId={formData.serviceId}
                                 onDateChange={(datetime) => handleOnDateChange(datetime)}/>,
        <RecordsEmployeeFormPage onEmployeeSelect={(e) => handleOnEmployeeSelect(e)} datetime={formData.datetime}
                                 serviceId={formData.serviceId}/>,
        <RecordsCustomerFormPage onSubmit={(data) => handleOnSubmit(data)}/>,
    ]

    const {companyId, branchId} = useParams()
    const [currentState, setCurrentState] = useState<number>(0)
    const currentStateNode = useMemo(() => states[currentState], [currentState])
    const {lastRequest} = useAppSelector(state => state.record)

    useEffect(() => {
        const cId: number = Number(companyId)
        if (!Object.is(cId, NaN)) {
            dispatch(getCompanyByIdThunk(cId))
        }
    }, [companyId, dispatch])

    // useEffect(() => {
    //     if (!lastRequest.isPending
    //         && lastRequest.success
    //         && lastRequest.path === BackendEndpoints.CREATE_RECORD
    //         && lastRequest.method === HttpMethod.GET) {
    //         setCurrentState(0)
    //     }
    // }, [lastRequest.isPending, lastRequest.method, lastRequest.path, lastRequest.success])

    const handleOnSubmit = (data) => {
        if (companyId && branchId) {
            dispatch(createRecordThunk({
                ...{...formData, customer: data},
                companyId: Number(companyId),
                branchId: Number(branchId),
            })).then(_ => setCurrentState(0))
        }
    }

    const handleOnEmployeeSelect = (e: IEmployee) => {
        setFormData((prev) => ({...prev, employeeId: e.id}))
        goNextState();
    }

    const handleOnDateChange = (datetime: Date) => {
        setFormData((prev) => ({...prev, datetime}))
        goNextState();
    }

    const onServiceSelect = (service: IService) => {
        setFormData((prev) => ({...prev, serviceId: service.id}))
        goNextState();
    }

    const goNextState = () => {
        if (currentState + 1 >= states.length) {
            return;
        }

        setCurrentState(prev => prev + 1)
    }

    const goPrevState = () => {
        if (currentState - 1 < 0) {
            return
        }

        setCurrentState(prev => prev - 1)
    }

    return (
        <div className={c.block}>
            <Container>

                <div className={c.inner}>
                    <div className={c.main}>
                        <div className={c.content}>

                            <div className={c.state}>
                                <Steps
                                    current={currentState}
                                    items={[
                                        {
                                            title: 'Выбрать услугу',
                                        },
                                        {
                                            title: 'Выбрать время',
                                        },
                                        {
                                            title: 'Выбрать специалиста',
                                        },
                                        {
                                            title: 'Заполнить данные',
                                        },
                                    ]}
                                />
                            </div>

                            <div className={c.main}>
                                {currentState !== 0 &&
                                    <figure onClick={goPrevState} className={c.icon}><ArrowLeftOutlined/></figure>}
                                {currentStateNode}
                            </div>

                        </div>
                    </div>
                </div>

            </Container>
        </div>
    );
};

export default RecordsFormPage;
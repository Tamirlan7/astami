import React, {ChangeEvent, FC, FormEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import c from './EmployeesFormPage.module.scss'
import ControlPanelWrapper from "@components/ControlPanelWrapper/ControlPanelWrapper.tsx";
import Title from "@ui/Title/Title.tsx";
import PlainInput from "@ui/PlainInput/PlainInput.tsx";
import PlainTextArea from "@ui/PlainTextArea/PlainTextArea.tsx";
import Button from "@ui/Button/Button.tsx";
import PlainUpload from "@ui/PlainUpload/PlainUpload.tsx";
import {
    Avatar,
    Empty,
    Image,
    Select,
    Skeleton,
    TimePicker
} from "antd";
import {UploadRequestOption} from "rc-upload/lib/interface";
import {ICreateEmployeeRequestBody, IGetServicesResponse} from "@/types/payload.ts";
import FormControl from "@ui/FormControl/FormControl.tsx";
import InfoIcon from '@assets/icons/info.svg?react'
import {selectWeekdaysOptions} from "@/data/selectWeekdaysOptions.ts";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import {IService, Weekdays} from "@/types/model.ts";
import {getServicesThunk} from "@thunks/serviceThunk.ts";
import {HttpMethod, IFormValid} from "@/types/types.ts";
import PlainNumberInput from "@ui/PlainNumberInput/PlainNumberInput.tsx";
import {DisabledTimes} from "rc-picker/lib/interface";
import {createEmployeeThunk, getEmployeeByIdThunk, updateEmployeeThunk} from "@thunks/employeeThunk.ts";
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {clearEmployeeLastRequest} from "@slices/employeeSlice.ts";
import {RoutePaths} from "@config/RoutePaths.ts";
import AuthorizedImage from "@ui/AuthorizedImage/AuthorizedImage.tsx";
import dayjs from 'dayjs'

const EmployeesFormPage: FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams()
    const {lastRequest: employeeLastRequest} = useAppSelector(state => state.employee)
    const {
        lastRequest: serviceLastRequest
    } = useAppSelector(state => state.service)
    const {currentCompany} = useAppSelector(state => state.company)
    const [previewOpen, setPreviewOpen] = useState(false);
    const [servicesCurrentPage, setServicesCurrentPage] = useState(0);
    const servicesPaginationSize = 25;
    const [servicesResponse, setServicesResponse] = useState<IGetServicesResponse>();
    const [servicesSearchValue, setServicesSearchValue] = useState<string>('')
    const [formData, setFormData] = useState<ICreateEmployeeRequestBody>({
        age: 25,
        description: '',
        fullName: '',
        image: null,
        jobTitle: '',
        workDays: [],
        assignedServices: [],
        workdayStartTime: '08:00',
        workdayEndTime: '23:00',
    })
    const {currentEmployee} = useAppSelector(state => state.employee)
    const {pathname} = useLocation()
    const {employeeId} = useParams()

    const observer = useRef<IntersectionObserver | null>(null);
    const services = useMemo<IService[]>(() => servicesResponse?.services ?? [], [servicesResponse?.services])

    const hasMore = useMemo(() => {
        return !servicesResponse?.last
    }, [servicesResponse?.last])

    useEffect(() => {
        if (currentCompany && hasMore && servicesCurrentPage !== servicesResponse?.currentPage) {
            dispatch(getServicesThunk({
                companyId: currentCompany.id,
                branchId: currentCompany.currentBranch.id,
                page: servicesCurrentPage,
            })).then((res) => {
                const servicesResponse = res.payload as IGetServicesResponse
                setServicesResponse((prev) => {
                    let services: IService[] = []

                    if (prev) services = [...prev.services, ...servicesResponse.services]
                    else services = [...servicesResponse.services]

                    return {
                        ...servicesResponse,
                        services: services
                    }
                })
            })
        }
    }, [currentCompany, dispatch, hasMore, servicesCurrentPage, servicesResponse?.currentPage])

    const lastServiceRef = useCallback((node) => {
        if (serviceLastRequest.isPending && serviceLastRequest.path === BackendEndpoints.GET_SERVICES && serviceLastRequest.method === HttpMethod.GET) return
        if (observer.current) observer.current?.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setServicesCurrentPage(prev => prev + 1)
            }
        })

        if (node) observer.current?.observe(node);
    }, [hasMore, serviceLastRequest.isPending, serviceLastRequest.method, serviceLastRequest.path])

    const authorizedImagePath = useMemo<string | null>(() => {
        if (currentEmployee == null || !currentEmployee.image || !currentCompany) {
            return null
        }

        return BackendEndpoints.GET_EMPLOYEES_FILE
            .replace(':companyId', currentCompany.id.toString())
            .replace(':branchId', currentCompany.currentBranch.id.toString())
            .replace(':employeeId', currentEmployee.id.toString())
            .replace(':fileName', currentEmployee.image.name)
    }, [currentCompany, currentEmployee])


    const getEmployeeLoading = useMemo<boolean>(() => {
        return employeeLastRequest.isPending && employeeLastRequest.path === BackendEndpoints.GET_EMPLOYEE_BY_ID && employeeLastRequest.method === HttpMethod.GET
    }, [employeeLastRequest.isPending, employeeLastRequest.method, employeeLastRequest.path])

    const isEditEmployee = useMemo<boolean>(() => {
        return pathname.includes('/edit/form')
    }, [pathname])

    useEffect(() => {
        if (currentCompany && isEditEmployee) {
            if (currentEmployee?.id !== Number(employeeId)) {
                dispatch(getEmployeeByIdThunk({
                    employeeId: Number(employeeId),
                    companyId: currentCompany.id,
                    branchId: currentCompany.currentBranch.id
                }))
            }
        }
    }, [currentCompany, currentEmployee?.id, dispatch, employeeId, isEditEmployee])

    useEffect(() => {
        if (isEditEmployee && currentEmployee) {
            const {
                assignedServices,
                services,
                id,
                image,
                branchId,
                ...employee
            } = currentEmployee

            setFormData({
                ...employee,
                assignedServices: assignedServices.map(s => ({id: s.id, title: s.title})),
                image: image,
                workDays: employee.workDays.map(d => Weekdays[d]),
            })
        }
    }, [currentEmployee, isEditEmployee])

    // if not, it does not need to be updated
    const dataChanged = useMemo<boolean>(() => {
        return (
            formData.fullName !== currentEmployee?.fullName ||
            formData.age !== currentEmployee?.age ||
            formData.jobTitle !== currentEmployee.jobTitle ||
            formData.description !== currentEmployee.description ||
            formData.image !== currentEmployee.image ||
            formData.assignedServices.some(as => !currentEmployee.assignedServices.find(s => as.id === s.id)) || formData.assignedServices.length !== currentEmployee.assignedServices.length ||
            formData.workDays.some(d => !currentEmployee.workDays.includes(d)) || formData.workDays.length !== currentEmployee.workDays.length ||
            formData.workdayStartTime !== currentEmployee.workdayStartTime ||
            formData.workdayEndTime !== currentEmployee.workdayEndTime
        )
    }, [currentEmployee, formData])

    const filteredServices = useMemo<IService[]>(() => {
        return services.filter(s => s.title.trim().toLowerCase().includes(servicesSearchValue.trim().toLowerCase()))
    }, [services, servicesSearchValue])

    const redirectBack = useMemo<string | null>(() => {
        return searchParams.get('redirectBack')
    }, [searchParams])

    useEffect(() => {
        if (redirectBack) {
            if (!employeeLastRequest.isPending &&
                employeeLastRequest.method === HttpMethod.POST &&
                employeeLastRequest.path === BackendEndpoints.CREATE_EMPLOYEE &&
                employeeLastRequest.success
            ) {
                navigate(redirectBack, {
                    replace: true
                })
                dispatch(clearEmployeeLastRequest())
            }
        }
    }, [dispatch, employeeLastRequest.isPending, employeeLastRequest.method, employeeLastRequest.path, employeeLastRequest.success, navigate, redirectBack]);

    const workdayStartTimeDisabledTime = useMemo<DisabledTimes>(() => {
        if (formData.workdayEndTime.length < 5) {
            return {}
        }

        let hours: number = Number(formData.workdayEndTime.slice(0, 2))
        const minutes: number = Number(formData.workdayEndTime.slice(3, 5))

        if (minutes > 0) {
            hours = hours + 1
        }

        return {
            'disabledHours': () => Array.from({length: hours}, (_, idx) => idx + hours),
            'disabledMinutes': () => Array.from({length: minutes}, (_, idx) => idx + minutes)
        }
    }, [formData.workdayEndTime])

    const workdayEndTimeDisabledHours = useMemo<DisabledTimes>(() => {
        if (formData.workdayStartTime.length < 2) {
            return {}
        }

        const hours: number = Number(formData.workdayStartTime.slice(0, 2))
        const minutes: number = Number(formData.workdayStartTime.slice(3, 5))


        return {
            'disabledHours': () => Array.from({length: hours}, (_, idx) => idx),
            'disabledMinutes': () => Array.from({length: minutes}, (_, idx) => idx),
        }
    }, [formData.workdayStartTime]);

    const isFormValid = useMemo<IFormValid>(() => {
        const isValid = {
            fullName: [
                {
                    isInvalid: formData.fullName.trim().length <= 1,
                    message: 'Количество символов должно быть больше либо равна 2',
                    exception: formData.fullName.trim().length === 0
                },
            ],
            age: [
                {
                    isInvalid: (formData.age && formData.age < 6) as boolean,
                    message: 'Возраст должен быть не меньше 6',
                    exception: !formData.age
                },
                {
                    isInvalid: (formData.age && formData.age > 100) as boolean,
                    message: 'Возраст должен быть не больше 100',
                    exception: !formData.age
                }
            ],
            jobTitle: [
                {
                    isInvalid: formData.jobTitle.trim().length <= 1,
                    message: 'Количество символов должно быть больше либо равна 2',
                    exception: formData.jobTitle.trim().length === 0
                }
            ],
            description: [
                {
                    isInvalid: formData.description.length > 5000,
                    message: 'Количество символов должно быть меньше либо равна 5000',
                }
            ],
            workdayStartTime: [
                {
                    isInvalid: !formData.workdayStartTime.length,
                    message: 'Обязательное поле',
                }
            ],
            workdayEndTime: [
                {
                    isInvalid: !formData.workdayEndTime.length,
                    message: 'Обязательное поле',
                }
            ],
            workDays: [
                {
                    isInvalid: !formData.workDays.length,
                    message: 'Обязательное поле',
                }
            ],
        }

        isValid['all'] = [{
            isInvalid: (
                isValid.fullName.some(v => v.isInvalid && !v.exception) ||
                isValid.age.some(v => v.isInvalid && !v.exception) ||
                isValid.jobTitle.some(v => v.isInvalid && !v.exception) ||
                isValid.description.some(v => v.isInvalid) ||
                isValid.workdayStartTime.some(v => v.isInvalid) ||
                isValid.workdayEndTime.some(v => v.isInvalid) ||
                isValid.workDays.some(v => v.isInvalid)
            ),
        }]

        return isValid
    }, [formData])

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (currentCompany) {
            if (isEditEmployee) {
                if (currentEmployee) {
                    dispatch(updateEmployeeThunk({
                        ...formData,
                        employeeId: currentEmployee.id,
                        companyId: currentCompany.id,
                        branchId: currentCompany.currentBranch.id
                    }))
                }

                return;
            }

            dispatch(createEmployeeThunk({
                ...formData,
                companyId: currentCompany.id,
                branchId: currentCompany.currentBranch.id
            }))
        }

    }

    const handleOnTimeChanged = (_: any, dateString: any, property: 'workdayStartTime' | 'workdayEndTime') => {
        setFormData((prev) => ({
            ...prev,
            [property]: dateString
        }))
    }

    const customRequest = ({file, onSuccess}: UploadRequestOption) => {
        setTimeout(() => {
            if (onSuccess) {
                onSuccess("ok")
            }
        })

        setFormData((prev) => ({
            ...prev,
            image: file as Blob
        }))
    }

    const handleOnWeekdaysChange = (value: Weekdays[]) => {
        setFormData(prev => ({
            ...prev,
            workDays: value
        }))
    }

    const handleOnRemoveFile = () => {
        setFormData((prev) => ({
            ...prev,
            image: null,
        }))
    }

    const handleOnAgeChange = (value: number) => {
        setFormData(prev => ({
            ...prev,
            age: value
        }))
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))

    const handleOnAddServices = ({label, value}: { value: number, label: string }) => {
        setFormData((prev) => {
            return ({
                ...prev,
                assignedServices: [...prev.assignedServices, {id: value, title: label}]
            });
        })
    }

    const loadMoreServices = () => {

    }

    const handleOnRemoveServices = ({value}: { value: number, label: string }) => {
        setFormData((prev) => ({
            ...prev,
            assignedServices: [...prev.assignedServices.filter(s => s.id !== value)]
        }))
    }

    return (
        <ControlPanelWrapper>
            <div className={c.main}>

                <div className={c.header}>
                    <div className={c['text-block']}>
                        <Title>Форма</Title>
                        <p className={c.text}>Форма для добавления <span onClick={() => {
                            if (currentCompany) {
                                navigate(RoutePaths.EMPLOYEES.replace(':companyId', currentCompany.id.toString()))
                            }
                        }}>сотрудников</span></p>
                    </div>
                </div>

                <div className={c.content}>
                    <div className={c['form-block']}>
                        <form onSubmit={handleOnSubmit}>
                            <div className={c.form}>
                                <div className={`${c['form-item']}`}>
                                    <FormControl label={'Общая информация'}>
                                        <div className={c['form-control']}>
                                            <Skeleton loading={getEmployeeLoading} active paragraph={{rows: 10}}>
                                                <PlainInput
                                                    required
                                                    ref={inputRef}
                                                    className={`${c.input}`}
                                                    label={'ФИО'}
                                                    name={'fullName'}
                                                    value={formData.fullName}
                                                    onChange={handleOnChange}
                                                    validations={isFormValid['fullName']}
                                                />

                                                <PlainNumberInput
                                                    required
                                                    validations={isFormValid['age']}
                                                    name={'age'}
                                                    value={formData.age}
                                                    onChange={handleOnAgeChange}
                                                    className={`${c.input}`}
                                                    label={'Возраст'}
                                                />

                                                <PlainInput
                                                    required
                                                    className={`${c.input}`}
                                                    label={'Должность'}
                                                    value={formData.jobTitle}
                                                    onChange={handleOnChange}
                                                    name={'jobTitle'}
                                                    validations={isFormValid['jobTitle']}
                                                />

                                                <PlainTextArea
                                                    name={'description'}
                                                    value={formData.description}
                                                    label={'Описание'}
                                                    onChange={handleOnChange}
                                                    validations={isFormValid['description']}
                                                    className={`${c.input} ${c.textarea}`}
                                                />
                                            </Skeleton>
                                        </div>
                                    </FormControl>
                                </div>

                                <div className={`${c['form-item']}`}>
                                    <FormControl className={c['form-control']} label={'Выберите изображение'}>
                                        <Skeleton loading={getEmployeeLoading} active title avatar>
                                            <div className={c['picture-control']}>
                                                {(formData.image && 'path' in formData.image && isEditEmployee && authorizedImagePath)
                                                    ? (
                                                        <>
                                                            <AuthorizedImage
                                                                wrapperClassName={c.picture}
                                                                preview={{
                                                                    visible: previewOpen,
                                                                    'onVisibleChange': (visible) => setPreviewOpen(visible),
                                                                }}
                                                                path={authorizedImagePath}
                                                            />
                                                        </>

                                                    ) : (formData.image instanceof Blob) ? (
                                                        <Image
                                                            wrapperClassName={c.picture}
                                                            preview={{
                                                                visible: previewOpen,
                                                                'onVisibleChange': (visible) => setPreviewOpen(visible),
                                                            }}
                                                            src={URL.createObjectURL(formData.image)}
                                                        />
                                                    ) : (
                                                        <Avatar shape={'square'} size={50}/>
                                                    )}

                                                <PlainUpload
                                                    accept={'image/*'}
                                                    showUploadList={true}
                                                    name={'image'}
                                                    customRequest={customRequest}
                                                    maxCount={1}
                                                    rootClassName={c.upload}
                                                    onRemove={handleOnRemoveFile}
                                                    type={'drag'}
                                                >
                                                    Drag and Drop
                                                </PlainUpload>
                                            </div>
                                        </Skeleton>
                                    </FormControl>

                                    <FormControl className={c['form-control']} label={'Назначить услуги'}>
                                        <Skeleton loading={getEmployeeLoading} active>
                                            <div className={c.services}>
                                                <Select
                                                    loading={serviceLastRequest.isPending}
                                                    virtual
                                                    mode={'multiple'}
                                                    style={{width: '100%'}}
                                                    searchValue={servicesSearchValue}
                                                    showSearch
                                                    onSearch={v => setServicesSearchValue(v)}
                                                    notFoundContent={(
                                                        <Empty description={'Список сервисов пуст'}/>
                                                    )}
                                                    aria-label={'services'}
                                                    placeholder={'Выберите услуги'}
                                                    options={filteredServices.map(s => ({
                                                        value: s.id,
                                                        label: s.title,
                                                    }))}
                                                    optionRender={(option, {index}) => {
                                                        return (
                                                            <>
                                                                {services.length - 1 === index ? (
                                                                    <div
                                                                        ref={lastServiceRef}>{`${filteredServices.find(s => s.id === option.value)?.title}`}</div>
                                                                ) : (
                                                                    <div>{`${filteredServices.find(s => s.id === option.value)?.title}`}</div>
                                                                )}
                                                            </>
                                                        )
                                                    }}

                                                    value={formData.assignedServices.map(s => ({
                                                        value: s.id,
                                                        label: s.title,
                                                    }))}
                                                    onSelect={(_, option) => handleOnAddServices(option)}
                                                    onDeselect={(_, option) => handleOnRemoveServices(option)}
                                                />
                                            </div>
                                        </Skeleton>
                                    </FormControl>


                                </div>
                                <div className={c['form-item']}>
                                    <FormControl className={c['form-control']} label={'Указать смену работы'}
                                                 required>
                                        <Skeleton loading={getEmployeeLoading} active paragraph={{rows: 1}}>
                                            <div className={c['time-wrapper']}>
                                                <div className={c.picker}>
                                                    <span>от</span>
                                                    <TimePicker
                                                        needConfirm={false}
                                                        showNow={false}
                                                        value={formData.workdayStartTime ? dayjs(formData.workdayStartTime, 'HH:mm') : null}
                                                        onChange={(_, dateString) => handleOnTimeChanged(_, dateString, 'workdayStartTime')}
                                                        placeholder={'Выберите время'}
                                                        showSecond={false}
                                                        disabledTime={() => workdayStartTimeDisabledTime}
                                                    />
                                                </div>
                                                <span> - </span>
                                                <div className={c.picker}>
                                                    <span>до</span>
                                                    <TimePicker
                                                        needConfirm={false}
                                                        value={formData.workdayEndTime ? dayjs(formData.workdayEndTime, 'HH:mm') : null}
                                                        onChange={(_, dateString) => handleOnTimeChanged(_, dateString, 'workdayEndTime')}
                                                        showNow={false}
                                                        disabledTime={() => workdayEndTimeDisabledHours}
                                                        placeholder={'Выберите время'}
                                                        showSecond={false}
                                                    />
                                                </div>
                                            </div>
                                        </Skeleton>
                                    </FormControl>
                                    <FormControl label={'Выберите дни работы'} required>
                                        <Skeleton loading={getEmployeeLoading} active paragraph={{rows: 1}}>
                                            <div className={c['date-wrapper']}>
                                                <div className={c['info']}>
                                                    <figure><InfoIcon/></figure>
                                                    <p>Выберите дни недели в котором <span>сотрудник</span> будет
                                                        оказывать
                                                        услугу.</p>
                                                </div>

                                                <div className={c.picker}>
                                                    <Select
                                                        value={formData.workDays}
                                                        mode={'tags'}
                                                        style={{width: '100%'}}
                                                        placeholder={'Выберите дни недели'}
                                                        options={selectWeekdaysOptions}
                                                        onChange={handleOnWeekdaysChange}
                                                    />
                                                </div>
                                            </div>
                                        </Skeleton>
                                    </FormControl>
                                </div>
                            </div>

                            <div className={c.footer}>
                                <div className={c.btns}>
                                    <Button type={'submit'}
                                            isLoading={employeeLastRequest.isPending}
                                            disabled={isFormValid['all'][0].isInvalid || !dataChanged}>Подтвердить</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </ControlPanelWrapper>
    );
};

export default EmployeesFormPage;

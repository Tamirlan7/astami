import React, {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useMemo, useRef, useState} from 'react';
import c from './ServicesFormModal.module.scss'
import {Modal} from "antd";
import PlainInput from "@ui/PlainInput/PlainInput.tsx";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import {ICreateServiceRequestBody} from "@/types/payload.ts";
import PlainNumberInput from "@ui/PlainNumberInput/PlainNumberInput.tsx";
import PlainTextArea from "@ui/PlainTextArea/PlainTextArea.tsx";
import PlainTimePicker from "@ui/PlainTimePicker/PlainTimePicker.tsx";
import IntroduceTitle from "@ui/IntroduceTitle/IntroduceTitle.tsx";
import {IFormValid} from "@/types/types.ts";
import {createServiceThunk, updateServiceThunk} from "@thunks/serviceThunk.ts";
import convertTimeStringToMilliseconds from "@utils/convertTimeStringToMilliseconds.ts";
import {IService} from "@/types/model.ts";
import dayjs from "dayjs";
import convertMillisecondsToTime from "@utils/convertMillisecondsToTime.ts";

interface ServicesFormModalProps {
    visible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
    isEditForm?: boolean
    service?: IService
}

const ServicesFormModal: FC<ServicesFormModalProps> = ({visible, setVisible, service, isEditForm = false}) => {
    const dispatch = useAppDispatch();
    const {currentCompany} = useAppSelector(state => state.company)
    const {lastRequest} = useAppSelector(state => state.service)
    const inputTitleRef = useRef<HTMLInputElement>(null)
    const [formData, setFormData] = useState<ICreateServiceRequestBody>({
        title: '',
        description: '',
        duration: 0,
        price: 100
    })

    useEffect(() => {
        if (service) {
            setFormData({
                 ...service
            })
        }
    }, [service]);

    const isFormValid = useMemo<IFormValid>(() => {
        const isValid = {
            title: [
                {
                    isInvalid: formData.title.trim().length <= 2,
                    message: 'Количество символов должно быть больше либо равна 3',
                    exception: formData.title.length === 0,
                },
            ],
            price: [
                {
                    isInvalid: formData.price <= 99,
                    message: 'Цена должна быть больше либо равна 100',
                }
            ],
            description: [
                {
                    isInvalid: formData.description.length > 5000,
                    message: 'Описание не должна превышать 5000 символов',
                }
            ],
            duration: [
                {
                    isInvalid: !formData.duration,
                    message: 'Длительность обязательна для заполнения',
                }
            ],
        }

        isValid['all'] = [{
            isInvalid: (
                isValid.title.some(v => v.isInvalid && !v.exception) ||
                isValid.price.some(v => v.isInvalid) ||
                isValid.description.some(v => v.isInvalid) ||
                isValid.duration.some(v => v.isInvalid)
            ),
        }]

        return isValid
    }, [formData])

    const handleOnCancel = () => {
        closeModal()
    }

    const closeModal = () => {
        setVisible(false);
    }

    const handleOnOk = () => {
        if (currentCompany && currentCompany.currentBranch.id) {

            if (isEditForm) {

                if (service) {
                    dispatch(updateServiceThunk({
                        serviceId: service.id,
                        companyId: currentCompany.id,
                        branchId: currentCompany.currentBranch.id,
                        ...formData
                    }))
                }
                return;
            } else {
                dispatch(createServiceThunk({
                    ...formData,
                    companyId: currentCompany.id,
                    branchId: currentCompany.currentBranch.id
                }))
            }
            closeModal()
        }
    }

    const dataChanged = useMemo(() => {
        return (
            formData.title !== service?.title ||
            formData.description !== service?.description ||
            formData.duration !== service?.duration ||
            formData.price !== service?.price
        )
    }, [formData, service])

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const onTimeChange = (_: any, timeString: string | string[]) => {
        const milliseconds = convertTimeStringToMilliseconds(timeString)
        setFormData(prev => ({...prev, duration: milliseconds}))
    }


    return (
        <Modal
            open={visible}
            afterOpenChange={open => {
                if (open) {
                    inputTitleRef.current?.focus()
                }
            }}
            onCancel={handleOnCancel}
            onOk={handleOnOk}
            cancelText={'Закрыть'}
            okText={'Подтвердить'}
            okButtonProps={{
                disabled: isFormValid['all'][0].isInvalid || (isEditForm && !dataChanged),
                loading: lastRequest.isPending,
            }}
        >
            <div className={c.block}>
                <div className={c.header}>
                    <IntroduceTitle
                        title={'Форма'}
                        description={`Форма для ${isEditForm ? 'редактирования' : 'добавления'}`}
                        specialText={'услуг'}
                    />
                </div>

                <form className={c.form}>
                    <div className={c['form-inner']}>

                        <PlainInput
                            ref={inputTitleRef}
                            label={'Название'}
                            name={'title'}
                            validations={isFormValid['title']}
                            onChange={handleOnChange}
                            value={formData.title}
                            rootClassName={c['input-root']}
                            className={c.input}
                        />

                        <PlainNumberInput
                            label={'Цена'}
                            name={'price'}
                            validations={isFormValid['price']}
                            onChange={(price) => setFormData((prev) => ({...prev, price: price}))}
                            value={formData.price}
                            rootClassName={c['input-root']}
                            className={c.input}
                        />

                        <PlainTextArea
                            label={'Описание'}
                            name={'description'}
                            onChange={handleOnChange}
                            value={formData.description}
                            rootClassName={c['input-root']}
                            classNames={{
                                textarea: `${c.input} ${c.textarea}`,
                            }}
                        />

                        <PlainTimePicker
                            label={'Длительность услуги'}
                            format={`HH ч. - mm м.`}
                            placeholder={'Длительность'}
                            size={'middle'}
                            onChange={onTimeChange}
                            showSecond={false}
                            value={dayjs(convertMillisecondsToTime(formData.duration), 'HH:mm')}
                            minuteStep={5}
                            needConfirm={false}
                            showNow={false}

                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default ServicesFormModal;
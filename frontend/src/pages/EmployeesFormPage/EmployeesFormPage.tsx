import React, {FC, FormEvent, useEffect, useRef, useState} from 'react';
import c from './EmployeesFormPage.module.scss'
import ControlPanelWrapper from "@components/ControlPanelWrapper/ControlPanelWrapper.tsx";
import Title from "@ui/Title/Title.tsx";
import PlainInput from "@ui/PlainInput/PlainInput.tsx";
import PlainTextArea from "@ui/PlainTextArea/PlainTextArea.tsx";
import Button from "@ui/Button/Button.tsx";
import PlainUpload from "@ui/PlainUpload/PlainUpload.tsx";
import {Image, UploadFile} from "antd";
import {UploadChangeParam} from "antd/es/upload";
import getBase64File, {FileType} from "@utils/getBase64File.ts";
import {ICreateEmployeeRequestBody} from "@/types/payload.ts";
import FormControl from "@ui/FormControl/FormControl.tsx";

const EmployeesFormPage: FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [formData, setFormData] = useState<ICreateEmployeeRequestBody>({
        age: null,
        description: '',
        fullName: '',
        image: '',
        jobTitle: '',
    })

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const handleOnUpload = async (info: UploadChangeParam) => {
        const file = await getBase64File(info.file.originFileObj as FileType)

        setFormData(prev => ({
            ...prev,
            image: file
        }))
    }

    return (
        <ControlPanelWrapper>
            <div className={c.main}>

                <div className={c.header}>
                    <div className={c['text-block']}>
                        <Title>Форма</Title>
                        <p className={c.text}>Форма для добавления <span>сотрудника</span></p>
                    </div>
                </div>

                <div className={c.content}>
                    <div className={c['form-block']}>
                        <form onSubmit={handleOnSubmit} className={c.form}>
                            <div className={`${c['form-item']}`}>
                                <PlainInput
                                    ref={inputRef}
                                    className={`${c.input}`}
                                    label={'ФИО'}
                                />

                                <PlainInput
                                    className={`${c.input}`}
                                    label={'Возраст'}
                                />

                                <PlainInput
                                    className={`${c.input}`}
                                    label={'Должность'}
                                />

                                <PlainTextArea
                                    label={'Описание'}
                                    className={`${c.input} ${c.textarea}`}
                                />

                                <div className={c.btns}>
                                    <Button type={'submit'}>Подтвердить</Button>
                                </div>
                            </div>

                            <div className={`${c['form-item']}`}>
                                <FormControl className={c['form-control']} label={'Выберите изображение'}>
                                    <div className={c['picture-control']}>
                                        {formData.image ? (
                                            <Image
                                                wrapperClassName={c.picture}
                                                preview={{
                                                    visible: previewOpen,
                                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                                }}
                                                src={formData.image}
                                            />
                                        ) : (
                                            <div className={`${c.picture} ${c['picture-unselected']}`}></div>
                                        )}

                                        <PlainUpload
                                            accept={'image/*'}
                                            showUploadList={false}
                                            name={'file'}
                                            rootClassName={c.upload}
                                            onChange={handleOnUpload}
                                            type={'drag'}
                                        >
                                            Drag and Drop
                                        </PlainUpload>
                                    </div>
                                </FormControl>

                                <FormControl className={c['form-control']} label={'Назначить услуги'}>
                                    <div className={c.services}>

                                    </div>
                                </FormControl>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </ControlPanelWrapper>
    );
};

export default EmployeesFormPage;
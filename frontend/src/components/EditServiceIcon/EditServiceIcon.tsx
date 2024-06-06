import React, {FC, useState} from 'react';
import c from './EditServiceIcon.module.scss'
import {IService} from "@/types/model.ts";
import {EditOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import ServicesFormModal from "@components/ServicesFormModal/ServicesFormModal.tsx";

interface EditServiceIconProps {
    service: IService
}

const EditServiceIcon: FC<EditServiceIconProps> = ({service}) => {
    const dispatch = useAppDispatch()
    const {lastRequest} = useAppSelector(state => state.service)
    const {currentCompany} = useAppSelector(state => state.company)
    const [serviceModal, setServiceModal] = useState(false)

    const handleOnEdit = () => {
        setServiceModal(true)
    }

    return (
        <>
            <div className={c.block} onClick={handleOnEdit}>
                <EditOutlined/>
            </div>

            <ServicesFormModal
                isEditForm={true}
                service={service}
                visible={serviceModal}
                setVisible={setServiceModal}
            />
        </>
    );
};

export default EditServiceIcon;
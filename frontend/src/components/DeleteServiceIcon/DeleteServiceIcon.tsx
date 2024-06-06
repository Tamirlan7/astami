import React, {FC} from 'react';
import {IService} from "@/types/model.ts";
import c from './DeleteServiceIcon.module.scss'
import {DeleteOutlined} from '@ant-design/icons'
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import {Popconfirm} from "antd";
import {deleteServiceThunk} from "@thunks/serviceThunk.ts";

interface DeleteServiceIconProps {
    service: IService
}

const DeleteServiceIcon: FC<DeleteServiceIconProps> = ({service}) => {
    const dispatch = useAppDispatch()
    const {lastRequest} = useAppSelector(state => state.service)
    const {currentCompany} = useAppSelector(state => state.company)

    const handleOnDelete = () => {
        if (!lastRequest.isPending && currentCompany) {
            dispatch(deleteServiceThunk({
                serviceId: service.id,
                branchId: currentCompany.currentBranch.id,
                companyId: currentCompany.id
            }))
        }
    }


    return (
        <Popconfirm
            placement={'topLeft'}
            title={'Вы уверены что хотите удалить?'}
            cancelText={'Отмена'}
            okText={'Удалить'}
            okButtonProps={{
                danger: true,
            }}
            onConfirm={handleOnDelete}
            description={`Вы уверены что хотите удалить  услугу "${service.title.length > 20 ? service.title.slice(0, 20) + ' ...' : service.title}" ?`}
        >
            <div className={c.block}>
                <DeleteOutlined/>
            </div>
        </Popconfirm>
    );
};

export default DeleteServiceIcon;
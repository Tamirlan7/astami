import {ColumnType} from "antd/es/table";
import {IService} from "@/types/model.ts";
import convertMillisecondsToTimeString from "@utils/convertMillisecondsToTimeString.ts";
import React from "react";
import DeleteServiceIcon from "@components/DeleteServiceIcon/DeleteServiceIcon.tsx";
import EditServiceIcon from "@components/EditServiceIcon/EditServiceIcon.tsx";

export const servicesTableColumns: ColumnType<IService>[] = [
    {
        title: 'Название',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: 'Цена',
        dataIndex: 'price',
        key: 'price'
    },
    {
        title: 'Длительность',
        key: 'duration',
        render: (_, record) => {
            const time = convertMillisecondsToTimeString(record.duration)
            return <div>{time}</div>
        }
    },
    {
        title: 'Описание',
        key: 'title',
        render: (_, record) => {
            const text = record.description.length > 25
                ? `${record.description.substring(0, 25)}...`
                : record.description

            return <div>{text}</div>
        }
    },
    {
        title: 'Удалить',
        key: 'delete',
        render: (_, record) => <DeleteServiceIcon service={record} />,
        width: 48
    },
    {
        title: 'Изменить',
        key: 'delete',
        render: (_, record) => <EditServiceIcon service={record} />,
        width: 48
    },
]
import {ColumnType} from "antd/es/table";
import {IRecord} from "@/types/model.ts";

const recordTableColumns: ColumnType<IRecord>[] = [
    {
        title: 'Имя',
        key: 'customer.name',
        render: (_, record) => record.customer.name
    },
    {
        title: 'Время',
        key: 'dateTime',
        dataIndex: 'dateTime',
    },
    {
        title: 'Услуга',
        key: 'customer.phone',
        render: (_, record) => record.service.title
    },
    {
        title: 'Цена',
        key: 'customer.phone',
        render: (_, record) => record.service.price
    },
    {
        title: 'Специалист',
        key: 'customer.email',
        render: (_, record) => record.employee.fullName
    },
]

export default recordTableColumns
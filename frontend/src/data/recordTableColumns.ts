import {ColumnType} from "antd/es/table";
import {IRecord} from "@/types/model.ts";

const recordTableColumns: ColumnType<IRecord>[] = [
    {
        title: 'Время',
        key: 'dateTime',
        dataIndex: 'dateTime',
    },
    {
        title: 'Имя',
        key: 'customer.name',
        render: (_, record) => record.customer.name
    },
    {
        title: 'Номер телефона',
        key: 'customer.phone',
        render: (_, record) => record.customer.phone
    },
    {
        title: 'Почта',
        key: 'customer.email',
        render: (_, record) => record.customer.email
    },
]

export default recordTableColumns
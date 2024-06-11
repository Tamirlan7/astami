import {ICustomer} from "@/types/model.ts";
import {ColumnType} from "antd/es/table";

const customerTableColumns: ColumnType<ICustomer>[] = [
    {
        title: 'Имя',
        key: 'name',
        render: (_, record) => record.name
    },
    {
        title: 'Номер телефона',
        key: 'phone',
        render: (_, record) => record.phone
    },
    {
        title: 'Почта',
        key: 'email',
        render: (_, record) => record.email
    },
]

export default customerTableColumns
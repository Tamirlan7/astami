import {IEmployee} from "@/types/model.ts";
import {ColumnType} from "antd/es/table";
import Img from "@ui/Img/Img.tsx";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import Icon from "@ui/Icon/Icon.tsx";
import EditIcon from '@assets/icons/edit.svg?react';

const employeeTableColumns: ColumnType<IEmployee>[] = [
    {
        title: '',
        key: 'image',
        dataIndex: 'image',
        width: 40,
        render: (_, record, __) => {
            return (
                <Img
                    path={
                        BackendEndpoints.GET_EMPLOYEES_FILE
                            .replace(':branchId', record.branchId.toString())
                            .replace(':employeeId', record.id.toString())
                            .replace(':fileName', record.image.name)
                    }
                    rounded
                    replaceCompanyIdInPath
                    width={38}
                    height={38}
                    alt={'employee'}
                />
            )
        }
    },
    {
        title: 'Имя',
        dataIndex: 'fullName',
        key: 'fullName',
    },
    {
        title: 'Возраст',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Должность',
        dataIndex: 'jobTitle',
        key: 'jobTitle',
    },
    {
        title: 'Описание',
        dataIndex: 'description',
        key: 'description',
        render: (_, record, __) => {
            return (
                <div>{record.description.substring(0, 25)}{record.description.length > 25 && '...'}</div>
            )
        },
    },
    {
        title: '',
        dataIndex: 'edit',
        width: 40,
        render: (_, record, __) => {
            return (
                <Icon width={20} height={20}>
                    <EditIcon/>
                </Icon>
            )
        },
    },
]

export default employeeTableColumns;
import {IEmployee} from "@/types/model.ts";
import {ColumnType} from "antd/es/table";
import {API_URL} from "@config/AppConstants.ts";
import {useState} from "react";
import Img from "@ui/Img/Img.tsx";
import BackendEndpoints from "@config/BackendEndpoints.ts";

const employeeTableColumns: ColumnType<IEmployee>[] = [
    {
        title: '',
        key: 'image',
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

]

export default employeeTableColumns;
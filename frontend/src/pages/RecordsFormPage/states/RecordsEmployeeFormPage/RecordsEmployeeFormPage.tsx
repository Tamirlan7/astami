import React, {FC, useEffect, useState} from 'react';
import c from './RecordsEmployeeFormPage.module.scss'
import {IEmployee} from "@/types/model.ts";
import {Card, List, Space} from "antd";
import Meta from "antd/es/card/Meta";
import {SelectOutlined} from "@ant-design/icons";
import {getRecordAvailableEmployees} from "@thunks/recordThunk.ts";
import {useAppDispatch} from "@hooks/reduxHooks.ts";
import {IGetRecordAvailableEmployeesResponse} from "@/types/payload.ts";

interface RecordsEmployeeFormPageProps {
    onEmployeeSelect?: (employee: IEmployee) => void
    serviceId: number
    datetime: Date | null
}

const RecordsEmployeeFormPage: FC<RecordsEmployeeFormPageProps> = ({onEmployeeSelect, datetime, serviceId}) => {
    const dispatch = useAppDispatch()
    const [employees, setEmployees] = useState<IEmployee[]>([])

    useEffect(() => {
        if (datetime) {
            dispatch(getRecordAvailableEmployees({
                serviceId: serviceId,
                datetime: datetime
            })).then((res) => {
                const response = res.payload as IGetRecordAvailableEmployeesResponse
                if (Array.isArray(response.employees)) {
                    setEmployees(response.employees)
                }
            })
        }
    }, [datetime, dispatch, serviceId]);

    const handleOnClickItem = (employee: IEmployee) => {
        if (onEmployeeSelect) {
            onEmployeeSelect(employee);
        }
    }

    return (
        <div className={c.block}>
            <div className={c.list}>
                <List
                    itemLayout={'vertical'}
                    dataSource={employees}
                    renderItem={(e) => {
                        return (
                            <List.Item onClick={() => handleOnClickItem(e)}>
                                <Card classNames={{body: c['card-body']}} hoverable size={'small'} bordered={false}>
                                    <div className={c.info}>
                                        <Meta title={e.fullName}/>
                                        <Meta description={`${e.description.slice(0, 25)}...`}/>
                                    </div>

                                    <figure className={c.icon}>
                                        <SelectOutlined/>
                                    </figure>
                                </Card>
                            </List.Item>
                        )
                    }}
                />
            </div>
        </div>
    );
};

export default RecordsEmployeeFormPage;
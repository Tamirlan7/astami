import React, {FC, useEffect, useState} from 'react';
import c from './RecordsEmployeeFormPage.module.scss'
import {IEmployee} from "@/types/model.ts";
import {Card, Divider, List, Space} from "antd";
import Meta from "antd/es/card/Meta";
import {SelectOutlined} from "@ant-design/icons";
import {getRecordAvailableEmployees} from "@thunks/recordThunk.ts";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import {IGetRecordAvailableEmployeesResponse} from "@/types/payload.ts";
import AuthorizedImage from "@ui/AuthorizedImage/AuthorizedImage.tsx";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {useParams} from "react-router-dom";
import Title from "@ui/Title/Title.tsx";

interface RecordsEmployeeFormPageProps {
    onEmployeeSelect?: (employee: IEmployee) => void
    serviceId: number
    datetime: Date | null
}

const RecordsEmployeeFormPage: FC<RecordsEmployeeFormPageProps> = ({onEmployeeSelect, datetime, serviceId}) => {
    const dispatch = useAppDispatch()
    const {currentCompany} = useAppSelector(state => state.company)
    const [employees, setEmployees] = useState<IEmployee[]>([])
    const {companyId, branchId} = useParams()

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

    const getEmployeeImage = (employee: IEmployee) => {
        if (companyId && branchId && employee.image?.name) {
            return BackendEndpoints.GET_EMPLOYEES_FILE
                .replace(':employeeId', employee.id.toString())
                .replace(':companyId', companyId)
                .replace(':branchId', branchId)
                .replace(':fileName', employee.image.name)
        }

        return ''
    }

    return (
        <div className={c.block}>
            <div className={c.container}>
                <div className={c.header}>
                    <Title style={{marginBottom: 5}}>Онлайн Запись</Title>
                    {currentCompany && (
                        <div className={c.title}>
                            <h2>{currentCompany.title}</h2>
                            <h3><strong>({currentCompany.currentBranch.title})</strong></h3>
                        </div>
                    )}
                    <p>Выберите специалиста:</p>
                </div>

                <Divider/>

                <div className={c.list}>
                    <List
                        itemLayout={'vertical'}
                        dataSource={employees}
                        renderItem={(e) => {
                            return (
                                <List.Item onClick={() => handleOnClickItem(e)}>
                                    <Card classNames={{body: c['card-body']}} hoverable size={'small'} bordered={false}>
                                        <div className={c.image}>
                                            <AuthorizedImage preview={false} shape={'circle'}
                                                             path={getEmployeeImage(e)}/>
                                        </div>
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
        </div>
    );
};

export default RecordsEmployeeFormPage;
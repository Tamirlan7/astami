import React, {Dispatch, FC, SetStateAction, useEffect, useMemo, useState} from 'react';
import c from './EmployeeDetailsModal.module.scss'
import {Avatar, Button, Card, Descriptions, Divider, Empty, List, Modal, Popconfirm, Skeleton, Tag} from "antd";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {IEmployee} from "@/types/model.ts";
import Meta from "antd/es/card/Meta";
import DescriptionsItem from "antd/es/descriptions/Item";
import WeekdaysUtils from "@utils/WeekdaysUtils.ts";
import IntroduceTitle from "@ui/IntroduceTitle/IntroduceTitle.tsx";
import {deleteEmployeeThunk, getEmployeeByIdThunk} from "@thunks/employeeThunk.ts";
import {RoutePaths} from "@config/RoutePaths.ts";
import {useNavigate} from "react-router-dom";
import AuthorizedImage from "@ui/AuthorizedImage/AuthorizedImage.tsx";

interface EmployeeDetailsModalProps {
    visible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
    employee: IEmployee | null | undefined
}

const EmployeeDetailsModal: FC<EmployeeDetailsModalProps> = ({visible, setVisible, employee}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {currentCompany} = useAppSelector(state => state.company)
    const [descriptionModalVisible, setDescriptionModalVisible] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [servicesModal, setServicesModal] = useState(false)
    const {currentEmployee, lastRequest} = useAppSelector(state => state.employee)
    const avatarSrc = useMemo<string>(() => {
        if (!currentCompany || !employee) {
            return ''
        }

        return BackendEndpoints.GET_EMPLOYEES_FILE
            .replace(':companyId', currentCompany.id.toString())
            .replace(':branchId', currentCompany.currentBranch.id.toString())
            .replace(':employeeId', employee.id.toString())
            .replace(':fileName', employee.image?.name)
    }, [currentCompany, employee])
    const handleOnCancel = () => {
        setConfirmDelete(false)
        closeModal()
    }

    useEffect(() => {
        if (employee && currentCompany) {

            if (currentEmployee) {
                if (currentEmployee.id === employee.id) {
                    return;
                }
            }

            dispatch(getEmployeeByIdThunk({
                companyId: currentCompany.id,
                branchId: currentCompany.currentBranch.id,
                employeeId: employee.id,
            }))
        }
    }, [currentCompany, currentEmployee, dispatch, employee]);

    const handleOnGetServicesClick = () => {
        setServicesModal(true)
    }

    const handleOnEditClick = () => {
        if (currentCompany && employee) {
            navigate({
                pathname: RoutePaths.EMPLOYEES_EDIT_FORM
                    .replace(':companyId', currentCompany.id.toString())
                    .replace(':employeeId', employee.id.toString()),
            })
        }
    }

    const handleOnReadMoreDescription = () => {
        setDescriptionModalVisible(true)
    }

    const handleOnDeleteClick = () => {
        if (currentCompany && currentEmployee) {
            dispatch(deleteEmployeeThunk({
                employeeId: currentEmployee.id,
                branchId: currentCompany.currentBranch.id,
                companyId: currentCompany.id
            }))

            closeModal()
        }
    }

    const closeModal = () => {
        setVisible(false);
    }

    if (!employee) {
        return null
    }

    return (
        <Modal
            open={visible}
            onCancel={handleOnCancel}
            destroyOnClose
            okText={'Редактировать'}
            cancelText={'Закрыть'}
            footer={() => {
                return (
                    <div style={{gap: 12, display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Button onClick={handleOnCancel}>Закрыть</Button>
                        <Popconfirm
                            open={confirmDelete}
                            onCancel={() => setConfirmDelete(false)}
                            cancelText={'Нет'}
                            okText={'Да'}
                            onConfirm={handleOnDeleteClick}
                            title={'Вы точно хотите удалить сотрудника ?'}
                        >
                            <Button type={'primary'} danger onClick={() => setConfirmDelete(true)}>
                                Удалить
                            </Button>
                        </Popconfirm>
                        <Button type={'primary'} onClick={handleOnEditClick}>Редактировать</Button>
                    </div>
                )
            }}
            classNames={{
                content: c['modal-header']
            }}
            onOk={handleOnEditClick}
            closeIcon={null}
        >
            <div className={c.block}>
                <Card
                    classNames={{
                        body: c['card-body']
                    }}
                >
                    <AuthorizedImage
                        rootClassName={c.avatar}
                        shape={'circle'}
                        path={avatarSrc}
                    />

                    <Meta title={employee.fullName}></Meta>
                    <Meta style={{margin: '20px 0'}} description={employee.description.length > 100
                        ? (<div>{employee.description.slice(0, 100)}... <Button onClick={handleOnReadMoreDescription}
                                                                                type={'text'} size={'small'}>Читать
                            дальше</Button></div>)
                        : employee.description}></Meta>
                    <Descriptions column={1}>
                        <DescriptionsItem label={'Должность'}>{employee.jobTitle}</DescriptionsItem>
                        <DescriptionsItem label={'Возраст'}>{employee.age}</DescriptionsItem>
                        <DescriptionsItem
                            label={'Смена работы'}>{employee.workdayStartTime.slice(0, 5)} - {employee.workdayEndTime.slice(0, 5)}</DescriptionsItem>
                        <DescriptionsItem label={'Предоставляемые услуги'}>
                            <Button
                                onClick={handleOnGetServicesClick}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                type={'text'}
                                size={'small'}
                            >Посмотреть</Button>
                        </DescriptionsItem>
                        <DescriptionsItem contentStyle={{flexWrap: 'wrap', gap: 5}} label={'Рабочие дни'}>
                            {employee.workDays.map((day) => {
                                const color = WeekdaysUtils.getWeekdayColor(day);

                                return (
                                    <Tag color={color} key={day}>
                                        {WeekdaysUtils.convertToRu(day)}
                                    </Tag>
                                )
                            })}
                        </DescriptionsItem>

                    </Descriptions>

                </Card>
            </div>

            {/* Description Modal */}
            <Modal
                open={descriptionModalVisible}
                onCancel={() => setDescriptionModalVisible(false)}
                cancelText={'Закрыть'}
                okButtonProps={{
                    style: {display: 'none'}
                }}
            >
                <IntroduceTitle title={'Описание'} description={'Описание сотрудника'} specialText={employee.fullName}/>
                <Divider/>
                <div>{employee.description}</div>
            </Modal>

            {/* Services Modal */}
            <Modal
                open={servicesModal}
                onCancel={() => setServicesModal(false)}
                cancelText={'Закрыть'}
                closeIcon={null}
                okButtonProps={{
                    style: {
                        display: 'none',
                    }
                }}
            >
                <div className={c['services-list']}>
                    <List
                        locale={{
                            emptyText: <Empty description={'Сотрудник не предоставляет никаких услуг'}/>,
                        }}
                        loading={lastRequest.isPending}
                        dataSource={currentEmployee?.assignedServices}
                        rowKey={'id'}
                        renderItem={(service) => {
                            return (
                                <List.Item>{service.title}</List.Item>
                            )
                        }}
                    />
                </div>
            </Modal>
        </Modal>
    );
};

export default EmployeeDetailsModal;
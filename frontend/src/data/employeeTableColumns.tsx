import {IEmployee} from "@/types/model.ts";
import {ColumnType} from "antd/es/table";
import AuthorizedImage from "@ui/AuthorizedImage/AuthorizedImage.tsx";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import Icon from "@ui/Icon/Icon.tsx";
import OptionsDots from '@assets/icons/options-dots.svg?react';
import {Avatar, Tag} from "antd";
import WeekdaysUtils from "@utils/WeekdaysUtils.ts";

const employeeTableColumns: ColumnType<IEmployee>[] = [
    {
        title: '',
        key: 'image',
        dataIndex: 'image',
        width: 40,
        render: (_, record, __) => {
            if (!record.image) {
                return <Avatar shape={'square'}/>
            }

            return (
                <AuthorizedImage
                    path={
                        BackendEndpoints.GET_EMPLOYEES_FILE
                            .replace(':branchId', record.branchId.toString())
                            .replace(':employeeId', record.id.toString())
                            .replace(':fileName', record.image?.name)
                    }
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
        title: 'Смена работы',
        dataIndex: 'jobChange',
        key: 'jobChange',
        render: (_, record, __) => {
            const startTime: string = record.workdayStartTime.slice(0, 5);
            const endTime: string = record.workdayEndTime.slice(0, 5);

            return (
                <div>{startTime} - {endTime}</div>
            )
        }
    },
    {
        title: 'Дни работы',
        dataIndex: 'workDays',
        key: 'workDays',
        render: (_, record, __) => {

            return (
                <div>
                    {record.workDays.slice(0, 3).map((day) => {
                        const color = WeekdaysUtils.getWeekdayColor(day);

                        return (
                            <Tag color={color} key={day}>
                                {WeekdaysUtils.convertToRu(day)}
                            </Tag>
                        );
                    })}
                    {record.workDays.length > 3 && '...'}
                </div>
            )
        }
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
                <Icon pointerEnabled width={20} height={20}>
                    <OptionsDots/>
                </Icon>
            )
        },
    },
]

export default employeeTableColumns;
import {IEmployee, Weekdays} from "@/types/model.ts";
import {ColumnType} from "antd/es/table";
import Img from "@ui/Img/Img.tsx";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import Icon from "@ui/Icon/Icon.tsx";
import OptionsDots from '@assets/icons/options-dots.svg?react';
import {Tag} from "antd";
import type {LiteralUnion} from "antd/es/_util/type";
import type {PresetColorType, PresetStatusColorType} from "antd/es/_util/colors";
import WeekdayConverter from "@utils/WeekdayConverter.ts";

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
                        let color: LiteralUnion<PresetColorType | PresetStatusColorType>;

                        switch (day) {
                            case Weekdays.MONDAY:
                                color = 'gold'
                                break
                            case Weekdays.TUESDAY:
                                color = 'red'
                                break
                            case Weekdays.WEDNESDAY:
                                color = 'geekblue'
                                break
                            case Weekdays.THURSDAY:
                                color = 'cyan'
                                break
                            case Weekdays.FRIDAY:
                                color = 'lime'
                                break
                            case Weekdays.SATURDAY:
                                color = 'volcano'
                                break
                            default:
                                color = 'purple'
                        }

                        return (
                            <Tag color={color} key={day}>
                                {WeekdayConverter.convertToRu(day)}
                            </Tag>
                        );
                    })}
                    ...
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
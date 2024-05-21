import {RoutePaths} from "@config/RoutePaths.ts";
import {ReactElement, ReactNode} from "react";
import RecordIcon from '@assets/icons/records.svg?react'
import ServiceIcon from '@assets/icons/service.svg?react'
import EmployeeIcon from '@assets/icons/employee.svg?react'
import CustomerIcon from '@assets/icons/customer.svg?react'
import {IControlPanelPage} from "@/types/types.ts";


const controlPanelPages: IControlPanelPage[] = [
    {
        id: 'records',
        title: 'Записи',
        path: RoutePaths.RECORDS,
        icon: <RecordIcon/>,
    },

    {
        id: 'customers',
        title: 'Клиенты',
        path: RoutePaths.CUSTOMERS,
        icon: <CustomerIcon/>,
    },
    {
        id: 'services',
        title: 'Услуги',
        path: RoutePaths.SERVICES,
        icon: <ServiceIcon/>,
    },
    {
        id: 'employees',
        title: 'Сотрудники',
        path: RoutePaths.EMPLOYEES,
        icon: <EmployeeIcon/>,
    },

]

export default controlPanelPages

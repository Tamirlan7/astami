import {RoutePaths} from "../config/RoutePaths.ts";
import {IRoute} from "@/types/types.ts";
import LoginPage from "../pages/LoginPage/LoginPage.tsx";
import RegisterPage from "../pages/RegisterPage/RegisterPage.tsx";
import CompaniesPage from "../pages/CompaniesPage/CompaniesPage.tsx";
import {Role} from "@/types/model.ts";
import AuthHeader from "@components/AuthHeader/AuthHeader.tsx";
import CompaniesFormPage from "@pages/CompaniesFormPage/CompaniesFormPage.tsx";
import DashboardPage from "@pages/DashboardPage/DashboardPage.tsx";
import BranchFormPage from "@pages/BranchFormPage/BranchFormPage.tsx";
import RecordsPage from "@pages/RecordsPage/RecordsPage.tsx";
import EmployeesPage from "@pages/EmployeesPage/EmployeesPage.tsx";
import ServicesPage from "@pages/ServicesPage/ServicesPage.tsx";
import CustomersPage from "@pages/CustomersPage/CustomersPage.tsx";
import EmployeesFormPage from "@pages/EmployeesFormPage/EmployeesFormPage.tsx";
import ServicesFormPage from "@pages/ServicesFormPage/ServicesFormPage.tsx";
import RecordsIntroduceFormPage from "@pages/RecordsIntroduceFormPage/RecordsIntroduceFormPage.tsx";
import RecordsFormPage from "@pages/RecordsFormPage/RecordsFormPage.tsx";

/* For authenticated users */
export const protectedRoutes: IRoute[] = [
    {
        path: RoutePaths.COMPANIES,
        component: <CompaniesPage/>,
        enabledRoles: [
            Role.ROLE_ENTREPRENEUR,
            Role.ROLE_ADMIN,
        ],
        metaData: {
            footerEnabled: false,
            headerId: 'default',
        }
    },
    {
        path: RoutePaths.COMPANIES_FORM,
        component: <CompaniesFormPage/>,
        enabledRoles: [
            Role.ROLE_ENTREPRENEUR,
            Role.ROLE_ADMIN,
        ],
        metaData: {
            footerEnabled: false,
            headerId: 'default',
        }
    },
    {
        path: RoutePaths.RECORDS,
        component: <RecordsPage/>,
        enabledRoles: [
            Role.ROLE_ENTREPRENEUR,
            Role.ROLE_ADMIN,
        ],
        metaData: {
            footerEnabled: false,
            headerId: 'control-panel',
            fixed: true,
        }
    },
    {
        path: RoutePaths.RECORDS_INTRODUCE_FORM,
        component: <RecordsIntroduceFormPage/>,
        enabledRoles: [
            Role.ROLE_ENTREPRENEUR,
            Role.ROLE_ADMIN,
        ],
        metaData: {
            footerEnabled: false,
            headerId: 'default',
        }
    },
    {
        path: RoutePaths.RECORDS_FORM,
        component: <RecordsFormPage/>,
        enabledRoles: [
            Role.ROLE_ENTREPRENEUR,
            Role.ROLE_ADMIN,
        ],
        metaData: {
            footerEnabled: false,
            headerId: 'default',
        }
    },
    {
        path: RoutePaths.EMPLOYEES,
        component: <EmployeesPage/>,
        enabledRoles: [
            Role.ROLE_ENTREPRENEUR,
            Role.ROLE_ADMIN,
        ],
        metaData: {
            footerEnabled: false,
            headerId: 'control-panel',
            fixed: true,
        }
    },
    {
        path: RoutePaths.SERVICES,
        component: <ServicesPage/>,
        enabledRoles: [
            Role.ROLE_ENTREPRENEUR,
            Role.ROLE_ADMIN,
        ],
        metaData: {
            footerEnabled: false,
            headerId: 'control-panel',
            fixed: true,
        }
    },
    {
        path: RoutePaths.CUSTOMERS,
        component: <CustomersPage/>,
        enabledRoles: [
            Role.ROLE_ENTREPRENEUR,
            Role.ROLE_ADMIN,
        ],
        metaData: {
            footerEnabled: false,
            headerId: 'control-panel',
            fixed: true,
        }
    },
    {
        path: RoutePaths.BRANCH_FORM,
        component: <BranchFormPage/>,
        enabledRoles: [
            Role.ROLE_ENTREPRENEUR,
            Role.ROLE_ADMIN,
        ],
        metaData: {
            footerEnabled: false,
            headerId: 'default',
        }
    },
    {
        path: RoutePaths.EMPLOYEES_FORM,
        component: <EmployeesFormPage/>,
        enabledRoles: [
            Role.ROLE_ENTREPRENEUR,
            Role.ROLE_ADMIN,
        ],
        metaData: {
            footerEnabled: false,
            headerId: 'control-panel',
            fixed: true,
        }
    },
    {
        path: RoutePaths.EMPLOYEES_EDIT_FORM,
        component: <EmployeesFormPage/>,
        enabledRoles: [
            Role.ROLE_ENTREPRENEUR,
            Role.ROLE_ADMIN,
        ],
        metaData: {
            footerEnabled: false,
            headerId: 'control-panel',
            fixed: true,
        }
    },
]

/* These routes can be accessed whether a user is authenticated or not */
export const publicRoutes: IRoute[] = [];

/* For unauthenticated users */
export const unauthenticatedRoutes: IRoute[] = [
    {
        path: RoutePaths.LOGIN,
        component: <LoginPage/>,
        metaData: {
            footerEnabled: false,
            headerId: 'auth',
        }
    },
    {
        path: RoutePaths.REGISTER,
        component: <RegisterPage/>,
        metaData: {
            footerEnabled: false,
            headerId: 'auth',
        }
    },
];

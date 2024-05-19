import {RoutePaths} from "../config/RoutePaths.ts";
import {IRoute} from "@/types/types.ts";
import LoginPage from "../pages/LoginPage/LoginPage.tsx";
import RegisterPage from "../pages/RegisterPage/RegisterPage.tsx";
import CompaniesPage from "../pages/CompaniesPage/CompaniesPage.tsx";
import {Role} from "@/types/model.ts";
import AuthHeader from "@components/AuthHeader/AuthHeader.tsx";
import CompaniesFormPage from "@pages/CompaniesFormPage/CompaniesFormPage.tsx";

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
            customHeader: <AuthHeader/>,
        }
    },
    {
        path: RoutePaths.REGISTER,
        component: <RegisterPage/>,
        metaData: {
            footerEnabled: false,
            customHeader: <AuthHeader/>,
        }
    },
];

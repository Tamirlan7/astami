import { RoutePaths } from "../config/RoutePaths.ts";
import { IRoute } from "../types/types.ts";
import LoginPage from "../pages/LoginPage/LoginPage.tsx";
import RegisterPage from "../pages/RegisterPage/RegisterPage.tsx";
import CompaniesPage from "../pages/CompaniesPage/CompaniesPage.tsx";

/* For authenticated users */
export const protectedRoutes: IRoute[] = [
    {
        path: RoutePaths.COMPANIES,
        component: <CompaniesPage/>,
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
            headerEnabled: false,
            footerEnabled: false
        }
    },
    {
        path: RoutePaths.REGISTER,
        component: <RegisterPage/>,
        metaData: {
            headerEnabled: false,
            footerEnabled: false
        }
    },
];

import {Route, Routes} from 'react-router-dom';
import {protectedRoutes, publicRoutes, unauthenticatedRoutes} from './routes';
import AppRoute from "./AppRoute.js";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import JwtValidationRoute from "./JwtValidationRoute";
import UnauthenticatedRoute from "@router/UnauthenticatedRoute.tsx";


const Router = () => {

    return (
        <Routes>
            {protectedRoutes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <JwtValidationRoute>
                            <ProtectedRoute enabledRoles={route.enabledRoles}>
                                <AppRoute metaData={route.metaData}>
                                    {route.component}
                                </AppRoute>
                            </ProtectedRoute>
                        </JwtValidationRoute>
                    }
                />
            ))}

            {publicRoutes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <>
                            <AppRoute metaData={route.metaData}>
                                {route.component}
                            </AppRoute>
                        </>
                    }
                />
            ))}

            {unauthenticatedRoutes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <UnauthenticatedRoute>
                            <AppRoute metaData={route.metaData}>
                                {route.component}
                            </AppRoute>
                        </UnauthenticatedRoute>
                    }
                />
            ))}

            <Route
                path={'/*'}
                element={
                    <>
                        <AppRoute metaData={{
                            headerEnabled: false,
                            footerEnabled: false,
                        }}>
                            <NotFoundPage/>
                        </AppRoute>
                    </>
                }
            >

            </Route>
        </Routes>
    )
}

export default Router;

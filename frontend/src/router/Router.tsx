import {Route, Routes} from 'react-router-dom';
import {protectedRoutes, publicRoutes, unauthenticatedRoutes} from './routes';
import AppRoute from "./AppRoute.js";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import JwtValidationRoute from "./JwtValidationRoute";


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
                        <>
                            <AppRoute metaData={route.metaData}>
                                {route.component}
                            </AppRoute>
                        </>
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

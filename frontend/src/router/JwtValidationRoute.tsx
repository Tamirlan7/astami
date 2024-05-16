import {ReactNode} from "react";
import {TOKENS, UNAUTHENTICATED_ENTRY} from "../config/AppConstants.ts";
import {Navigate, useLocation} from "react-router-dom";
import {useAppSelector} from "../hooks/reduxHooks.ts";
import validateJwt from "../utils/validateJwt.ts";

interface JwtValidationRouteProps {
    children: ReactNode;
}

function JwtValidationRoute({children}: JwtValidationRouteProps) {
    const {pathname} = useLocation();
    // const dispatch = useAppDispatch();
    const {accessToken, refreshToken} = JSON.parse(localStorage.getItem(TOKENS) ?? '{}');
    const {isTokenRefreshing} = useAppSelector((state) => state.user);

    let isExpired = false;

    if (isTokenRefreshing) {
        // loader
    }

    if (accessToken) {
        if (validateJwt()) {
            console.log('s')
            return children;
        } else {
            isExpired = true;
        }
    }

    if (isExpired && refreshToken) {
        // refresh the tokens
        // dispatch(refreshTokenThunk({refreshToken}));
        // return <PageLoader/>;
    }

    if (!accessToken && !isExpired) {
        // in case if accessToken is expired unauthenticated
    }

    return (
        <Navigate
            to={UNAUTHENTICATED_ENTRY}
            state={{redirected: true, from: pathname, wasUnauthenticated: true}}
        />
    );
}

export default JwtValidationRoute;

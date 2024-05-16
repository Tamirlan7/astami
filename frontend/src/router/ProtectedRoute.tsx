import React, {ReactNode} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import useUserInitialization from "../hooks/useUserInitialization";
import {UNAUTHENTICATED_ENTRY} from "../config/AppConstants.ts";

interface ProtectedRouteProps {
    children: ReactNode;
    enabledRoles?: string[]; // Assuming roles are strings
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children, enabledRoles}) => {
    const {pathname} = useLocation();
    const {role, isLoading, isInitialized} = useUserInitialization();

    if (isLoading || !isInitialized) {
        // loader...
    }

    if (role && enabledRoles?.length) {
        const roleContains = enabledRoles.includes(role);

        if (roleContains) {
            return <>{children}</>;
        }
    }

    return <Navigate to={UNAUTHENTICATED_ENTRY} state={{redirected: true, from: pathname, wasUnauthenticated: true}}/>;
};

export default ProtectedRoute;

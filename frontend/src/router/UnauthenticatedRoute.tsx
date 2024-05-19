import React, {FC, PropsWithChildren} from 'react';
import {ITokens} from "@/types/types.ts";
import {AUTHENTICATED_ENTRY, TOKENS} from "@config/AppConstants.ts";
import {Navigate} from "react-router-dom";

interface UnauthenticatedRoute extends PropsWithChildren {

}

const UnauthenticatedRoute: FC<UnauthenticatedRoute> = ({children}) => {

    const {accessToken}: ITokens = JSON.parse(localStorage.getItem(TOKENS) ?? '{}')

    if (!accessToken) {
        return children;
    }

    return (
        <Navigate to={AUTHENTICATED_ENTRY} replace={true} />
    );
}

export default UnauthenticatedRoute;
import {ReactElement} from "react";
import {Role} from "./model.ts";

export interface ITokens {
    accessToken: string
    refreshToken: string
}

export interface ITokenPayload {
    id: string;
    issuedAt: number; // Assuming issuedAt is a string representation of Instant
    expiration: number; // Assuming expiration is a string representation of Instant
    tokenType: TokenType;
    role: string;
    userId: number;
}

export enum TokenType {
    ACCESS_TOKEN = "ACCESS_TOKEN",
    REFRESH_TOKEN = "REFRESH_TOKEN",
}

export interface IRouteMetaData {
    headerEnabled?: boolean
    footerEnabled?: boolean
}

export interface IRoute {
    path: string
    component: ReactElement
    metaData?: IRouteMetaData
    enabledRoles?: Role[]
}

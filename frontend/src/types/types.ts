import {ReactElement, ReactNode} from "react";
import {Role} from "./model.ts";
import {RoutePaths} from "@config/RoutePaths.ts";
import {HeaderId} from "@config/Headers.tsx";

export interface ITokens {
    accessToken: string
    refreshToken: string
}

export interface IControlPanelPage {
    id: string
    title: string
    path: RoutePaths
    icon: ReactElement
}


export interface ITokenPayload {
    jti: string;
    iat: number;
    exp: number;
    tokenType: string;
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
    headerId?: HeaderId,
    fixed?: boolean
}

export interface IRoute {
    path: string
    component: ReactElement
    metaData?: IRouteMetaData
    enabledRoles?: Role[]
}

export interface IPropertyValid {
    isInvalid: boolean
    message?: string
}

export interface IFormValid {
    [key: string]: IPropertyValid[]
}

export interface IRequest {
    isPending: boolean
    success: boolean | null
    path: string | null
    error: IResponseError
    method: HttpMethod | null
}

export enum HttpMethod {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export interface IResponseError {
    caught: boolean
    message: string | null
    status: number
}

export interface IPopupNotification {
    description: string;
    message: string;
    placement: string;
    type: PopupNotificationType;
}

export type PopupNotificationType = 'error' | 'info' | 'success' | 'warning' | 'open' | 'destroy'

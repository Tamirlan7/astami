import {ReactElement} from "react";
import AuthHeader from "@components/AuthHeader/AuthHeader.tsx";
import ControlPanelHeader from "@components/ControlPanelHeader/ControlPanelHeader.tsx";
import Header from "@components/Header/Header.tsx";

export type HeaderId = 'auth' | 'default' | 'control-panel'

export interface IHeader {
    element: ReactElement
    isDefault?: boolean /* only one header can be default */
}

export type IHeaders = {
    [key in HeaderId]: IHeader
}

const headers: IHeaders = {
    'auth': {
        element: <AuthHeader />,
    },
    'default': {
        element: <Header />
    },
    'control-panel': {
        element: <ControlPanelHeader />,
        isDefault: true,
    },
}

const defaultHeaderTuple: [string, IHeader] = Object.entries(headers).find(([key, value]) => value.isDefault) as [string, IHeader]
export const defaultHeader: IHeader = defaultHeaderTuple[1]
export {headers}

// import useInitialize from "../hooks/useInitialize.js";
import {FC, PropsWithChildren, useEffect} from "react";
import {IRouteMetaData, PopupNotificationType} from "@/types/types.ts";
import {notification as notificationApi} from "antd";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import {resetPopupNotification} from "@slices/popupNotificationSlice.ts";
import {ArgsProps} from "antd/es/notification";
import {NotificationPlacement} from "antd/es/notification/interface";
import {defaultHeader, headers, IHeader} from "@config/Headers.tsx";

interface IAppRouteProps extends PropsWithChildren {
    metaData?: IRouteMetaData
}

const AppRoute: FC<IAppRouteProps> = ({metaData, children}) => {
    // useInitialize()
    const dispatch = useAppDispatch()
    const [api, contextHolder] = notificationApi.useNotification();
    const {popupNotification} = useAppSelector(state => state.popupNotification)

    useEffect(() => {
        if (popupNotification.message && popupNotification.description && popupNotification.placement && popupNotification.type) {
            showNotification({
                placement: popupNotification.placement as NotificationPlacement,
                message: popupNotification.message,
                description: popupNotification.description,
            }, popupNotification.type)

            dispatch(resetPopupNotification())
        }

        function showNotification(notificationArgs: ArgsProps, type: PopupNotificationType = 'info') {
            switch (type) {
                case 'info':
                    api.info(notificationArgs)
                    break
                case 'error':
                    api.error(notificationArgs)
                    break
                case 'success':
                    api.success(notificationArgs)
                    break
                case 'warning':
                    api.warning(notificationArgs)
                    break
                case 'open':
                    api.open(notificationArgs)
                    break
                case 'destroy':
                    /* destroy is not implemented !!! */
                    break;
                default:
                    api.info(notificationArgs)
            }
        }

    }, [api, dispatch, popupNotification]);

    metaData = {
        headerEnabled: metaData?.headerEnabled ?? true,
        footerEnabled: metaData?.footerEnabled ?? true,
        ...metaData
    }

    /*
        You can configure this in routes.tsx.
        When you register your route, you can pass metadata with headerId,
        which will be later looked up in the headers config.
        If it is undefined in the config, the default header will be used.
    */
    const customHeader: IHeader | null = metaData?.headerId ? headers[metaData.headerId] : null;

    return (
        <>
            <div>
                {metaData.headerEnabled && (
                    <header>
                        {customHeader ? (
                            customHeader.element
                        ) : (
                            defaultHeader.element
                        )}
                    </header>
                )}

                <main>
                    {children}
                </main>

                {metaData.footerEnabled && (
                    <footer>
                    </footer>
                )}
            </div>

            {contextHolder}
        </>
    )
}

export default AppRoute

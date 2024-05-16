// import useInitialize from "../hooks/useInitialize.js";
import Header from "../components/Header/Header.js";
import {FC, PropsWithChildren} from "react";
import {IRouteMetaData} from "../types/types.ts";

interface IAppRouteProps extends PropsWithChildren {
    metaData?: IRouteMetaData
}

const AppRoute: FC<IAppRouteProps> = ({metaData, children}) => {
    // useInitialize()

    metaData = {
        headerEnabled: metaData?.headerEnabled ?? true,
        footerEnabled: metaData?.footerEnabled ?? true,
    }

    return (
        <>
            <div>
                {metaData.headerEnabled && (
                    <header>
                        <Header />
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
        </>
    )
}

export default AppRoute

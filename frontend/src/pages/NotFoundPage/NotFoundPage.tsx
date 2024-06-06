import c from './NotFoundPage.module.scss'
import {Result} from "antd";
import React from "react";
import Button from "@ui/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {RoutePaths} from "@config/RoutePaths.ts";

function NotFoundPage() {
    const navigate = useNavigate();

    const handleOnBack = () => {
        navigate(RoutePaths.COMPANIES)
    }

    return (
        <div className={c.block}>
            <Result
                className={c.result}
                status="404"
                title="404"
                subTitle="Извините, страница, которую вы посетили, не существует."
                extra={<Button onClick={handleOnBack}>Назад</Button>}
            />
        </div>
    );
}

export default NotFoundPage;
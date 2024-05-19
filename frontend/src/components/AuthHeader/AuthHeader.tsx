import c from './AuthHeader.module.scss'
import Container from "@components/Container/Container.tsx";
import {NavLink, useLocation} from "react-router-dom";
import {RoutePaths} from "@config/RoutePaths.ts";
import Logo from "@ui/Logo/Logo.tsx";

function AuthHeader() {
    const {pathname} = useLocation()
    const linkText = pathname === RoutePaths.LOGIN ? 'Регистрация' : 'Войти';
    const link = pathname === RoutePaths.LOGIN ? RoutePaths.REGISTER : RoutePaths.LOGIN;

    return (
        <div className={c.block}>
            <Container>
                <div className={c.inner}>

                    <Logo />

                    {linkText && (
                        <div className={c.right}>
                            <NavLink className={c.link} to={link}>
                                {linkText}
                            </NavLink>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AuthHeader;

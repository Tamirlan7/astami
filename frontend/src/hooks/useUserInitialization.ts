import { useState, useEffect } from 'react';
import {
    updateUser
} from '../slices/userSlice';
import extractJwtPayload from '../utils/extractJwtPayload';
import {TOKENS} from "../config/AppConstants.ts";
import {ITokens} from "../types/types.ts";
import RoleConverter from "../utils/RoleConverter.ts";
import {useAppDispatch, useAppSelector} from "./reduxHooks.ts";

const useUserInitialization = () => {
    const dispatch = useAppDispatch();
    const [role, setRole] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const { isLoading } = useAppSelector((state) => state.user);

    useEffect(() => {
        const initializeUser = () => {
            let authenticatedRequired = true;
            const tokens: ITokens | null = JSON.parse(localStorage.getItem(TOKENS) ?? '{}');

            if (tokens?.accessToken) {
                const payload = extractJwtPayload(tokens.accessToken);

                if (payload?.role) {
                    setRole(payload.role);
                    dispatch(updateUser({
                        role: RoleConverter.convertToEnumFormat(payload.role),
                    }));

                    authenticatedRequired = false;
                }

                if (payload?.userId) {
                    dispatch(updateUser({
                        id: payload.userId,
                    }));
                }
            }


            if (authenticatedRequired) {
                // authentication required
            }

            setIsInitialized(true);
        };

        if (!isInitialized) {
            initializeUser();
        }
    }, [dispatch, isInitialized]);

    return { role, isLoading, isInitialized };
};

export default useUserInitialization;
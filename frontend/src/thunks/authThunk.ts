import {createAsyncThunk} from "@reduxjs/toolkit";
import {ILoginRequest, IRefreshRequest, IRegisterRequest} from "../types/payload.ts";
import AuthService from "../services/authService.ts";
import {raisePopupNotification} from "@slices/popupNotificationSlice.ts";
import axios from "axios";
import {TOKENS} from "@config/AppConstants.ts";

export const loginThunk = createAsyncThunk(
    'auth/loginThunk',
    async (body: ILoginRequest, {dispatch, rejectWithValue}) => {
        try {
            const {data, status} = await AuthService.login(body);
            localStorage.setItem(TOKENS, JSON.stringify(data))

            if (status >= 200 && status < 300) {
                dispatch(raisePopupNotification({
                    message: 'Сообщение',
                    description: 'Вы успешно авторизовались!',
                    type: 'success',
                }))
            }
            return data;
        } catch (err) {
            let errorMessage = 'Ошибка';
            let errorDescription = 'Неизвестная ошибка';

            if (axios.isAxiosError(err)) {
                errorMessage = 'Ошибка';
                if (err.code === 'ERR_NETWORK') {
                    errorDescription = 'Не удалось соединиться с сервером'
                } else {
                    errorDescription = err.response?.data.message || 'Произошла ошибка при авторизации';
                }

            } else if (err instanceof Error) {
                errorDescription = err.message;
            }
            dispatch(raisePopupNotification({
                message: errorMessage,
                description: errorDescription,
                type: 'error'
            }));

            return rejectWithValue(err);
        }
    }
)

export const registerThunk = createAsyncThunk(
    'auth/registerThunk',
    async (body: IRegisterRequest, {dispatch, rejectWithValue}) => {
        try {
            const {data, status} = await AuthService.register(body);
            localStorage.setItem(TOKENS, JSON.stringify(data))

            if (status >= 200 && status < 300) {
                dispatch(raisePopupNotification({
                    message: 'Сообщение',
                    description: 'Регистрация прошла успешно, Добро пожаловать!',
                    type: 'success',
                }))
            }
            return data;
        } catch (err) {
            let errorMessage = 'Ошибка';
            let errorDescription = 'Неизвестная ошибка';

            if (axios.isAxiosError(err)) {
                errorMessage = 'Ошибка';
                if (err.code === 'ERR_NETWORK') {
                    errorDescription = 'Не удалось соединиться с сервером'
                } else {
                    errorDescription = err.response?.data.message || 'Произошла ошибка при регистрации';
                }
            } else if (err instanceof Error) {
                errorDescription = err.message;
            }

            dispatch(raisePopupNotification({
                message: errorMessage,
                description: errorDescription,
                type: 'error'
            }));

            return rejectWithValue(err);
        }
    }
)

export const refreshThunk = createAsyncThunk(
    'auth/refreshThunk',
    async (body: IRefreshRequest, {rejectWithValue}) => {
        try {
            const {data} = await AuthService.refreshToken(body);
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

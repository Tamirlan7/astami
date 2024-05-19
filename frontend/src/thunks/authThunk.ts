import {createAsyncThunk} from "@reduxjs/toolkit";
import {ILoginRequest, IRefreshRequest, IRegisterRequest} from "../types/payload.ts";
import AuthService from "../services/authService.ts";
import {raisePopupNotification} from "@slices/popupNotificationSlice.ts";
import axios from "axios";

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (body: ILoginRequest, {dispatch, rejectWithValue}) => {
        try {
            const {data} = await AuthService.login(body);
            return data;
        } catch (err) {
            let errorMessage = 'Неизвестная ошибка';
            let errorDescription = '';

            if (axios.isAxiosError(err)) {
                errorMessage = 'Ошибка при авторизации';
                errorDescription = err.response?.data.message || '';
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
    'auth/register',
    async (body: IRegisterRequest, {dispatch, rejectWithValue}) => {
        try {
            const {data} = await AuthService.register(body);
            return data;
        } catch (err) {
            let errorMessage = 'Неизвестная ошибка';
            let errorDescription = '';

            if (axios.isAxiosError(err)) {
                errorMessage = 'Ошибка при авторизации';
                errorDescription = err.response?.data.message || '';
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
    'auth/refresh',
    async (body: IRefreshRequest, {rejectWithValue}) => {
        try {
            const {data} = await AuthService.refreshToken(body);
            return data;
        } catch (err) {
            rejectWithValue(err);
        }
    }
)

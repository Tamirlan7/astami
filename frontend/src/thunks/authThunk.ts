import {createAsyncThunk} from "@reduxjs/toolkit";
import {ILoginRequest, IRefreshRequest, IRegisterRequest} from "../types/payload.ts";
import AuthService from "../services/authService.ts";

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (body: ILoginRequest, {rejectWithValue}) => {
        try {
            const {data, status} = await AuthService.login(body);

            if (status >= 400) {
                rejectWithValue(data);
                return;
            }

            return data;
        } catch (err) {
            rejectWithValue(err);
        }
    }
)

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (body: IRegisterRequest, {rejectWithValue}) => {
        try {
            const {data, status} = await AuthService.register(body);

            if (status >= 400) {
                rejectWithValue(data);
                return;
            }

            return data;
        } catch (err) {
            rejectWithValue(err);
        }
    }
)

export const refreshThunk = createAsyncThunk(
    'auth/refresh',
    async (body: IRefreshRequest, {rejectWithValue}) => {
        try {
            const {data, status} = await AuthService.refreshToken(body);

            if (status >= 400) {
                rejectWithValue(data);
                return;
            }

            return data;
        } catch (err) {
            rejectWithValue(err);
        }
    }
)

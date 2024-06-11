import {createAsyncThunk} from "@reduxjs/toolkit";
import {IGetCustomersRequest} from "@/types/payload.ts";
import {raisePopupNotification} from "@slices/popupNotificationSlice.ts";
import axios from "axios";
import CustomerService from "@services/customerService.ts";

export const getCustomersThunk = createAsyncThunk(
    'customer/getCustomersThunk',
    async (body: IGetCustomersRequest, {dispatch, rejectWithValue}) => {
        try {
            const {data} = await CustomerService.getCustomers(body);
            return data;
        } catch (err) {
            let errorMessage = 'Ошибка';
            let errorDescription = 'Неизвестная ошибка';

            if (axios.isAxiosError(err)) {
                errorMessage = 'Ошибка';
                if (err.code === 'ERR_NETWORK') {
                    errorDescription = 'Не удалось соединиться с сервером'
                } else {
                    errorDescription = err.response?.data.message || 'Ошибка при получении списка клиентов';
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

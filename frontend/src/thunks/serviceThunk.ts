import {createAsyncThunk} from "@reduxjs/toolkit";
import {IGetServicesRequest} from "@/types/payload.ts";
import axios from "axios";
import {raisePopupNotification} from "@slices/popupNotificationSlice.ts";
import ServiceService from "@services/serviceService.ts";

export const getServicesThunk = createAsyncThunk(
    'service/getServicesThunk',
    async (body: IGetServicesRequest, {dispatch, rejectWithValue}) => {
        try {
            const {data} = await ServiceService.getServices(body);
            return data;
        } catch (err) {
            let errorMessage = 'Ошибка';
            let errorDescription = 'Неизвестная ошибка';

            if (axios.isAxiosError(err)) {
                errorMessage = 'Ошибка';
                if (err.code === 'ERR_NETWORK') {
                    errorDescription = 'Не удалось соединиться с сервером'
                } else {
                    errorDescription = err.response?.data.message || 'Ошибка при получении списка услуг';
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

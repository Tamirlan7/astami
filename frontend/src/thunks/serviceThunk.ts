import {createAsyncThunk} from "@reduxjs/toolkit";
import {ICreateServiceRequest, IGetEmployeeByIdRequest, IGetServicesRequest} from "@/types/payload.ts";
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

export const createServiceThunk = createAsyncThunk(
    'company/createServiceThunk',
    async (body: ICreateServiceRequest, {dispatch, rejectWithValue}) => {
        try {
            const {data, status} = await ServiceService.createService(body);
            if (status >= 200 && status < 300) {
                dispatch(raisePopupNotification({
                    message: 'Сообщение',
                    description: 'Сервис был успешно добавлен!',
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
                    errorDescription = err.response?.data.message || 'Ошибка при попытке добавления сервиса';
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


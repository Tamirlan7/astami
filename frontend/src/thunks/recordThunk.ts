import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {raisePopupNotification} from "@slices/popupNotificationSlice.ts";
import {
    ICreateRecordRequest, IGetRecordAvailableEmployeesRequest,
    IGetRecordFreeTimesRequest, IGetRecordsRequest
} from "@/types/payload.ts";
import RecordService from "@services/recordService.ts";

export const getRecordsThunk = createAsyncThunk(
    'record/getRecords',
    async (body: IGetRecordsRequest, {dispatch, rejectWithValue}) => {
        try {
            const {data} = await RecordService.getRecords(body);
            return data;
        } catch (err) {
            let errorMessage = 'Ошибка';
            let errorDescription = 'Неизвестная ошибка';

            if (axios.isAxiosError(err)) {
                errorMessage = 'Ошибка';
                if (err.code === 'ERR_NETWORK') {
                    errorDescription = 'Не удалось соединиться с сервером'
                } else {
                    errorDescription = err.response?.data.message || 'Ошибка при получении списка записей';
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

export const createRecordThunk = createAsyncThunk(
    'record/createRecordThunk',
    async (body: ICreateRecordRequest, {dispatch, rejectWithValue}) => {
        try {
            const {data, status} = await RecordService.createRecord(body);
            if (status >= 200 && status < 300) {
                dispatch(raisePopupNotification({
                    message: 'Сообщение',
                    description: 'Вы успешно записались!',
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
                    errorDescription = err.response?.data.message || 'Ошибка при попытке записать на услугу';
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

export const getRecordFreeTimes = createAsyncThunk(
    'record/getRecordFreeTimes',
    async (body: IGetRecordFreeTimesRequest, {dispatch, rejectWithValue}) => {
        try {
            const {data} = await RecordService.getRecordFreeTimes(body);
            return data;
        } catch (err) {
            let errorMessage = 'Ошибка';
            let errorDescription = 'Неизвестная ошибка';

            if (axios.isAxiosError(err)) {
                errorMessage = 'Ошибка';
                if (err.code === 'ERR_NETWORK') {
                    errorDescription = 'Не удалось соединиться с сервером'
                } else {
                    errorDescription = err.response?.data.message || 'Ошибка при получении списка свободных времен';
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

export const getRecordAvailableEmployees = createAsyncThunk(
    'record/getRecordAvailableEmployees',
    async (body: IGetRecordAvailableEmployeesRequest, {dispatch, rejectWithValue}) => {
        try {
            const {data} = await RecordService.getRecordAvailableEmployees(body);
            return data;
        } catch (err) {
            let errorMessage = 'Ошибка';
            let errorDescription = 'Неизвестная ошибка';

            if (axios.isAxiosError(err)) {
                errorMessage = 'Ошибка';
                if (err.code === 'ERR_NETWORK') {
                    errorDescription = 'Не удалось соединиться с сервером'
                } else {
                    errorDescription = err.response?.data.message || 'Ошибка при получении списка свободных сотрудников';
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

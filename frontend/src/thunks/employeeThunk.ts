import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {raisePopupNotification} from "@slices/popupNotificationSlice.ts";
import {ICreateEmployeeRequest, IGetEmployeesRequest} from "@/types/payload.ts";
import EmployeeService from "@services/employeeService.ts";

export const getEmployeesThunk = createAsyncThunk(
    'employee/getEmployeesThunk',
    async (body: IGetEmployeesRequest, {dispatch, rejectWithValue}) => {
        try {
            const {data} = await EmployeeService.getEmployees(body);
            return data;
        } catch (err) {
            let errorMessage = 'Ошибка';
            let errorDescription = 'Неизвестная ошибка';

            if (axios.isAxiosError(err)) {
                errorMessage = 'Ошибка';
                if (err.code === 'ERR_NETWORK') {
                    errorDescription = 'Не удалось соединиться с сервером'
                } else {
                    errorDescription = err.response?.data.message || 'Ошибка при получении списка сотрудников';
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

export const createEmployeeThunk = createAsyncThunk(
    'company/createEmployeeThunk',
    async (body: ICreateEmployeeRequest, {dispatch, rejectWithValue}) => {
        try {
            const {data, status} = await EmployeeService.createEmployee(body);
            if (status >= 200 && status < 300) {
                dispatch(raisePopupNotification({
                    message: 'Сообщение',
                    description: 'Компания была успешно добавлена в наш сервис!',
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
                    errorDescription = err.response?.data.message || 'Ошибка при попытке регистрации компании';
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

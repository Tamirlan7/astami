import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {raisePopupNotification} from "@slices/popupNotificationSlice.ts";
import {
    ICreateEmployeeRequest, IDeleteEmployeeRequest,
    IGetEmployeeByIdRequest,
    IGetEmployeesRequest,
    IUpdateEmployeeRequest
} from "@/types/payload.ts";
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
                    description: 'Сотрудник был успешно добавлен!',
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
                    errorDescription = err.response?.data.message || 'Ошибка при попытке добавления сотрудника';
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

export const updateEmployeeThunk = createAsyncThunk(
    'company/updateEmployeeThunk',
    async (body: IUpdateEmployeeRequest, {dispatch, rejectWithValue}) => {
        try {
            const {data, status} = await EmployeeService.updateEmployee(body);
            if (status >= 200 && status < 300) {
                dispatch(raisePopupNotification({
                    message: 'Сообщение',
                    description: 'Сотрудник был успешно редактирован!',
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
                    errorDescription = err.response?.data.message || 'Ошибка при попытке редактирования сотрудника';
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

export const deleteEmployeeThunk = createAsyncThunk(
    'company/deleteEmployeeThunk',
    async (body: IDeleteEmployeeRequest, {dispatch, rejectWithValue}) => {
        try {
            const {data, status} = await EmployeeService.deleteEmployee(body);
            if (status >= 200 && status < 300) {
                dispatch(raisePopupNotification({
                    message: 'Сообщение',
                    description: 'Сотрудник был успешно удален!',
                    type: 'success',
                }))
            }
            return {
                employeeId: body.employeeId
            };
        } catch (err) {
            let errorMessage = 'Ошибка';
            let errorDescription = 'Неизвестная ошибка';

            if (axios.isAxiosError(err)) {
                errorMessage = 'Ошибка';
                if (err.code === 'ERR_NETWORK') {
                    errorDescription = 'Не удалось соединиться с сервером'
                } else {
                    errorDescription = err.response?.data.message || 'Ошибка при попытке удаления сотрудника';
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


export const getEmployeeByIdThunk = createAsyncThunk(
    'employee/getEmployeeByIdThunk',
    async (body: IGetEmployeeByIdRequest, {dispatch, rejectWithValue}) => {
        try {
            const {data} = await EmployeeService.getEmployeeById(body);
            return data;
        } catch (err) {
            let errorMessage = 'Ошибка';
            let errorDescription = 'Неизвестная ошибка';

            if (axios.isAxiosError(err)) {
                errorMessage = 'Ошибка';
                if (err.code === 'ERR_NETWORK') {
                    errorDescription = 'Не удалось соединиться с сервером'
                } else {
                    errorDescription = err.response?.data.message || 'Ошибка при получении сотрудника по идентификатору';
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

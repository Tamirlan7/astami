import {createAsyncThunk} from "@reduxjs/toolkit";
import BranchService from "@services/branchService.ts";
import {ICreateBranchRequestWithCompanyId} from "@/types/payload.ts";
import {raisePopupNotification} from "@slices/popupNotificationSlice.ts";
import axios from "axios";

export const updateLastRequestedBranchThunk = createAsyncThunk(
    'auth/updateLastRequestedBranchThunk',
    async ({branchId, companyId}: { branchId: number; companyId: number }, {rejectWithValue}) => {
        try {
            await BranchService.updateLastRequestedBranch(companyId, branchId);
            return {
                branchId,
                companyId
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)


export const addBranchToCompanyThunk = createAsyncThunk(
    'auth/addBranchToCompanyThunk',
    async (body: ICreateBranchRequestWithCompanyId, {dispatch, rejectWithValue}) => {
        try {
            const {data, status} = await BranchService.addBranchToCompany(body);
            if (status >= 200 && status < 300) {
                dispatch(raisePopupNotification({
                    message: 'Сообщение',
                    description: 'Филиал успешно добавлен в компанию',
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
                    errorDescription = err.response?.data.message || 'Ошибка при добавлении филиала в компанию';
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

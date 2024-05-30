import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IEmployee} from "@/types/model.ts";
import {HttpMethod, IRequest} from "@/types/types.ts";
import {IGetEmployeesResponse, IPagination} from "@/types/payload.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {getEmployeesThunk} from "@thunks/employeeThunk.ts";

interface IState {
    employees: IEmployee[]
    pagination: IPagination
    lastRequest: IRequest
}

const initialState: IState = {
    employees: [],
    pagination: {
        isFirst: null,
        isLast: null,
        currentPage: null,
        size: 10,
        totalElements: null,
        totalPages: null,
    },
    lastRequest: {
        isPending: false,
        path: null,
        success: null,
        method: null,
        error: {
            caught: false,
            message: null,
            status: 0,
        }
    }
}

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
    },
    extraReducers: builder =>
        builder
            .addCase(getEmployeesThunk.pending, (state: IState) => {
                state.lastRequest.isPending = true
                state.lastRequest.path = BackendEndpoints.GET_EMPLOYEES
                state.lastRequest.method = HttpMethod.GET
            })
            .addCase(getEmployeesThunk.fulfilled, (state: IState, action: PayloadAction<IGetEmployeesResponse | undefined>) => {
                if (action.payload) {
                    const {
                        employees,
                        ...pagination
                    } = action.payload

                    state.employees = employees
                    state.pagination = pagination
                }

                state.lastRequest.isPending = false
                state.lastRequest.success = true
                state.lastRequest.error = {
                    caught: false,
                    message: null,
                    status: 0,
                }
            })
            .addCase(getEmployeesThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
                state.lastRequest.error.caught = true;
                state.lastRequest.isPending = false

                if (action.payload instanceof Error) {
                    const e = action.payload as Error;
                    state.lastRequest.error.message = e.message;
                } else if (typeof action.payload === 'object' && action.payload !== null) {
                    const e = action.payload as {
                        status?: number,
                        message?: string
                    };

                    state.lastRequest.error.message = e.message === undefined ? null : e.message;
                    state.lastRequest.error.status = e.status ?? 0;
                }
            })

})

export default employeeSlice.reducer

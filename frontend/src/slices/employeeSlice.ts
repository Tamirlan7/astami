import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IEmployee, IService} from "@/types/model.ts";
import {HttpMethod, IRequest} from "@/types/types.ts";
import {
    ICreateEmployeeResponse, IDeleteEmployeeResponse,
    IGetEmployeeByIdResponse,
    IGetEmployeesResponse,
    IPagination, IUpdateEmployeeRequest, IUpdateEmployeeResponse
} from "@/types/payload.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {
    createEmployeeThunk, deleteEmployeeThunk,
    getEmployeeByIdThunk,
    getEmployeesThunk,
    updateEmployeeThunk
} from "@thunks/employeeThunk.ts";

interface IState {
    employees: IEmployee[]
    pagination: IPagination
    lastRequest: IRequest
    currentEmployee: IEmployee & { assignedServices: IService[] } | null
}

const initialState: IState = {
    employees: [],
    currentEmployee: null,
    pagination: {
        first: null,
        last: null,
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
        clearLastRequest(state: IState) {
            state.lastRequest = {
                isPending: false,
                path: null,
                success: null,
                method: null,
                error: {
                    caught: false,
                    message: null,
                    status: 0
                },
            };
        }
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

            .addCase(createEmployeeThunk.pending, (state: IState) => {
                state.lastRequest.isPending = true
                state.lastRequest.path = BackendEndpoints.CREATE_EMPLOYEE
                state.lastRequest.method = HttpMethod.POST
            })
            .addCase(createEmployeeThunk.fulfilled, (state: IState, action: PayloadAction<ICreateEmployeeResponse | undefined>) => {
                if (action.payload) {
                    if (state.employees.length < 10) {
                        state.employees.push({
                            ...action.payload.employee,
                        })
                    }
                }

                state.lastRequest.isPending = false
                state.lastRequest.success = true
                state.lastRequest.error = {
                    caught: false,
                    message: null,
                    status: 0,
                }
            })
            .addCase(createEmployeeThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
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

            .addCase(updateEmployeeThunk.pending, (state: IState) => {
                state.lastRequest.isPending = true
                state.lastRequest.path = BackendEndpoints.UPDATE_EMPLOYEE_BY_ID
                state.lastRequest.method = HttpMethod.PUT
            })
            .addCase(updateEmployeeThunk.fulfilled, (state: IState, action: PayloadAction<IUpdateEmployeeResponse | undefined>) => {
                if (action.payload) {
                    if (state.employees.length < 10) {
                        state.employees = state.employees.map(e => {
                            if (e.id === action.payload?.employee.id) {
                                return action.payload.employee
                            }

                            return e
                        })

                        if (state.currentEmployee?.id === action.payload.employee.id) {
                            state.currentEmployee = {
                                ...action.payload.employee,
                                assignedServices: action.payload.assignedServices
                            }
                        }
                    }
                }

                state.lastRequest.isPending = false
                state.lastRequest.success = true
                state.lastRequest.error = {
                    caught: false,
                    message: null,
                    status: 0,
                }
            })
            .addCase(updateEmployeeThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
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

            .addCase(deleteEmployeeThunk.pending, (state: IState) => {
                state.lastRequest.isPending = true
                state.lastRequest.path = BackendEndpoints.DELETE_EMPLOYEE_BY_ID
                state.lastRequest.method = HttpMethod.DELETE
            })
            .addCase(deleteEmployeeThunk.fulfilled, (state: IState, action: PayloadAction<IDeleteEmployeeResponse | undefined>) => {
                if (action.payload) {
                    state.employees = state.employees.filter((e) => e.id !== action.payload?.employeeId)
                }

                state.lastRequest.isPending = false
                state.lastRequest.success = true
                state.lastRequest.error = {
                    caught: false,
                    message: null,
                    status: 0,
                }
            })
            .addCase(deleteEmployeeThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
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

            .addCase(getEmployeeByIdThunk.pending, (state: IState) => {
                state.lastRequest.isPending = true
                state.lastRequest.path = BackendEndpoints.GET_EMPLOYEE_BY_ID
                state.lastRequest.method = HttpMethod.GET
            })
            .addCase(getEmployeeByIdThunk.fulfilled, (state: IState, action: PayloadAction<IGetEmployeeByIdResponse | undefined>) => {
                if (action.payload) {
                    state.currentEmployee = {
                        ...action.payload.employee,
                        assignedServices: action.payload.assignedServices
                    }
                }

                state.lastRequest.isPending = false
                state.lastRequest.success = true
                state.lastRequest.error = {
                    caught: false,
                    message: null,
                    status: 0,
                }
            })
            .addCase(getEmployeeByIdThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
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

export const {clearLastRequest: clearEmployeeLastRequest} = employeeSlice.actions;
export default employeeSlice.reducer

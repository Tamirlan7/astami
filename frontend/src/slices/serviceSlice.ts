import {IService} from "@/types/model.ts";
import {IGetEmployeesResponse, IGetServicesResponse, IPagination} from "@/types/payload.ts";
import {HttpMethod, IRequest} from "@/types/types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getEmployeesThunk} from "@thunks/employeeThunk.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {getServicesThunk} from "@thunks/serviceThunk.ts";

interface IState {
    services: IService[]
    pagination: IPagination
    lastRequest: IRequest
}

const initialState: IState = {
    services: [],
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

const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getServicesThunk.pending, (state: IState) => {
                state.lastRequest.isPending = true
                state.lastRequest.path = BackendEndpoints.GET_SERVICES
                state.lastRequest.method = HttpMethod.GET
            })
            .addCase(getServicesThunk.fulfilled, (state: IState, action: PayloadAction<IGetServicesResponse | undefined>) => {
                if (action.payload) {
                    const {
                        services,
                        ...pagination
                    } = action.payload

                    state.services = services
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
            .addCase(getServicesThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
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

export default serviceSlice.reducer

import {IService} from "@/types/model.ts";
import {
    ICreateServiceResponse,
    IDeleteServiceResponse,
    IGetServicesResponse,
    IPagination,
    IUpdateServiceResponse
} from "@/types/payload.ts";
import {HttpMethod, IRequest} from "@/types/types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {createServiceThunk, deleteServiceThunk, getServicesThunk, updateServiceThunk} from "@thunks/serviceThunk.ts";

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


            .addCase(createServiceThunk.pending, (state: IState) => {
                state.lastRequest.isPending = true
                state.lastRequest.path = BackendEndpoints.CREATE_SERVICE
                state.lastRequest.method = HttpMethod.POST
            })
            .addCase(createServiceThunk.fulfilled, (state: IState, action: PayloadAction<ICreateServiceResponse | undefined>) => {
                if (action.payload) {
                    state.services.push({
                        ...action.payload.service
                    })
                }

                state.lastRequest.isPending = false
                state.lastRequest.success = true
                state.lastRequest.error = {
                    caught: false,
                    message: null,
                    status: 0,
                }
            })
            .addCase(createServiceThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
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


            .addCase(deleteServiceThunk.pending, (state: IState) => {
                state.lastRequest.isPending = true
                state.lastRequest.path = BackendEndpoints.DELETE_SERVICE_BY_ID
                state.lastRequest.method = HttpMethod.DELETE
            })
            .addCase(deleteServiceThunk.fulfilled, (state: IState, action: PayloadAction<IDeleteServiceResponse | undefined>) => {
                if (action.payload) {
                    state.services = state.services.filter(s => s.id !== action.payload?.serviceId)
                }

                state.lastRequest.isPending = false
                state.lastRequest.success = true
                state.lastRequest.error = {
                    caught: false,
                    message: null,
                    status: 0,
                }
            })
            .addCase(deleteServiceThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
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

            .addCase(updateServiceThunk.pending, (state: IState) => {
                state.lastRequest.isPending = true
                state.lastRequest.path = BackendEndpoints.DELETE_SERVICE_BY_ID
                state.lastRequest.method = HttpMethod.DELETE
            })
            .addCase(updateServiceThunk.fulfilled, (state: IState, action: PayloadAction<IUpdateServiceResponse | undefined>) => {
                if (action.payload) {
                    state.services = state.services.map(s => {
                        if (s.id === action.payload?.service.id) {
                            return action.payload.service
                        }

                        return s
                    })
                }

                state.lastRequest.isPending = false
                state.lastRequest.success = true
                state.lastRequest.error = {
                    caught: false,
                    message: null,
                    status: 0,
                }
            })
            .addCase(updateServiceThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
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
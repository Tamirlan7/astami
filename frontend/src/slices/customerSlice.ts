import {ICustomer} from "@/types/model.ts";
import {IGetCustomersResponse, IPagination} from "@/types/payload.ts";
import {HttpMethod, IRequest} from "@/types/types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {getCustomersThunk} from "@thunks/customerThunk.ts";

interface IState {
    customers: ICustomer[]
    pagination: IPagination
    lastRequest: IRequest
}

const initialState: IState = {
    customers: [],
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

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getCustomersThunk.pending, (state: IState) => {
                state.lastRequest.isPending = true
                state.lastRequest.path = BackendEndpoints.GET_CUSTOMERS
                state.lastRequest.method = HttpMethod.GET
            })
            .addCase(getCustomersThunk.fulfilled, (state: IState, action: PayloadAction<IGetCustomersResponse | undefined>) => {
                if (action.payload) {
                    const {
                        customers,
                        ...pagination
                    } = action.payload

                    state.customers = customers
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
            .addCase(getCustomersThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
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

export default customerSlice.reducer

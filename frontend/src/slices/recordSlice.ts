import {IRecord} from "@/types/model.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getRecordsThunk} from "@thunks/recordThunk.ts";
import {IGetRecordsResponse, IPagination} from "@/types/payload.ts";
import {HttpMethod, IRequest} from "@/types/types.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";

interface IState {
    records: IRecord[]
    lastRequest: IRequest
    pagination: IPagination
}

const initialState: IState = {
    records: [],
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

const recordSlice = createSlice({
    name: "record",
    initialState: initialState,
    reducers: {
    },
    extraReducers: builder =>
        builder
            .addCase(getRecordsThunk.pending, (state: IState) => {
                state.lastRequest.isPending = true
                state.lastRequest.path = BackendEndpoints.GET_RECORDS
                state.lastRequest.method = HttpMethod.GET
            })
            .addCase(getRecordsThunk.fulfilled, (state: IState, action: PayloadAction<IGetRecordsResponse | undefined>) => {
                if (action.payload) {
                    const {records, ...pagination} = action.payload
                    state.records = records

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
            .addCase(getRecordsThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
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

export default recordSlice.reducer

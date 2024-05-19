import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../types/model.ts";
import {loginThunk, refreshThunk, registerThunk} from "../thunks/authThunk.ts";
import {HttpMethod, IRequest, ITokens} from "@/types/types.ts";
import {TOKENS} from "../config/AppConstants.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";

interface IState {
    tokens: ITokens | null
    user: IUser | null,
    lastRequest: IRequest
}

const initialState: IState = {
    tokens: null,
    user: null,
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

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        updateUser(state: IState, action: PayloadAction<Partial<IUser>>) {
            Object.entries(action.payload).forEach(([key, value]) => {
                if (value) {
                    if (state.user == null) {
                        state.user = {} as IUser
                    }

                    state.user[key] = value;
                }
            });
        },
        clearTokens(state: IState) {
            state.tokens = null
        },
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
            .addCase(loginThunk.pending, (state: IState) => {
                state.lastRequest.isPending = true
                state.lastRequest.path = BackendEndpoints.LOGIN
                state.lastRequest.method = HttpMethod.POST
            })
            .addCase(loginThunk.fulfilled, (state: IState, action: PayloadAction<ITokens | undefined>) => {
                if (action.payload) {
                    state.tokens = action.payload;
                    localStorage.setItem(TOKENS, JSON.stringify(action.payload))
                }

                state.lastRequest.isPending = false
                state.lastRequest.success = true
                state.lastRequest.error = {
                    caught: false,
                    message: null,
                    status: 0,
                }
            })
            .addCase(loginThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
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

            .addCase(registerThunk.pending, (state: IState) => {
                state.lastRequest.isPending = true
                state.lastRequest.path = BackendEndpoints.REGISTER
                state.lastRequest.method = HttpMethod.POST
            })
            .addCase(registerThunk.fulfilled, (state: IState, action: PayloadAction<ITokens | undefined>) => {
                if (action.payload) {
                    state.tokens = action.payload;
                    localStorage.setItem(TOKENS, JSON.stringify(action.payload))
                }

                state.lastRequest.isPending = false
                state.lastRequest.success = true
                state.lastRequest.error = {
                    caught: false,
                    message: null,
                    status: 0,
                }
            })
            .addCase(registerThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
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


            .addCase(refreshThunk.pending, (state: IState) => {
                state.lastRequest.isPending = true
                state.lastRequest.path = BackendEndpoints.REFRESH
                state.lastRequest.method = HttpMethod.POST
            })
            .addCase(refreshThunk.fulfilled, (state: IState, action: PayloadAction<ITokens | undefined>) => {
                if (action.payload) {
                    state.tokens = action.payload;
                    localStorage.setItem(TOKENS, JSON.stringify(action.payload))
                }

                state.lastRequest.isPending = false
                state.lastRequest.success = true
                state.lastRequest.error = {
                    caught: false,
                    message: null,
                    status: 0,
                }

            })
            .addCase(refreshThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
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

export const {
    updateUser,
    clearTokens,
    clearLastRequest: clearUserLastRequest
} = userSlice.actions
export default userSlice.reducer;
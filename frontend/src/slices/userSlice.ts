import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../types/model.ts";
import {loginThunk, refreshThunk, registerThunk} from "../thunks/authThunk.ts";
import {ITokens} from "../types/types.ts";
import {TOKENS} from "../config/AppConstants.ts";

interface IState {
    tokens: ITokens | null
    user: IUser | null,
    isLoading: boolean,
    isTokenRefreshing: boolean
    error: {
        caught: boolean
        message: string
        statusCode: number
    }
}

const initialState: IState = {
    tokens: null,
    user: null,
    isTokenRefreshing: false,
    isLoading: false,
    error: {
        caught: false,
        message: '',
        statusCode: 0,
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
        }
    },
    extraReducers: builder =>
        builder
            .addCase(loginThunk.pending, (state: IState) => {
                state.isLoading = true;
            })
            .addCase(loginThunk.fulfilled, (state: IState, action: PayloadAction<ITokens | undefined>) => {
                if (action.payload) {
                    state.tokens = action.payload;
                    localStorage.setItem(TOKENS, JSON.stringify(action.payload))
                }

                // reset error block
                state.error.caught = false;
                state.error.message = '';
                state.error.statusCode = 0;

                state.isLoading = false;

            })
            .addCase(loginThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
                state.isLoading = false;
                state.error.caught = true;

                if (action.payload instanceof Error) {
                    const e = action.payload as Error;
                    state.error.message = e.message;
                } else if (typeof action.payload === 'object' && action.payload !== null) {
                    const e = action.payload as {
                        status?: number,
                        message?: string
                    };

                    state.error.message = e.message ?? '';
                    state.error.statusCode = e.status ?? 0;
                }
            })

            .addCase(registerThunk.pending, (state: IState) => {
                state.isLoading = true;
            })
            .addCase(registerThunk.fulfilled, (state: IState, action: PayloadAction<ITokens | undefined>) => {
                if (action.payload) {
                    state.tokens = action.payload;
                    localStorage.setItem(TOKENS, JSON.stringify(action.payload))
                }

                // reset error block
                state.error.caught = false;
                state.error.message = '';
                state.error.statusCode = 0;

                state.isLoading = false;

            })
            .addCase(registerThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
                state.isLoading = false;
                state.error.caught = true;

                if (action.payload instanceof Error) {
                    const e = action.payload as Error;
                    state.error.message = e.message;
                } else if (typeof action.payload === 'object' && action.payload !== null) {
                    const e = action.payload as {
                        status?: number,
                        message?: string
                    };

                    state.error.message = e.message ?? '';
                    state.error.statusCode = e.status ?? 0;
                }
            })


            .addCase(refreshThunk.pending, (state: IState) => {
                state.isLoading = true;
                state.isTokenRefreshing = true;
            })
            .addCase(refreshThunk.fulfilled, (state: IState, action: PayloadAction<ITokens | undefined>) => {
                if (action.payload) {
                    state.tokens = action.payload;
                    localStorage.setItem(TOKENS, JSON.stringify(action.payload))
                }

                // reset error block
                state.error.caught = false;
                state.error.message = '';
                state.error.statusCode = 0;

                state.isLoading = false;
                state.isTokenRefreshing = false;

            })
            .addCase(refreshThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
                state.isLoading = false;
                state.isTokenRefreshing = false;
                state.error.caught = true;

                if (action.payload instanceof Error) {
                    const e = action.payload as Error;
                    state.error.message = e.message;
                } else if (typeof action.payload === 'object' && action.payload !== null) {
                    const e = action.payload as {
                        status?: number,
                        message?: string
                    };

                    state.error.message = e.message ?? '';
                    state.error.statusCode = e.status ?? 0;
                }
            })
})

export const {updateUser} = userSlice.actions
export default userSlice.reducer;
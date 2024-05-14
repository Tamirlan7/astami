import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../types/model.ts";
import {loginThunk, refreshThunk, registerThunk} from "../thunks/authThunk.ts";
import {ITokens} from "../types/types.ts";
import {TOKENS} from "../config/appConstants.ts";

interface IState {
    tokens: ITokens
    user: IUser | null,
    isLoading: boolean
    error: {
        caught: boolean
        message: string
    }
}

const initialState: IState = {
    tokens: ITokens,
    user: null,
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
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(loginThunk.pending, (state: IState) => {
                state.isLoading = true;
            })
            .addCase(loginThunk.fulfilled, (state: IState, action: PayloadAction<ITokens>) => {
                state.tokens = action.payload;
                localStorage.setItem(TOKENS, action.payload)

                // reset error block
                state.error.caught = false;
                state.error.message = '';
                state.error.statusCode = 0;

                state.isLoading = false;

            })
            .addCase(loginThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
                state.isLoading = false;
                state.error.caught = true

                if (action.payload instanceof Error) {
                    const e = action.payload as Error
                    state.error.message = e.message;
                }

                if ('status' in action.payload || 'message' in action.payload) {
                    const e = action.payload as {
                        status?: number,
                        message?: string
                    }

                    state.error.message = e.message ?? '';
                    state.error.statusCode = e.status ?? 0;
                }
            })

            .addCase(registerThunk.pending, (state: IState) => {
                state.isLoading = true;
            })
            .addCase(registerThunk.fulfilled, (state: IState, action: PayloadAction<ITokens>) => {
                state.tokens = action.payload;
                localStorage.setItem(TOKENS, action.payload)

                // reset error block
                state.error.caught = false;
                state.error.message = '';
                state.error.statusCode = 0;

                state.isLoading = false;

            })
            .addCase(registerThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
                state.isLoading = false;
                state.error.caught = true

                if (action.payload instanceof Error) {
                    const e = action.payload as Error
                    state.error.message = e.message;
                }

                if ('status' in action.payload || 'message' in action.payload) {
                    const e = action.payload as {
                        status?: number,
                        message?: string
                    }

                    state.error.message = e.message ?? '';
                    state.error.statusCode = e.status ?? 0;
                }
            })


            .addCase(refreshThunk.pending, (state: IState) => {
                state.isLoading = true;
            })
            .addCase(refreshThunk.fulfilled, (state: IState, action: PayloadAction<ITokens>) => {
                state.tokens = action.payload;
                localStorage.setItem(TOKENS, action.payload)

                // reset error block
                state.error.caught = false;
                state.error.message = '';
                state.error.statusCode = 0;

                state.isLoading = false;

            })
            .addCase(refreshThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
                state.isLoading = false;
                state.error.caught = true

                if (action.payload instanceof Error) {
                    const e = action.payload as Error
                    state.error.message = e.message;
                }

                if ('status' in action.payload || 'message' in action.payload) {
                    const e = action.payload as {
                        status?: number,
                        message?: string
                    }

                    state.error.message = e.message ?? '';
                    state.error.statusCode = e.status ?? 0;
                }
            })
})


export default userSlice.reducer;
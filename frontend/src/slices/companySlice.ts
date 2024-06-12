import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBranch, ICompany} from "../types/model.ts";
import {createCompanyThunk, getCompanyByIdThunk, getUserCompaniesThunk} from "@thunks/companyThunk.ts";
import {
    ICreateBranchResponse,
    ICreateCompanyResponse,
    IGetCompanyResponse,
    IGetUserCompaniesResponse
} from "@/types/payload.ts";
import {HttpMethod, IRequest} from "@/types/types.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {addBranchToCompanyThunk, updateLastRequestedBranchThunk} from "@thunks/branchThunk.ts";
import axios from "axios";

interface IState {
    companies: ICompany[]
    lastRequest: IRequest
    currentCompany: ICompany | null
}

const initialState: IState = {
    companies: [],
    currentCompany: null,
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

const companySlice = createSlice({
    name: "company",
    initialState: initialState,
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
        },
        changeCurrentBranch(state: IState, action: PayloadAction<IBranch>) {
            if (state.currentCompany) {
                state.currentCompany.currentBranch = action.payload;
            }
        }
    },
    extraReducers: builder =>
        builder
            .addCase(createCompanyThunk.pending, (state: IState) => {
                state.lastRequest.isPending = true
                state.lastRequest.path = BackendEndpoints.CREATE_COMPANY
                state.lastRequest.method = HttpMethod.POST
            })
            .addCase(createCompanyThunk.fulfilled, (state: IState, action: PayloadAction<ICreateCompanyResponse | undefined>) => {
                if (action.payload) {
                    state.companies.push(action.payload.company)
                }

                state.lastRequest.isPending = false
                state.lastRequest.success = true
                state.lastRequest.error = {
                    caught: false,
                    message: null,
                    status: 0,
                }
            })
            .addCase(createCompanyThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
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


            .addCase(getUserCompaniesThunk.pending, (state: IState) => {
                state.lastRequest.isPending = true
                state.lastRequest.path = BackendEndpoints.GET_USER_COMPANIES
                state.lastRequest.method = HttpMethod.GET
            })
            .addCase(getUserCompaniesThunk.fulfilled, (state: IState, action: PayloadAction<IGetUserCompaniesResponse | undefined>) => {
                if (action.payload) {
                    state.companies = action.payload.companies
                }

                state.lastRequest.isPending = false
                state.lastRequest.success = true
                state.lastRequest.error = {
                    caught: false,
                    message: null,
                    status: 0,
                }
            })
            .addCase(getUserCompaniesThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
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


            .addCase(getCompanyByIdThunk.pending, (state: IState) => {
                state.lastRequest.isPending = true
                state.lastRequest.path = BackendEndpoints.GET_COMPANY_BY_ID
                state.lastRequest.method = HttpMethod.GET
            })
            .addCase(getCompanyByIdThunk.fulfilled, (state: IState, action: PayloadAction<IGetCompanyResponse | undefined>) => {
                if (action.payload) {
                    state.currentCompany = action.payload.company
                    state.currentCompany.currentBranch = action.payload.currentBranch
                }

                state.lastRequest.isPending = false
                state.lastRequest.success = true
                state.lastRequest.error = {
                    caught: false,
                    message: null,
                    status: 0,
                }
            })
            .addCase(getCompanyByIdThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
                state.lastRequest.error.caught = true;
                state.lastRequest.isPending = false

                if (axios.isAxiosError(action.payload)) {
                    if (action.payload.response) {
                        const {
                            message,
                            status
                        } = action.payload.response.data

                        state.lastRequest.error.message = message === undefined ? null : message;
                        state.lastRequest.error.status = status ?? 0;
                    }
                } else if (action.payload instanceof Error) {
                    const e = action.payload as Error;
                    state.lastRequest.error.message = e.message;
                }
            })


            .addCase(updateLastRequestedBranchThunk.pending, (state: IState) => {
                state.lastRequest.isPending = true
                state.lastRequest.path = BackendEndpoints.UPDATE_LAST_REQUESTED_BRANCH
                state.lastRequest.method = HttpMethod.PUT
            })
            .addCase(updateLastRequestedBranchThunk.fulfilled, (state: IState, action: PayloadAction<{
                branchId: number;
                companyId: number
            } | undefined>) => {
                if (action.payload) {
                    state.companies = state.companies.map(c => {
                        if (c.id === action.payload?.companyId) {
                            const branch: IBranch | undefined = c.branches.find(b => b.id === action.payload?.branchId)

                            if (branch) {
                                c.currentBranch = branch
                            }
                        }

                        return c;
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
            .addCase(updateLastRequestedBranchThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
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


            .addCase(addBranchToCompanyThunk.pending, (state: IState) => {
                state.lastRequest.isPending = true
                state.lastRequest.path = BackendEndpoints.ADD_BRANCH_TO_COMPANY
                state.lastRequest.method = HttpMethod.POST
            })
            .addCase(addBranchToCompanyThunk.fulfilled, (state: IState, action: PayloadAction<ICreateBranchResponse>) => {
                console.log(action.payload)
                if (action.payload?.branch) {

                    state.companies = state.companies.map(c => {
                        if (c.id === action.payload.branch.companyId) {
                            return {
                                ...c,
                                branches: [...c.branches, action.payload.branch]
                            }
                        }

                        return c;
                    })

                    if (state.currentCompany) {
                        state.currentCompany = {
                            ...state.currentCompany,
                            branches: [...state.currentCompany.branches, action.payload.branch]
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
            .addCase(addBranchToCompanyThunk.rejected, (state: IState, action: PayloadAction<unknown>) => {
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

export const {changeCurrentBranch} = companySlice.actions
export default companySlice.reducer;

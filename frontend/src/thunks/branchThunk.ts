import {createAsyncThunk} from "@reduxjs/toolkit";
import BranchService from "@services/branchService.ts";

export const updateLastRequestedBranchThunk = createAsyncThunk(
    'auth/updateLastRequestedBranchThunk',
    async ({branchId, companyId}: { branchId: number; companyId: number }, {rejectWithValue}) => {
        try {
            await BranchService.updateLastRequestedBranch(companyId, branchId);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

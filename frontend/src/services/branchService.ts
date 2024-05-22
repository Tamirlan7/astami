import client from "./client.ts";
import {AxiosResponse} from "axios";
import BackendEndpoints from "@config/BackendEndpoints.ts";

class BranchService {
    public static async updateLastRequestedBranch(companyId, branchId): Promise<AxiosResponse> {
        return await client.put(
            BackendEndpoints.UPDATE_LAST_REQUESTED_BRANCH
                .replace(':companyId', companyId)
                .replace(':branchId', branchId)
        )
    }
}

export default BranchService;

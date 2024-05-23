import client from "./client.ts";
import {AxiosResponse} from "axios";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {ICreateBranchRequest, ICreateBranchRequestWithCompanyId, ICreateBranchResponse} from "@/types/payload.ts";

class BranchService {
    public static async updateLastRequestedBranch(companyId, branchId): Promise<AxiosResponse> {
        return await client.put(
            BackendEndpoints.UPDATE_LAST_REQUESTED_BRANCH
                .replace(':companyId', companyId)
                .replace(':branchId', branchId)
        )
    }

    static async addBranchToCompany(body: ICreateBranchRequestWithCompanyId): Promise<AxiosResponse<ICreateBranchResponse>> {
        return await client.post(
            BackendEndpoints.ADD_BRANCH_TO_COMPANY
                .replace(':companyId', body.companyId.toString()),
            body
        )
    }
}

export default BranchService;

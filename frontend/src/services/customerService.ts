import {AxiosResponse} from "axios";
import client from "@services/client.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {IGetCustomersRequest, IGetCustomersResponse} from "@/types/payload.ts";

class CustomerService {
    static async getCustomers(body: IGetCustomersRequest): Promise<AxiosResponse<IGetCustomersResponse>> {
        return await client.get(
            BackendEndpoints.GET_CUSTOMERS
                .replace(':companyId', body.companyId.toString())
                .replace(':branchId', body.branchId.toString()),
            {
                params: {
                    'name': body.name
                }
            }
        )
    }
}

export default CustomerService;

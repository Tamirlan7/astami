import {
    IGetEmployeesRequest, IGetEmployeesResponse
} from "@/types/payload.ts";
import {AxiosResponse} from "axios";
import client from "@services/client.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";

class EmployeeService {
    public static async getEmployees(body: IGetEmployeesRequest): Promise<AxiosResponse<IGetEmployeesResponse>> {
        return await client.get(
            BackendEndpoints.GET_EMPLOYEES
                .replace(':companyId', body.companyId.toString())
                .replace(':branchId', body.branchId.toString()),
            {
                params: {
                    name: body.name
                }
            }
        )
    }
}

export default EmployeeService;


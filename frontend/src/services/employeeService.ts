import {
    ICreateEmployeeRequest, ICreateEmployeeResponse,
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
                    name: body.name,
                    page: body.page,
                    size: body.size,
                }
            }
        )
    }

    static async createEmployee(body: ICreateEmployeeRequest): Promise<AxiosResponse<ICreateEmployeeResponse>> {
        return await client.post(
            BackendEndpoints.CREATE_EMPLOYEE
                .replace(':companyId', body.companyId.toString())
                .replace(':branchId', body.branchId.toString()),
            body
        )
    }
}

export default EmployeeService;


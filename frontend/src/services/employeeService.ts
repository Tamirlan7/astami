import {
    ICreateEmployeeRequest,
    ICreateEmployeeResponse,
    IDeleteEmployeeRequest, IDeleteEmployeeResponse,
    IGetEmployeeByIdRequest,
    IGetEmployeeByIdResponse,
    IGetEmployeesRequest,
    IGetEmployeesResponse,
    IUpdateEmployeeRequest,
    IUpdateEmployeeResponse
} from "@/types/payload.ts";
import {AxiosResponse} from "axios";
import client from "@services/client.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import convertFromBase64ToBlob from "@utils/convertFromBase64ToBlob.ts";

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
        const formData = new FormData()

        formData.append('fullName', body.fullName)
        formData.append('age', body.age.toString())
        formData.append('jobTitle', body.jobTitle)
        formData.append('description', body.description)

        if (body.image instanceof Blob) {
            formData.append('image', body.image)
        }

        const assignedServicesIds: number[] = body.assignedServices.map(s => s.id)
        for (const id of assignedServicesIds) {
            formData.append('assignedServicesIds[]', id.toString())
        }

        formData.append('workdayStartTime', body.workdayStartTime)
        formData.append('workdayEndTime', body.workdayEndTime)

        for (const day of body.workDays) {
            formData.append('workDays[]', day)
        }


        return await client.post(
            BackendEndpoints.CREATE_EMPLOYEE
                .replace(':companyId', body.companyId.toString())
                .replace(':branchId', body.branchId.toString()),
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    }

    static async updateEmployee(body: IUpdateEmployeeRequest): Promise<AxiosResponse<IUpdateEmployeeResponse>> {
        const formData = new FormData()

        formData.append('fullName', body.fullName)
        formData.append('age', body.age.toString())
        formData.append('jobTitle', body.jobTitle)
        formData.append('description', body.description)

        if (body.image instanceof Blob) {
            formData.append('image', body.image)
        } else if (!body.image) {
            formData.append('deleteImage', true.toString())
        }


        const assignedServicesIds: number[] = body.assignedServices.map(s => s.id)
        for (const id of assignedServicesIds) {
            formData.append('assignedServicesIds[]', id.toString())
        }

        formData.append('workdayStartTime', body.workdayStartTime)
        formData.append('workdayEndTime', body.workdayEndTime)

        for (const day of body.workDays) {
            formData.append('workDays[]', day)
        }


        return await client.put(
            BackendEndpoints.UPDATE_EMPLOYEE_BY_ID
                .replace(':companyId', body.companyId.toString())
                .replace(':branchId', body.branchId.toString())
                .replace(':employeeId', body.employeeId.toString()),
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    }

    static async getEmployeeById(body: IGetEmployeeByIdRequest): Promise<AxiosResponse<IGetEmployeeByIdResponse>> {
        return await client.get(
            BackendEndpoints.GET_EMPLOYEE_BY_ID
                .replace(':companyId', body.companyId.toString())
                .replace(':branchId', body.branchId.toString())
                .replace(':employeeId', body.employeeId.toString())
        )
    }

    static async deleteEmployee(body: IDeleteEmployeeRequest): Promise<AxiosResponse<IDeleteEmployeeResponse>> {
        return await client.delete(
            BackendEndpoints.DELETE_EMPLOYEE_BY_ID
                .replace(':employeeId', body.employeeId.toString())
                .replace(':companyId', body.companyId.toString())
                .replace(':branchId', body.branchId.toString())
        )
    }
}

export default EmployeeService;


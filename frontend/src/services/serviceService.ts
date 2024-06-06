import {
    ICreateServiceRequest, ICreateServiceResponse, IDeleteServiceRequest, IDeleteServiceResponse,
    IGetServicesRequest, IGetServicesResponse, IUpdateServiceRequest, IUpdateServiceResponse
} from "@/types/payload.ts";
import {AxiosResponse} from "axios";
import client from "@services/client.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";

class ServiceService {
    public static async getServices(body: IGetServicesRequest): Promise<AxiosResponse<IGetServicesResponse>> {
        return await client.get(
            BackendEndpoints.GET_SERVICES
                .replace(':companyId', body.companyId.toString())
                .replace(':branchId', body.branchId.toString()),
            {
                params: {
                    title: body.title,
                    page: body.page,
                    size: body.size,
                }
            }
        )
    }

    static async createService(body: ICreateServiceRequest): Promise<AxiosResponse<ICreateServiceResponse>> {
        return await client.post(
            BackendEndpoints.CREATE_SERVICE
                .replace(':companyId', body.companyId.toString())
                .replace(':branchId', body.branchId.toString()),
            body,
        )
    }

    static async deleteService(body: IDeleteServiceRequest): Promise<AxiosResponse<IDeleteServiceResponse>> {
        return await client.delete(
            BackendEndpoints.DELETE_SERVICE_BY_ID
                .replace(':companyId', body.companyId.toString())
                .replace(':branchId', body.branchId.toString())
                .replace(':serviceId', body.serviceId.toString()),
        )
    }

    static async updateService(body: IUpdateServiceRequest): Promise<AxiosResponse<IUpdateServiceResponse>> {
        return await client.put(
            BackendEndpoints.UPDATE_SERVICE_BY_ID
                .replace(':companyId', body.companyId.toString())
                .replace(':branchId', body.branchId.toString())
                .replace(':serviceId', body.serviceId.toString()),
            body
        )
    }
}

export default ServiceService;


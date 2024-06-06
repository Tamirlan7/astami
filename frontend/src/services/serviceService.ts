import {
    ICreateServiceRequest, ICreateServiceResponse,
    IGetServicesRequest, IGetServicesResponse
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
}

export default ServiceService;


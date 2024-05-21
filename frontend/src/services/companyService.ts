import client from "./client.ts";
import {AxiosResponse} from "axios";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {
    ICreateCompanyRequest,
    ICreateCompanyResponse,
    IGetCompanyResponse,
    IGetUserCompaniesResponse
} from "@/types/payload.ts";

class CompanyService {
    public static async createCompany(body: ICreateCompanyRequest): Promise<AxiosResponse<ICreateCompanyResponse>> {
        return await client.post(BackendEndpoints.CREATE_COMPANY, body)
    }

    public static async getUserCompanies(): Promise<AxiosResponse<IGetUserCompaniesResponse>> {
        return await client.get(BackendEndpoints.GET_USER_COMPANIES)
    }

    static async getCompanyById(id: number) : Promise<AxiosResponse<IGetCompanyResponse>> {
        return await client
            .get(BackendEndpoints.GET_COMPANY_BY_ID.replace(':id', id.toString()))
    }
}

export default CompanyService;

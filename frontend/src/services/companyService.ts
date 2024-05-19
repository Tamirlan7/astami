import client from "./client.ts";
import {AxiosResponse} from "axios";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {ICreateCompanyRequest, ICreateCompanyResponse, IGetUserCompaniesResponse} from "@/types/payload.ts";

class CompanyService {
    public static createCompany(body: ICreateCompanyRequest): Promise<AxiosResponse<ICreateCompanyResponse>> {
        return client.post(BackendEndpoints.CREATE_COMPANY, body)
    }

    public static getUserCompanies(): Promise<AxiosResponse<IGetUserCompaniesResponse>> {
        return client.get(BackendEndpoints.GET_USER_COMPANIES)
    }
}

export default CompanyService;

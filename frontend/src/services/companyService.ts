import client from "./client.ts";
import {ICreateCompanyRequest} from "../types/payload.ts";

const companyService = {}

companyService.createCompany = (body: ICreateCompanyRequest) => {
    return client.post('/company', body);
}

export default companyService;
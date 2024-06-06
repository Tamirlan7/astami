import {
    ICreateRecordRequest,
    ICreateRecordRequestBody, ICreateRecordResponse,
    IGetRecordAvailableEmployeesRequest, IGetRecordAvailableEmployeesResponse,
    IGetRecordFreeTimesRequest, IGetRecordFreeTimesResponse, IGetRecordsRequest, IGetRecordsResponse,
} from "@/types/payload.ts";
import {AxiosResponse} from "axios";
import client from "@services/client.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import extractDateStrFromDate from "@utils/extractDateStrFromDate.ts";
import toLocalISOString from "@utils/toLocalISOString.ts";

class RecordService {
    public static async getRecordFreeTimes(body: IGetRecordFreeTimesRequest): Promise<AxiosResponse<IGetRecordFreeTimesResponse>> {
        return await client.get(
            BackendEndpoints.GET_RECORD_FREE_TIMES
                .replace(':serviceId', body.serviceId.toString()),
            {
                params: {
                    'date': extractDateStrFromDate(body.date),
                }
            }
        )
    }

    static async getRecordAvailableEmployees(body: IGetRecordAvailableEmployeesRequest): Promise<AxiosResponse<IGetRecordAvailableEmployeesResponse>> {
        return await client.get(
            BackendEndpoints.GET_RECORD_AVAILABLE_EMPLOYEES,
            {
                params: {
                    'datetime': toLocalISOString(body.datetime),
                    'serviceId': body.serviceId,
                }
            }
        )
    }

    static async createRecord(body: ICreateRecordRequest): Promise<AxiosResponse<ICreateRecordResponse>> {
        return await client.post(
            BackendEndpoints.CREATE_RECORD
                .replace(':companyId', body.companyId.toString())
                .replace(':branchId', body.branchId.toString()),
            {
                ...body,
                datetime: toLocalISOString(body.datetime as Date),
            },
        )
    }

    static async getRecords(body: IGetRecordsRequest): Promise<AxiosResponse<IGetRecordsResponse>> {
        return await client.get(
            BackendEndpoints.GET_RECORDS
                .replace(':companyId', body.companyId.toString())
                .replace(':branchId', body.branchId.toString())
        )
    }
}

export default RecordService;

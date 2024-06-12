import {
    ICreateRecordRequest,
    ICreateRecordResponse,
    IGetRecordAvailableEmployeesRequest, IGetRecordAvailableEmployeesResponse,
    IGetRecordFreeTimesRequest, IGetRecordFreeTimesResponse, IGetRecordsRequest, IGetRecordsResponse,
} from "@/types/payload.ts";
import {AxiosResponse} from "axios";
import client from "@services/client.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import extractDateStrFromDate from "@utils/extractDateStrFromDate.ts";
import toLocalISOString from "@utils/toLocalISOString.ts";
import guest from "@services/guest.ts";
import formatDate from "@utils/formatDate.ts";

class RecordService {
    public static async getRecordFreeTimes(body: IGetRecordFreeTimesRequest): Promise<AxiosResponse<IGetRecordFreeTimesResponse>> {
        return await guest.get(
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
        return await guest.get(
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
        return await guest.post(
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
        const date = body.date ?? new Date()

        return await client.get(
            BackendEndpoints.GET_RECORDS
                .replace(':companyId', body.companyId.toString())
                .replace(':branchId', body.branchId.toString())
            ,
            {
                params: {
                    page: body.page,
                    size: body.size,
                    date: formatDate(date),
                }
            }
        )
    }
}

export default RecordService;

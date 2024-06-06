import {Gender, IBranch, ICompany, IEmployee, IFile, IService, Weekdays} from "./model.ts";
import {UploadFile} from "antd";

export interface ILoginRequest {
    email: string
    phone: string
    password: string
}

export interface IRefreshRequest {
    refreshToken: string
}

export interface IRegisterRequest {
    email: string
    phone: string
    password: string
    gender: Gender
    firstName: string
    lastName: string
    birthDate: Date
}

export interface ICreateCompanyRequest {
    title: string // size, max = 100
    branches?: ICreateBranchRequest[]
}

export interface ICreateCompanyResponse {
    company: ICompany
}

export interface IGetCompanyResponse {
    company: ICompany
    currentBranch: IBranch
}

export interface ICreateBranchRequest {
    title: string
    country: string
    city: string
}

export interface ICreateBranchRequestWithCompanyId extends ICreateBranchRequest {
    companyId: number
}

export interface ICreateBranchResponse {
    branch: IBranch
}

export interface IGetEmployeesRequest extends IPaginationIncludedRequest {
    branchId: number
    companyId: number
    name?: string
}

export interface IPagination {
    isLast: boolean | null
    isFirst: boolean | null
    currentPage: number | null
    totalElements: number | null
    totalPages: number | null
    size: number | null
}

export interface IGetEmployeesResponse extends IPaginationIncludedResponse {
    employees: IEmployee[]
}

export interface IPaginationIncludedResponse {
    isLast: boolean
    isFirst: boolean
    currentPage: number
    totalElements: number
    totalPages: number
    size: number
}

export interface IGetBranchResponse {
    branch: IBranch
}

export interface ICreateEmployeeRequest extends ICreateEmployeeRequestBody {
    companyId: number
    branchId: number
}

export interface IUpdateEmployeeRequest extends ICreateEmployeeRequest {
    employeeId: number
}

export interface IUpdateEmployeeResponse extends ICreateEmployeeResponse {
    assignedServices: IService[]
}

export interface ICreateEmployeeRequestBody {
    fullName: string
    description: string
    image: Blob | null | IFile
    jobTitle: string
    age: number
    workDays: Weekdays[]
    assignedServices: AssignedService[]
    workdayStartTime: string
    workdayEndTime: string
}

export type AssignedService = (Pick<IService, 'id'> & Pick<IService, 'title'>)

export interface ICreateEmployeeResponse {
    employee: IEmployee
}

export interface GetEmployeeResponse {
    employee: IEmployee
}

export interface ICreateServiceResponse {
    service: IService
}

export interface ICreateServiceRequest extends ICreateServiceRequestBody {
    companyId: number
    branchId: number
}

export interface ICreateServiceRequestBody {
    title: string
    description: string
    price: number
    duration: number
}

export interface IGetEmployeeByIdRequest {
    companyId: number
    branchId: number
    employeeId: number
}

export interface IGetEmployeeByIdResponse {
    employee: IEmployee
    assignedServices: IService[]
}

export interface AddServiceResponse {
    service: IService
}

export interface GetServiceResponse {
    service: IService
}

export interface IGetServicesResponse extends IPaginationIncludedResponse {
    services: IService[]
}

export interface IPaginationIncludedRequest {
    page?: number
    size?: number
}

export interface IGetServicesRequest extends IPaginationIncludedRequest {
    branchId: number
    companyId: number
    title?: string
}

export interface IGetUserCompaniesResponse {
    companies: ICompany[]
}

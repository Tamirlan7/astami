import {Gender, IBranch, ICompany, IEmployee, IService} from "./model.ts";

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

export interface ICreateEmployeeRequestBody {
    fullName: string
    description: string
    image: string
    jobTitle: string
    age: number | null
}

export interface ICreateEmployeeResponse {
    employee: IEmployee
}

export interface GetEmployeeResponse {
    employee: IEmployee
}

export interface AddServiceRequest {
    title: string
    description: string
    price: number
    duration: string
    availableFrom: Date
    availableTo: Date
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

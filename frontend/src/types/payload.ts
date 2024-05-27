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

export interface IGetEmployeesRequest {
    branchId: number
    companyId: number
    name?: string
    page?: number
    size?: number
}

export interface IPagination {
    isLast: boolean | null
    isFirst: boolean | null
    currentPage: number | null
    totalElements: number | null
    totalPages: number | null
    size: number | null
}

export interface IGetEmployeesResponse {
    employees: IEmployee[]
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

export interface AddEmployeeRequest {
    fullName: string
    description: string
    image: File
}

export interface AddEmployeeResponse {
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

export interface IGetUserCompaniesResponse {
    companies: ICompany[]
}

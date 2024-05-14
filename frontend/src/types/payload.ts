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
}

export interface ICreateCompanyResponse {
    company: ICompany
}

export interface IGetCompanyResponse {
    company: ICompany
}

export interface ICreateBranchRequest {
    title: string
    country: string
    city: string
}

export interface ICreateBranchResponse {
    branch: IBranch
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

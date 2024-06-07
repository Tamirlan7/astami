export interface ICompany {
    id: number
    title: string
    userId: number
    branches: IBranch[]
    currentBranch: IBranch
}

export interface IBranch {
    id: number
    title: string
    country: string
    city: string
    companyId: number
}

export interface ICustomer {
    phone: string
    email?: string
    name: string
}

export interface IEmployee {
    id: number
    age: number
    fullName: string
    description: string
    image: IFile
    jobTitle: string
    services: number[] // services ids
    branchId: number
    workdayStartTime: string
    workdayEndTime: string
    workDays: string[]
}

export interface IService {
    id: number
    title: string
    description: string
    price: number
    duration: number
    availableFrom: Date
    availableTo: Date
    employees: IEmployee[]
    branchId: number
}

export interface IRecord {
    id: number
    customer: ICustomer
    datetime: string
    service: IService
    employee: IEmployee
}

export interface IFile {
    id: number
    path: string
    name: string
    type: string
}

export interface IUser {
    id: number
    email: string
    phone: string
    role: Role
    firstName: string
    lastName: string
    gender: Gender
    birthDate: Date
    createdAt: Date
    updatedAt: Date

    [key: string]: unknown
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export enum Weekdays {
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY",
}

export enum Role {
    ROLE_ADMIN = "ROLE_ADMIN",
    ROLE_ENTREPRENEUR = "ROLE_ENTREPRENEUR",
}
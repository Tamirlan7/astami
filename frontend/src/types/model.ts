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
    employees: IEmployee[]
    services: IService[]
}

export interface IEmployee {
    id: number
    fullName: string
    description: string
    image: IFile
    services: number[] // services ids
    branchId: number
}

export interface IService {
    id: number
    title: string
    description: string
    price: number
    duration: string
    availableFrom: Date
    availableTo: Date
    employees: IEmployee[]
    branchId: number
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

export enum Role {
    ROLE_ADMIN= "ROLE_ADMIN",
    ROLE_ENTREPRENEUR = "ROLE_ENTREPRENEUR",
}
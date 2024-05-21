export enum RoutePaths {
    LOGIN = "/login",
    REGISTER = '/register',
    COMPANIES = '/companies',
    RECORDS = '/company/:companyId/branch/:branchId/records',
    SERVICES = '/company/:companyId/branch/:branchId/services',
    EMPLOYEES = '/company/:companyId/branch/:branchId/employees',
    CUSTOMERS = '/company/:companyId/branch/:branchId/customers',
    COMPANIES_FORM = '/companies/form',
    BRANCH_FORM = '/branch/form',
}

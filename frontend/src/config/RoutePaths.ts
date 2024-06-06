export enum RoutePaths {
    LOGIN = "/login",
    REGISTER = '/register',
    COMPANIES = '/companies',
    RECORDS = '/company/:companyId/records',
    SERVICES = '/company/:companyId/services',
    EMPLOYEES = '/company/:companyId/employees',
    CUSTOMERS = '/company/:companyId/customers',
    COMPANIES_FORM = '/companies/form',
    BRANCH_FORM = '/branch/form',
    EMPLOYEES_FORM = '/company/:companyId/settings/employee/form',
    EMPLOYEES_EDIT_FORM = '/company/:companyId/settings/employee/:employeeId/edit/form',
}

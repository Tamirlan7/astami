class BackendEndpoints {
    static LOGIN = '/auth/login';
    static REGISTER = '/auth/register';
    static REFRESH = '/auth/refresh';
    static CREATE_COMPANY = '/company';
    static GET_USER_COMPANIES = '/company';
    static GET_COMPANY_BY_ID = '/company/:id';
    static UPDATE_LAST_REQUESTED_BRANCH = '/company/:companyId/branch/:branchId/last-requested-branch';
    static ADD_BRANCH_TO_COMPANY = '/company/:companyId/branch';
    static GET_EMPLOYEES = '/company/:companyId/branch/:branchId/employee';
    static GET_EMPLOYEES_FILE = '/company/:companyId/branch/:branchId/employee/:employeeId/file/:fileName';
    static CREATE_EMPLOYEE = '/company/:companyId/branch/:branchId/employee';
    static GET_SERVICES = '/company/:companyId/branch/:branchId/service';
}

export default BackendEndpoints;

class BackendEndpoints {
    public static LOGIN = '/auth/login';
    public static REGISTER = '/auth/register';
    public static REFRESH = '/auth/refresh';
    public static CREATE_COMPANY = '/company';
    public static GET_USER_COMPANIES = '/company';
    static GET_COMPANY_BY_ID = '/company/:id';
    static UPDATE_LAST_REQUESTED_BRANCH = '/company/:companyId/branch/:branchId/last-requested-branch';
    static ADD_BRANCH_TO_COMPANY = '/company/:companyId/branch';
}

export default BackendEndpoints;

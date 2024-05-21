class BackendEndpoints {
    public static LOGIN = '/auth/login';
    public static REGISTER = '/auth/register';
    public static REFRESH = '/auth/refresh';
    public static CREATE_COMPANY = '/company';
    public static GET_USER_COMPANIES = '/company';
    static GET_COMPANY_BY_ID = '/company/:id';
}

export default BackendEndpoints;

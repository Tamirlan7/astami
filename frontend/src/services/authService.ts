import {ILoginRequest, IRefreshRequest, IRegisterRequest} from "@/types/payload.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import guest from "./guest.ts";
import {ITokens} from "@/types/types.ts";
import {AxiosResponse} from 'axios'

class AuthService {
    public static async login(body: ILoginRequest): Promise<AxiosResponse<ITokens>> {
        return await guest.post(BackendEndpoints.LOGIN, body)
    }

    public static async register(body: IRegisterRequest): Promise<AxiosResponse<ITokens>> {
        return await guest.post(BackendEndpoints.REGISTER, body)
    }

    public static async refreshToken(body: IRefreshRequest): Promise<AxiosResponse<ITokens>> {
        return await guest.post(BackendEndpoints.REFRESH, body)
    }
}

export default AuthService;
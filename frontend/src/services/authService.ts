import {ILoginRequest, IRefreshRequest, IRegisterRequest} from "@/types/payload.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import guest from "./guest.ts";
import {ITokens} from "@/types/types.ts";
import {AxiosResponse} from 'axios'

class AuthService {
    public static login(body: ILoginRequest): Promise<AxiosResponse<ITokens>> {
        return guest.post(BackendEndpoints.LOGIN, body)
    }

    public static register(body: IRegisterRequest): Promise<AxiosResponse<ITokens>> {
        return guest.post(BackendEndpoints.REGISTER, body)
    }

    public static refreshToken(body: IRefreshRequest): Promise<AxiosResponse<ITokens>> {
        return guest.post(BackendEndpoints.REFRESH, body)
    }
}

export default AuthService;
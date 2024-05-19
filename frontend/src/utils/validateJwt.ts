import extractJwtPayload from "./extractJwtPayload";
import {TOKENS} from "../config/AppConstants.ts";
import {ITokenPayload, ITokens} from "@/types/types.ts";

export default function validateJwt(): boolean {
    const {accessToken}: ITokens = JSON.parse(localStorage.getItem(TOKENS) ?? '{}')


    if (accessToken) {
        const payload: ITokenPayload | null = extractJwtPayload(accessToken);

        if (payload?.exp) {
            // check expiration of the accessToken

            const expInMs: number = payload.exp * 1000;
            const now: number = Date.now();
            return now < expInMs;
        }
    }


    return false;
}

import extractJwtPayload from "./extractJwtPayload";
import {TOKENS} from "../config/AppConstants.ts";
import {ITokenPayload} from "../types/types.ts";

export default function validateJwt(): boolean {
    const tokens: { accessToken?: string } | null = JSON.parse(localStorage.getItem(TOKENS) ?? '{}');

    if (tokens?.accessToken) {
        const payload: ITokenPayload | null = extractJwtPayload(tokens?.accessToken);

        if (payload?.expiration) {
            // check expiration of the accessToken

            const expInMs: number = payload.expiration * 1000;
            const now: number = Date.now();

            return now < expInMs;
        }
    }

    return false;
}

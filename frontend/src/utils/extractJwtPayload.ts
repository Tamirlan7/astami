import {ITokenPayload} from "../types/types.ts";

export default function extractJwtPayload(token: string): ITokenPayload | null {
    if (token) {
        const payload: string = token.split('.')[1];
        const encodedPayload: string = decodeURIComponent(
            atob(payload)
                .split("")
                .map((c: string) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );

        return JSON.parse(encodedPayload) as ITokenPayload;
    }

    return null;
}

import {RoutePaths} from "./RoutePaths.ts";

export const TOKENS = 'tokens';
export const API_URL: string = import.meta.env.VITE_API_URL as string;
export const UNAUTHENTICATED_ENTRY = RoutePaths.LOGIN
export const AUTHENTICATED_ENTRY = RoutePaths.COMPANIES
import axios from "axios";
import {API_URL, TOKENS} from "../config/AppConstants.ts";
import {ITokens} from "@types/types.ts";

const {accessToken} = JSON.parse(localStorage.getItem(TOKENS) ?? '') as ITokens

const client = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    }
})

export default client;
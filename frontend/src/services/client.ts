import axios from "axios";
import {API_URL, TOKENS} from "../config/appConstants.ts";
import {ITokens} from "../types/types.ts";

const {accessToken} = JSON.parse(localStorage.getItem(TOKENS) ?? '') as ITokens

const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    }
})

export default axiosClient;
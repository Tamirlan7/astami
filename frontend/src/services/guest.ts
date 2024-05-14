import axios from "axios";
import {API_URL} from "../config/appConstants.ts";

const guest = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

export default guest;
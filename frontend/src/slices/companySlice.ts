import {createSlice} from "@reduxjs/toolkit";
import {ICompany} from "../types/model.ts";

interface IState {
    company: ICompany

}

const initialState: IState = {}

const companySlice = createSlice({
    name: "company",
    initialState: initialState,
    reducers: {},
    extraReducers: builder =>
        builder
})


export default companySlice.reducer;
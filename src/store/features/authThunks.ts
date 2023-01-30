import {createAsyncThunk} from "@reduxjs/toolkit";
import { authAPI, supplierAPI } from "../../components/api/api";
import { RiskType, SupplierIdType } from "./supplierSlice";

export type loginThunkPropsType = {
    username: string,
    password: string
}

export type loginThunkresponseType = string;
export type AccessTokenPartType = {
    exp: string,
    id: string,
    username: string
}

export const loginThunk = createAsyncThunk(
    'auth/loginThunk',
    async (credentials: loginThunkPropsType, {rejectWithValue, dispatch}) => {
        const res = await authAPI.login(credentials);
        // return res.data;
        if (typeof res.data.data === 'string') {
            return res.data.data;
        } else {
            console.log('Login response error. The recived data is:', res.data);
            return "loginThunk / Login response error"
        }
    }
);


export type ProfileThunkResponseType = {
    "username": string,
    "name": string, 
    "layout": string, 
    "items_per_page": number
}
export const profileThunk = createAsyncThunk(
    'auth/profileThunk',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await authAPI.getProfile();
        // console.log('profileThunk=', res.data);
        if (res.data.status === 'success')
            return res.data.data
    }
);
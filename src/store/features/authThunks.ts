import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../components/api/api";
import { DARK, LIGHT, ThemesOptions, useTheme } from "../../hooks/useTheme";
import { EN_LANG, FormatDateType, LayoutOptionsType, loginAC, RiskViewType, RU_LANG, UserLangType } from "./authSlice";

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
        if (typeof res.data.data === 'string') {
            dispatch(loginAC(res.data.data));
            return res.data.data;
        } else {
            console.log('Login response error. The recived data is:', res.data);
            return "loginThunk / Login response error"
        }
    }
);


export type ProfileResponseType = {
    "username": string,
    "name": string, 
    "theme": ThemesOptions, 
    "language": UserLangType, 
    "layout": LayoutOptionsType, 
    "items_per_page": number, 
    "risk_format": RiskViewType, 
    "date_format": FormatDateType,
}
export type ProfileRequestType = {
    "name"?: string, 
    "theme"?: ThemesOptions, 
    "language"?: UserLangType, 
    "layout"?: LayoutOptionsType, 
    "items_per_page"?: number, 
    "risk_format"?: RiskViewType, 
    "date_format"?: FormatDateType,
}

export const getProfileThunk = createAsyncThunk(
    'auth/profileThunk',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await authAPI.getProfile();
        if (res.data.status === 'success') {
            return res.data.data
        }
    }
);

export const updateProfileThunk = createAsyncThunk(
    'auth/profileThunk',
    async (profileVars:ProfileRequestType, {rejectWithValue, dispatch}) => {
        const res = await authAPI.updateProfile(profileVars);
        if (res.data.status === 'success')
            return res.data.data
    }
);

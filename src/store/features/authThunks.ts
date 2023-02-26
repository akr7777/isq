import { createAsyncThunk } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { authAPI } from "../../components/api/api";
import { DARK, LIGHT, ThemesOptions, useTheme } from "../../hooks/useTheme";
import { EN_LANG, FormatDateType, LayoutOptionsType, loginAC, loginErrorAC, RiskViewType, RU_LANG, UserLangType } from "./authSlice";

export type loginThunkPropsType = {
    username: string,
    password: string,
    t: any
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
        
        try {
            const res = await authAPI.login(credentials);
            dispatch(loginAC(res.data.data));
            return res.data.data;

            // if (res.data.status !== 'error') {
            //     dispatch(loginAC(res.data.data));
            //     return res.data.data;
            // } else {
            //     //Invalid username or password
            //     console.log('Login response error. The recived data is:', res.data);
            //     return "loginThunk / Login response error"
            // }
        } catch (err:any) {
            // console.log('errrrrr=', err);
            // const {t} = useTranslation();
            // console.log('222');
            
            if (err.response.data.message === "Invalid username or password") {
                dispatch(loginErrorAC( credentials.t("invalid_username_or_password") ));
                // dispatch(loginErrorAC("invalid_username_or_password"));
            }
            // return rejectWithValue(err.response.data)
            // if (!err.response) {
            //     throw err
            //   }
        
            //   return rejectWithValue(err.response.data)
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

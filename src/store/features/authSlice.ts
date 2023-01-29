import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { DARK, LIGHT } from '../../hooks/useTheme';
import { AccessTokenPartType, loginThunk } from './authThunks';

export const localStorageAppThemeVariable = 'app-theme';
export const localStorageLanguageVariable = 'language';

export const ADMIN_USER_ROLE = 'admin';
export const MANAGER_USER_ROLE = 'manager';
export const SECURITY_USER_ROLE = 'security';
export type RoleType = typeof ADMIN_USER_ROLE | typeof MANAGER_USER_ROLE | typeof SECURITY_USER_ROLE | undefined;


export type UserIdType = string;
export type UserThemeType = typeof DARK | typeof LIGHT;

export const RU_LANG = 'ru';
export const EN_LANG = 'en';
export type UserLangType = typeof RU_LANG | typeof EN_LANG;

export type UserSettingsType = {
    lang: UserLangType,
    theme: UserThemeType,
}
export type UserType = {
    userId: UserIdType,
    name: string,
    role: RoleType,
    userSettings: UserSettingsType,
    vars: {
        loginInput: string,
        passwordInput: string,
        loginError: string,
        emptyLogin: boolean,
        emptyPassword: boolean,
    }
    loginRequestLoadingStatus: boolean,
}


const initContent: UserType = {
    userId: '',
    name: '1111',
    role: undefined,
    userSettings: {
        lang: EN_LANG,
        theme: LIGHT
    },
    vars: {
        loginInput: '',
        passwordInput: '',
        loginError: "",
        emptyLogin: false,
        emptyPassword: false,
    },
    loginRequestLoadingStatus: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initContent,
    reducers: {
        onLoginInputAC: (state: UserType, action: PayloadAction<string>):UserType => {
            return {
                ...state, 
                vars: {
                    ...state.vars, 
                    loginInput: action.payload,
                    emptyLogin: false,
                    loginError: "",
                }
            }
        },
        onPasswordInputAC: (state: UserType, action: PayloadAction<string>):UserType => {
            return {
                ...state, 
                vars: {
                    ...state.vars, 
                    passwordInput: action.payload,
                    emptyPassword: false,
                    loginError: "",
                }
            }
        },
        
        // logoutAC: (state: UserType):UserType => {
        //     return {
        //         ...state,
        //         userId: '',
        //         name: '',
        //         role: undefined,
        //         vars: {
        //             ...state.vars,
        //             loginInput: '',
        //             passwordInput: '',
        //             loginError: "",
        //             emptyLogin: false,
        //             emptyPassword: false,
        //         },
        //     }
        // },
        changeThemeAC: (state: UserType, action: PayloadAction<typeof DARK | typeof LIGHT>):UserType => {
            return {
                ...state,
                userSettings: {
                    ...state.userSettings,
                    theme: action.payload
                }
            }
        },
        changeLanguageAC: (state: UserType, action: PayloadAction<UserLangType>):UserType => {
            return {
                ...state,
                userSettings: {
                    ...state.userSettings,
                    lang: action.payload
                }
            }
        }
    },


    extraReducers: (builder) => {
        builder.addCase(loginThunk.pending, (state: UserType) => {
            state.loginRequestLoadingStatus = true;
        })
        builder.addCase(loginThunk.fulfilled, (state: UserType, action: PayloadAction<string>) => {
            const decodedTokenPart:AccessTokenPartType = JSON.parse(atob(action.payload.split('.')[1]));
            const {id, username} = decodedTokenPart;
            localStorage.setItem("accessToken", action.payload);
            state.name = username;
            state.userId = id;
            state.loginRequestLoadingStatus = false;
        })
        builder.addCase(loginThunk.rejected, (state: UserType) => {
            state.loginRequestLoadingStatus = false;
        })
    }
})
export const {onLoginInputAC, onPasswordInputAC, changeThemeAC, changeLanguageAC} = authSlice.actions;

export default authSlice.reducer;
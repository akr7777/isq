import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { DARK, LIGHT } from '../../hooks/useTheme';
import { AccessTokenPartType, loginThunk, profileThunk, ProfileThunkResponseType } from './authThunks';
import { useAppDispatch } from '../store';

export const localStorageAppThemeVariable = 'app-theme';
export const localStorageLanguageVariable = 'language';
export const localStorageAccessTokenVariable = "accessToken";

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
    username: string,
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
    loadingStatus: {
        loginRequestLoadingStatus: boolean,
        profileRequestLoadingStatus: boolean,
    }
    
}


const initContent: UserType = {
    userId: '',
    username: '',
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
    loadingStatus: {
        loginRequestLoadingStatus: false,
        profileRequestLoadingStatus: false,
    }
    
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

        loginAC: (state: UserType, action: PayloadAction<string>):UserType => {
            const decodedTokenPart:AccessTokenPartType = JSON.parse(atob(action.payload.split('.')[1]));
            const {id, username} = decodedTokenPart;
            localStorage.setItem(localStorageAccessTokenVariable, action.payload);
            // state.name = username;
            // state.userId = id;
            return {
                ...state,
                name: username,
                userId: id
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
            state.loadingStatus = {...state.loadingStatus, loginRequestLoadingStatus: true } 
        })
        builder.addCase(loginThunk.fulfilled, (state: UserType, action: PayloadAction<string>) => {
            // const decodedTokenPart:AccessTokenPartType = JSON.parse(new Buffer(action.payload.split('.')[1], 'base64').toString('ascii'));
            
            // const decodedTokenPart:AccessTokenPartType = JSON.parse(atob(action.payload.split('.')[1]));
            // const {id, username} = decodedTokenPart;
            // localStorage.setItem(localStorageAccessTokenVariable, action.payload);
            // state.name = username;
            // state.userId = id;
            
            const dispatch = useAppDispatch();
            dispatch(loginAC(action.payload));
            state.loadingStatus = {...state.loadingStatus, loginRequestLoadingStatus: false } 
        })
        builder.addCase(loginThunk.rejected, (state: UserType) => {
            state.loadingStatus = {...state.loadingStatus, loginRequestLoadingStatus: false } 
        })

        builder.addCase(profileThunk.pending, (state: UserType) => {
            state.loadingStatus = {...state.loadingStatus, profileRequestLoadingStatus: true } 
        })
        builder.addCase(profileThunk.fulfilled, (state: UserType, action: PayloadAction<ProfileThunkResponseType>) => {
            state.name = action.payload.name;
            state.username = action.payload.username;
            //...
            state.loadingStatus = {...state.loadingStatus, profileRequestLoadingStatus: false } 
        })
        builder.addCase(profileThunk.rejected, (state: UserType) => {
            state.loadingStatus = {...state.loadingStatus, profileRequestLoadingStatus: false } 
        })
    }
})
export const {loginAC, onLoginInputAC, onPasswordInputAC, changeThemeAC, changeLanguageAC} = authSlice.actions;

export default authSlice.reducer;
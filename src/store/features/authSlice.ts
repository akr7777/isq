import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { DARK, LIGHT } from '../../hooks/useTheme';

export const localStorageAppThemeVariable = 'app-theme';
export const localStorageLanguageVariable = 'language';

export type RoleType = 'admin' | 'manager' | 'security' | 'none';
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
    
}


const initContent: UserType = {
    userId: '',
    name: '1111',
    role: 'none',
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
    
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initContent,
    reducers: {
        // changeUserThemeAC: (state: UserType, action: PayloadAction<UserThemeType>) => {
        //     state = {
        //         ...state, 
        //         userSettings: {
        //             ...state.userSettings, 
        //             theme: action.payload
        //         }
        //     }
        //     return state;
        // },
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
        onLoginButtonClickAC: (state: UserType):UserType => {
            
            if (state.vars.loginInput.length === 0) 
                return {
                    ...state,
                    vars: { 
                        ...state.vars,
                        emptyLogin: true
                    }
                }
            if (state.vars.passwordInput.length === 0) 
                return {
                    ...state,
                    vars: { 
                        ...state.vars,
                        emptyPassword: true
                    }
                } 
            if (state.vars.loginInput === 'manager' && state.vars.passwordInput === 'manager')
                return {
                    ...state,
                    userId: '1',
                    name: 'Manager',
                    role: 'manager' as const,
                    vars: {
                        ...state.vars,
                        loginInput: '',
                        passwordInput: '',
                    }
                }
            else if (state.vars.loginInput === 'security' && state.vars.passwordInput === 'security')
                return {
                    ...state,
                    userId: '1',
                    name: 'Security specialist',
                    role: 'security' as const,
                    vars: {
                        ...state.vars,
                        loginInput: '',
                        passwordInput: '',
                    }
                }
            else if (state.vars.loginInput === 'admin' && state.vars.passwordInput === 'admin')
                return {
                    ...state,
                    userId: '1',
                    name: 'Admin',
                    role: 'admin' as const,
                    vars: {
                        ...state.vars,
                        loginInput: '',
                        passwordInput: '',
                    }
                }
            else {
                state = {
                    ...state,
                    vars: {
                        ...state.vars,
                        loginError: 'From server: Указана неверная связка логин-пароль'
                    }
                }
                
                return state;
                
            }
            return state;
        },
        logoutAC: (state: UserType):UserType => {
            return {
                ...state,
                userId: '',
                name: '',
                role: 'none',
                vars: {
                    ...state.vars,
                    loginInput: '',
                    passwordInput: '',
                    loginError: "",
                    emptyLogin: false,
                    emptyPassword: false,
                },
            }
        },
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
        // builder.addCase(getDescriptionThunk.pending, (state: InitAuthorContentType) => {
        //     state.isLoading = true;
        // })
        // builder.addCase(getDescriptionThunk.fulfilled, (state: InitAuthorContentType, action: PayloadAction<Omit<InitAuthorContentType, 'isLoading'>>) => {
        //     state.title = action.payload.title;
        //     state.photo = baseDescriptionPhotoUrl;
        //     state.description = action.payload.description;
        //     state.isLoading = false;
        // })
        // builder.addCase(getDescriptionThunk.rejected, (state: InitAuthorContentType) => {
        //     state.isLoading = false;
        // })
    }
})
export const {onLoginInputAC, onPasswordInputAC, onLoginButtonClickAC, logoutAC, changeThemeAC, changeLanguageAC} = authSlice.actions;

export default authSlice.reducer;
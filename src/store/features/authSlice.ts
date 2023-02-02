import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { DARK, LIGHT } from '../../hooks/useTheme';
import { AccessTokenPartType, getProfileThunk, loginThunk, ProfileResponseType, updateProfileThunk } from './authThunks';

export const localStorageRiskViewVariable = 'riskViewInTable';
export const RiskViewWORD = 'word';
export const RiskViewSTAR = 'star';
export type RiskViewType = typeof RiskViewWORD | typeof RiskViewSTAR;

export const localStorageUserDateFormat = 'dateFormat';
export const DATE_EU = 'DD.MM.YYYY';
export const DATE_US = 'MM/DD/YYYY';
export type FormatDateType = typeof DATE_EU | typeof DATE_US;
export const COMMON_DATE_FORMAT = "YYYY-MM-DD";

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

export const localStoragePageSizingVariable = 'page-size';
export const pageSizeOptions = [20, 50, 100];
// export const itemsPerPageType = typeof 20 | typeof 50 | typeof 100;

export const TABLE_VIEW = 'table';
export const BRICK_VIEW = 'bricks';
export type LayoutOptionsType = typeof TABLE_VIEW | typeof BRICK_VIEW;
export const localStorageSuppliersViewVariable = 'suppliersView';


export type LoadingStatusType = {
    loginRequestLoadingStatus: boolean,
    profileRequestLoadingStatus: boolean,

    nameChangeLoadingStatus: boolean,
    layoutLoadingStatus: boolean,
    riskFormatLoadingStatus: boolean,
    dateFormatLoadingStatus: boolean,
    itemsPerPageLoadingStatus: boolean,
}
const loadingStatusInitValue:LoadingStatusType = {
    loginRequestLoadingStatus: false,
    profileRequestLoadingStatus: false,

    nameChangeLoadingStatus: false,
    layoutLoadingStatus: false,
    riskFormatLoadingStatus: false,
    dateFormatLoadingStatus: false,
    itemsPerPageLoadingStatus: false,
}


export type ProfileUserSettingsType = {
    language: UserLangType,
    theme: UserThemeType,
    layout: LayoutOptionsType, 
    items_per_page: number, 
    risk_format: RiskViewType, 
    date_format: FormatDateType
}
export type UserType = {
    userId: UserIdType,
    username: string,
    name: string,
    role: RoleType,
    userSettings: ProfileUserSettingsType,
    vars: {
        loginInput: string,
        passwordInput: string,
        loginError: string,
        emptyLogin: boolean,
        emptyPassword: boolean,
    }
    loadingStatus: LoadingStatusType
}


const initContent: UserType = {
    userId: '',
    username: '',
    name: '',
    role: undefined,
    userSettings: {
        language: EN_LANG,
        theme: LIGHT,
        layout: TABLE_VIEW, 
        items_per_page: 20, 
        risk_format: RiskViewWORD, 
        date_format: DATE_EU
    },
    vars: {
        loginInput: '',
        passwordInput: '',
        loginError: "",
        emptyLogin: false,
        emptyPassword: false,
    },
    loadingStatus: loadingStatusInitValue,
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
                    language: action.payload
                }
            }
        },
        changeLoadingStatus: (state: UserType, action: PayloadAction<{field: string, newValue: boolean}>) => {
            // state.loadingStatus[action.payload.field] = action.payload.newValue;
            state.loadingStatus = {...state.loadingStatus, [action.payload.field]: action.payload.newValue}
        }
    },


    extraReducers: (builder) => {
        builder.addCase(loginThunk.pending, (state: UserType) => {
            // state.loadingStatus = {...state.loadingStatus, loginRequestLoadingStatus: true } 
            state.loadingStatus.loginRequestLoadingStatus = true;
        })
        builder.addCase(loginThunk.fulfilled, (state: UserType, action: PayloadAction<string>) => {
            // state.loadingStatus = {...state.loadingStatus, loginRequestLoadingStatus: false } 
            state.loadingStatus.loginRequestLoadingStatus = false;
        })
        builder.addCase(loginThunk.rejected, (state: UserType) => {
            // state.loadingStatus = {...state.loadingStatus, loginRequestLoadingStatus: false } 
            state.loadingStatus.loginRequestLoadingStatus = false;
        })

        builder.addCase(getProfileThunk.pending, (state: UserType) => {
            //state.loadingStatus.profileRequestLoadingStatus = true;
            // state.loadingStatus.profileLayoutLoadingStatus = true;
        })
        builder.addCase(getProfileThunk.fulfilled, (state: UserType, action: PayloadAction<ProfileResponseType>) => {
            if (action.payload.username)
                state.username = action.payload.username;
                
            if (state.name !== action.payload.name)
                state.name = action.payload.name;
            if (state.userSettings.date_format !== action.payload.date_format)
                state.userSettings.date_format = action.payload.date_format;
            if (state.userSettings.items_per_page !== action.payload.items_per_page)
                state.userSettings.items_per_page = action.payload.items_per_page;
            if (state.userSettings.language !== action.payload.language)
                state.userSettings.language = action.payload.language;
            if (state.userSettings.layout !== action.payload.layout)
                state.userSettings.layout = action.payload.layout;
            if (state.userSettings.risk_format !== action.payload.risk_format)
                state.userSettings.risk_format = action.payload.risk_format;
            if (state.userSettings.theme !== action.payload.theme)
                state.userSettings.theme = action.payload.theme;
            // state.userSettings = {
            //     ...state.userSettings,
                // date_format: action.payload.date_format,
                // items_per_page: action.payload.items_per_page,
                // language: action.payload.language,
                // layout: action.payload.layout,
                // risk_format: action.payload.risk_format,
            //     theme: action.payload.theme,
            // }
            state.loadingStatus = loadingStatusInitValue;
            // state.loadingStatus.profileLayoutLoadingStatus = false;
            // state.loadingStatus.profileRequestLoadingStatus = false;
        })
        builder.addCase(getProfileThunk.rejected, (state: UserType) => {
            state.loadingStatus = loadingStatusInitValue
            // state.loadingStatus.profileLayoutLoadingStatus = false;
            // state.loadingStatus.profileRequestLoadingStatus = false;
        })
    }
})
export const {
    loginAC, onLoginInputAC, onPasswordInputAC, 
    changeThemeAC, changeLoadingStatus
    // changeLanguageAC,
} = authSlice.actions;

export default authSlice.reducer;
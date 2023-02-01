import { useEffect, useLayoutEffect, useState } from "react"
import { useSelector } from "react-redux";
import { localStorageAppThemeVariable, ProfileUserSettingsType } from "../store/features/authSlice";
import { ProfileRequestType, updateProfileThunk } from "../store/features/authThunks";
import { RootState, useAppDispatch } from "../store/store";

export const DARK = 'dark';
export const LIGHT = 'light';
export type ThemesOptions = typeof DARK | typeof LIGHT;

const isDark = window?.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultTheme = isDark ? DARK : LIGHT;


export const useTheme = () => {
    
    // const localStorageTheme = localStorage.getItem(localStorageAppThemeVariable) || defaultTheme;
    // const [theme, setTheme] = useState(localStorageTheme);
    const [theme, setTheme] = useState(defaultTheme);

    useEffect(() => {
    // useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        // localStorage.setItem(localStorageAppThemeVariable, theme);
    }, [theme])

    return { theme, setTheme }
}
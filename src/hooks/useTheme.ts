import { useLayoutEffect, useState } from "react"

export const DARK = 'dark';
export const LIGHT = 'light'
type ThemesOptions = typeof DARK | typeof LIGHT;

const isDark = window?.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultTheme = isDark ? DARK : LIGHT;
//console.log('defaultTheme=', defaultTheme);


export const useTheme = () => {
    const localStorageTheme = localStorage.getItem('app-theme') || defaultTheme;
    const [theme, setTheme] = useState(localStorageTheme);

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('app-theme', theme)
    }, [theme])

    return { theme, setTheme }
}
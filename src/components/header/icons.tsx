import s from './header.module.css';

import { useTheme } from './../../hooks/useTheme';
import { DARK, LIGHT } from './../../hooks/useTheme';
import useLocalStorage from './../../hooks/use-localstorage';

import i18n from './../../i18n';

import flagRu from './../../public/icons/flag_ru.png';
import flagEn from './../../public/icons/flag_en.png';
import {  EN_LANG, localStorageLanguageVariable, ProfileUserSettingsType, RU_LANG, UserIdType } from '../../store/features/authSlice';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';

import exitIcon from './../../public/icons/icon_exit.png';
import enterIcon from './../../public/icons/icon_enter.png';
import sunIcon from './../../public/icons/icon_sun.png';
import moonIcon from './../../public/icons/icon_moon.png';
import burger from './../../public/icons/burger.png';
import ava from './../../public/images/ava.jpg';

import { useNavigate } from 'react-router-dom';
import { PATHS } from '../outlet/outlet';
import { ProfileRequestType, updateProfileThunk } from '../../store/features/authThunks';

type IconsPropsType = {
    langText?: string,
    themeText?: string,
    profileText?: string,
    logoutText?: string,
    loginText?: string,

    isMobileOpened?: boolean,
    setIsMobileOpened?: (v: boolean) => void,
}

export const Icons = (props: IconsPropsType) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [language, setLanguage] = useLocalStorage(localStorageLanguageVariable, 'ru');
    
    // const {theme, setTheme } = useTheme();
    const { setTheme } = useTheme();
    const theme = useSelector((state:RootState) => state.auth.userSettings.theme);


    const handleLenguageChange = () => {

        if (language === EN_LANG) {
            i18n.changeLanguage(RU_LANG);
            setLanguage(RU_LANG);
            const dataForThunk:ProfileRequestType = {
                // ...userSettings,
                language: RU_LANG,
                // name: name,
            }
            dispatch(updateProfileThunk(dataForThunk));
        } else if (language === RU_LANG) {
            i18n.changeLanguage(EN_LANG);
            setLanguage(EN_LANG);
            const dataForThunk:ProfileRequestType = {
                // ...userSettings,
                language: EN_LANG,
                // name: name,
            }
            dispatch(updateProfileThunk(dataForThunk));
        }
    };

    

    const handleLightThemeClick = () => {
        setTheme(LIGHT);
        // const updateThunkInfo:ProfileRequestType = {name: name, ...userSettings, theme: LIGHT}
        dispatch(updateProfileThunk({theme: LIGHT}));
    }
    const handleDarkThemeClick = () => {
        setTheme(DARK);
        // const updateThunkInfo:ProfileRequestType = {name: name, ...userSettings, theme: DARK}
        dispatch(updateProfileThunk({theme: DARK}));
    }
    const onProfileClickHandler = () => {
        navigate(PATHS.profile);
        closeMobileMenu();
    }
    const onLogoutClickHandler = () => {
        //dispatch(logoutAC());
        closeMobileMenu();
    }
    const onLoginClickHandler = () => {
        navigate(PATHS.login);
        closeMobileMenu();
    }

    const closeMobileMenu = () => {
        if (props.isMobileOpened && props.setIsMobileOpened){
            props.setIsMobileOpened(false)
        }
    }

    const userId:UserIdType = useSelector((state: RootState) => state.auth.userId);

    return <>
    
    {
        props.isMobileOpened && <div className={s.oneIconOptionDiv} onClick={closeMobileMenu}>
                <img 
                    src={burger} 
                    className={s.iconsImg}
                    onClick={closeMobileMenu}
                />
            </div>
    }


    <div className={s.oneIconOptionDiv} onClick={handleLenguageChange}>
        <label onClick={handleLenguageChange}>
            {props.langText}
        </label>
        <img 
            className={s.iconsImg}
            onClick={handleLenguageChange} 
            src={ language === 'en'
                    ? flagRu
                    : language === 'ru'
                        ? flagEn
                        : ""
                } 
        /> 
        
    </div>

    {  
        theme === DARK && <div className={s.oneIconOptionDiv} onClick={handleLightThemeClick}>
                <label onClick={handleLightThemeClick}>
                    {props.themeText}
                </label>
                <img 
                    src={sunIcon} 
                    className={s.iconsImg} 
                    onClick={handleLightThemeClick}              
                />
            </div>
    }
    {  
        theme === LIGHT && <div className={s.oneIconOptionDiv} onClick={handleDarkThemeClick}>
                <label onClick={handleDarkThemeClick}>
                    {props.themeText}
                </label>
                <img 
                    src={moonIcon} 
                    className={s.iconsImg} 
                    onClick={handleDarkThemeClick}              
                />
            </div>
    }

    { 
        userId.length > 0 && <div className={s.oneIconOptionDiv} onClick={onProfileClickHandler}>
             <label onClick={onProfileClickHandler}>
                {props.profileText}
            </label>
            <img 
                    src={ava} 
                    className={s.avaStyle}
                    onClick={onProfileClickHandler}
                />
        </div>
    }
    
    { 
        userId.length > 0 && <div className={s.oneIconOptionDiv} onClick={onLogoutClickHandler}>
            <label onClick={onLogoutClickHandler}>
                {props.logoutText}
            </label>
            <img 
                src={exitIcon} 
                className={s.iconsImg}
                onClick={onLogoutClickHandler}
            /> 
        </div>
    }
    { 
        userId.length === 0 && <div className={s.oneIconOptionDiv} onClick={onLoginClickHandler}>
            <label onClick={onLoginClickHandler}>
                {props.loginText}
            </label>
            <img 
                src={enterIcon} 
                className={s.iconsImg}
                onClick={onLoginClickHandler}
            /> 
        </div>
    }
</>
}
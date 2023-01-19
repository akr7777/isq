import s from './header.module.css';

import { useTheme } from './../../hooks/useTheme';
import { DARK, LIGHT } from './../../hooks/useTheme';
// import { useTranslation } from 'react-i18next';
import useLocalStorage from './../../hooks/use-localstorage';

import i18n from './../../i18n';

import flagRu from './../../public/icons/flag_ru.png';
import flagEn from './../../public/icons/flag_en.png';
import { changeThemeAC, logoutAC, UserIdType } from '../../store/features/authSlice';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';

import exitIcon from './../../public/icons/icon_exit.png';
import sunIcon from './../../public/icons/icon_sun.png';
import moonIcon from './../../public/icons/icon_moon.png';
import burger from './../../public/icons/burger.png';
import ava from './../../public/images/ava.jpg';

import { Link, useNavigate } from 'react-router-dom';
import { PATHS } from '../outlet/outlet';
import { t } from 'i18next';

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
    // const { t } = useTranslation();
    const [language, setLanguage] = useLocalStorage('language', 'ru');

    const handleLenguageChange = () => {
        if (language === 'en') {
            i18n.changeLanguage('ru');
            setLanguage('ru');
        } else if (language === 'ru') {
            i18n.changeLanguage('en');
            setLanguage('en');
        }
    };

    const dispatch = useAppDispatch();

    const {theme, setTheme } = useTheme();
    const handleLightThemeClick = () => {
        setTheme(LIGHT);
        dispatch(changeThemeAC(LIGHT));
    }
    const handleDarkThemeClick = () => {
        setTheme(DARK);
        dispatch(changeThemeAC(DARK))
    }
    const onLogoutClickHandler = () => {
        dispatch(logoutAC());
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
    
    {/* { 
        language === 'en' && <div className={s.oneIconOptionDiv} onClick={handleLenguageChange}>
            <label onClick={handleLenguageChange}>
                {props.langText}
            </label>
            <img 
                className={s.iconsImg}
                onClick={handleLenguageChange} 
                src={flagRu} 
            /> 
            
        </div>
    }
    { 
        language === 'ru' && <div className={s.oneIconOptionDiv} onClick={handleLenguageChange}>
                <label onClick={handleLenguageChange}>
                    {props.langText}
                </label>
                <img 
                    className={s.iconsImg}
                    onClick={handleLenguageChange} 
                    src={flagEn} 
                /> 
            </div>
    } */}



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
        userId.length > 0 && <div className={s.oneIconOptionDiv}>
             <label onClick={() => navigate(PATHS.profile)}>
                {props.profileText}
            </label>
            <img 
                    src={ava} 
                    className={s.avaStyle}
                    onClick={() => navigate(PATHS.profile)}
                />
        </div>
    }
    
    { userId.length > 0 && <div className={s.oneIconOptionDiv} onClick={onLogoutClickHandler}>
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
</>
}
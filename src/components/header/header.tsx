import s from './header.module.css';
// import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';

import { useTheme } from './../../hooks/useTheme';
import { DARK, LIGHT } from './../../hooks/useTheme';

import { useTranslation } from 'react-i18next';
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
import logo from './../../public/images/logo.jpeg';
import ava from './../../public/images/ava.jpg';
import { Link } from 'react-router-dom';
import { PATHS } from '../outlet/outlet';


const Header = () => {

    const { t } = useTranslation();
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

    const userId:UserIdType = useSelector((state: RootState) => state.auth.userId);

    return <div className={s.header}>

        <div className={s.simpleDiv}>
            <img src={logo} className={s.logoImg} />
        </div>

        <div className={s.simpleDiv}>
            <h2>
                <Link to={PATHS.dashboard} className={s.header_link}>
                    {t('header_text')}
                </Link>
                
            </h2>
        </div>
        

        <div className={s.icons_div}>
            { 
                language === 'en' && 
                    <img 
                        className={s.iconsImg}
                        onClick={handleLenguageChange} 
                        src={flagRu} 
                    /> 
            }
            { 
                language === 'ru' && 
                    <img 
                        className={s.iconsImg}
                        onClick={handleLenguageChange} 
                        src={flagEn} 
                    /> 
            }


            {  
                theme === DARK && <img 
                    src={sunIcon} 
                    className={s.iconsImg} 
                    onClick={handleLightThemeClick}              
                />
            }
            {  
                theme === LIGHT && <img 
                    src={moonIcon} 
                    className={s.iconsImg} 
                    onClick={handleDarkThemeClick}              
                />
            }
            <div>
            { userId.length > 0 && 
                <Link to={PATHS.profile}>
                    <img 
                        src={ava} 
                        className={s.avaStyle}
                        // onClick={onLogoutClickHandler}
                    />
                </Link>

            }
            </div>
            
            { userId.length > 0 && 
                    <img 
                        src={exitIcon} 
                        className={s.iconsImg}
                        onClick={onLogoutClickHandler}
                    /> 
            }
        </div>
        
    </div>
}

export default Header;
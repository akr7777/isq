import logo from './../../public/images/logo.jpeg';
import s from './header.module.css';
// import i18n from './../../i18n';
import { useTranslation } from 'react-i18next';
import burger from './../../public/icons/burger.png';

// import { useTheme } from './../../hooks/useTheme';
// import { DARK, LIGHT } from './../../hooks/useTheme';


// import i18n from './../../i18n';

// import flagRu from './../../public/icons/flag_ru.png';
// import flagEn from './../../public/icons/flag_en.png';
// import { changeThemeAC, logoutAC, UserIdType } from '../../store/features/authSlice';
// import { useSelector } from 'react-redux';
// import { RootState, useAppDispatch } from '../../store/store';

// import exitIcon from './../../public/icons/icon_exit.png';
// import sunIcon from './../../public/icons/icon_sun.png';
// import moonIcon from './../../public/icons/icon_moon.png';
// import ava from './../../public/images/ava.jpg';

import { Link, useNavigate } from 'react-router-dom';
import { PATHS } from '../outlet/outlet';
import { Icons } from './icons';
import { useState } from 'react';


const Header = () => {
    const { t } = useTranslation();

    // constants for mobile menu
    const mobileText = {
        langText: t('menu_icon_lang'),
        themeText: t("menu_icon_theme"),
        profileText: t("menu_icon_profile"),
        logoutText: t("menu_icon_logout"),
        loginText: t("menu_icon_login")
    }

    const [mobileMenuOpened, setMobileMenuOpened] = useState<boolean>(false);

    const navigate = useNavigate();
    const toLogoClickHandler = () => {
        navigate(PATHS.mainPage)
    }

    return <div className={s.header}>

        <div className={s.simpleDiv}>
            <img 
                src={logo} 
                className={s.logoImg} 
                onClick={toLogoClickHandler}
            />
        </div>

        <div className={s.simpleDiv}>
            <h2>
                <Link to={PATHS.dashboard} className={s.header_link}>
                    {t('header_text')}
                </Link>
                
            </h2>
        </div>

        <div className={s.icondiv2}>
            {/* Icons for Desctop version */}
            <div className={s.icons_div_desctop + " " + s.desctopSize}> <Icons /> </div>

            {/* Icons for Mobile version */}
            { !mobileMenuOpened && <img 
                            src={burger}
                            className={s.iconsImg + " " + s.mobileSize}
                            onClick={() => setMobileMenuOpened(true)}
                        />
            }
            {
                mobileMenuOpened && <>
                    <div 
                        className={s.overlay} 
                        onClick={() => setMobileMenuOpened(false)}
                        // onClick={() => alert('CLICK')}
                    >
                        
                    </div>

                    <div className={s.icons_div_mobile + " " + s.mobileSize}> 
                        <Icons 
                            langText={mobileText.langText}
                            themeText={mobileText.themeText}
                            profileText={mobileText.profileText}
                            logoutText={mobileText.logoutText}
                            loginText={mobileText.loginText}

                            isMobileOpened={mobileMenuOpened}
                            setIsMobileOpened={setMobileMenuOpened}
                        /> 
                    </div>
                </>
                
            }

        </div>
        
    </div>
}

export default Header;
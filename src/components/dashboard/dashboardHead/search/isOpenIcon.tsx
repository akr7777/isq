import { useSelector } from "react-redux";
import { DARK, LIGHT } from "../../../../hooks/useTheme";
import { RootState } from "../../../../store/store";
import s from './search.module.css';


import darkThemeArrowDown from './../../../../public/icons/down_arrow_yellow.jpg';
import lightThemeArrowDown from './../../../../public/icons/down_arrow_black.jpg';
import darkThemeArrowUp from './../../../../public/icons/up_arrow_yellow.jpg';
import lightThemeArrowUp from './../../../../public/icons/up_arrow_black.jpg';

type IsOpenIconPropsType = {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
}

const IsOpenIcon = ({isOpen, setIsOpen}: IsOpenIconPropsType) => {
    const theme: typeof DARK | typeof LIGHT = useSelector((state:RootState) => state.auth.userSettings.theme);

    return <>
        { 
            !isOpen && theme === LIGHT && <img 
                    src={lightThemeArrowDown} 
                    className={s.arrows} 
                    onClick={() => setIsOpen(true)}
                /> 
        }
        { 
            !isOpen && theme === DARK && <img 
                src={darkThemeArrowDown} 
                className={s.arrows} 
                onClick={() => setIsOpen(true)}
            /> 
        }

        { 
            isOpen && theme === LIGHT && 
                <img 
                    src={lightThemeArrowUp} 
                    className={s.arrows} 
                    onClick={() => setIsOpen(false)}
                /> 
        }
        { 
            isOpen && theme === DARK && 
                <img 
                    src={darkThemeArrowUp} 
                    className={s.arrows} 
                    onClick={() => setIsOpen(false)}
                /> 
        }
    </>
}

export default IsOpenIcon;
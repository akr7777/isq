import { useSelector } from "react-redux";
import { DARK, LIGHT } from "../../../../hooks/useTheme";
import { RootState } from "../../../../store/store";
import s from './search.module.css';
import darkThemeArrowDown from './../../../../public/icons/down_arrow_yellow.png';
import lightThemeArrowDown from './../../../../public/icons/down_arrow_black.png';
import darkThemeArrowUp from './../../../../public/icons/up_arrow_yellow.png';
import lightThemeArrowUp from './../../../../public/icons/up_arrow_black.png';

type IsOpenIconPropsType = {
    isCircled: boolean;
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
}

const IsOpenIcon = ({isCircled, isOpen, setIsOpen}: IsOpenIconPropsType) => {
    const theme: typeof DARK | typeof LIGHT = useSelector((state:RootState) => state.auth.userSettings.theme);
    return <>
        { 
            !isOpen && theme === LIGHT && <img 
                    src={lightThemeArrowDown} 
                    className={isCircled ? s.arrows+" "+s.arrowCircled : s.arrows} 
                    onClick={() => setIsOpen(true)}
                /> 
        }
        { 
            !isOpen && theme === DARK && <img 
                src={darkThemeArrowDown} 
                className={isCircled ? s.arrows+" "+s.arrowCircled : s.arrows}  
                onClick={() => setIsOpen(true)}
            /> 
        }

        { 
            isOpen && theme === LIGHT && 
                <img 
                    src={lightThemeArrowUp} 
                    className={isCircled ? s.arrows+" "+s.arrowCircled : s.arrows}
                    onClick={() => setIsOpen(false)}
                /> 
        }
        { 
            isOpen && theme === DARK && 
                <img 
                    src={darkThemeArrowUp} 
                    className={isCircled ? s.arrows+" "+s.arrowCircled : s.arrows} 
                    onClick={() => setIsOpen(false)}
                /> 
        }
    </>
}

export default IsOpenIcon;
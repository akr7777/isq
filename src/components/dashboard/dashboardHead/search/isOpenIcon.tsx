import { useSelector } from "react-redux";
import { DARK, LIGHT } from "../../../../hooks/useTheme";
import { RootState } from "../../../../store/store";
import s from './search.module.css';
import darkThemeArrowDown from './../../../../public/icons/down_arrow_yellow.png';
import lightThemeArrowDown from './../../../../public/icons/down_arrow_black.png';
import darkThemeArrowUp from './../../../../public/icons/up_arrow_yellow.png';
import lightThemeArrowUp from './../../../../public/icons/up_arrow_black.png';
import { IsSomeSearchOptionFilled } from "./functions-for-search";

type IsOpenIconPropsType = {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
}

const IsOpenIcon = ({isOpen, setIsOpen}: IsOpenIconPropsType) => {
    const theme: typeof DARK | typeof LIGHT = useSelector((state:RootState) => state.auth.userSettings.theme);

    // const searchByComplited: SearchByComplitedType = useSelector((state:RootState) => state.supplier.searchByComplited);
    // const searchByRisk: RiskType = useSelector((state:RootState) => state.supplier.searchByRisk);
    // const searchByDateStart: FilterDateType = useSelector((state:RootState) => state.supplier.searchByDateStart);
    // const searchByDateEnd: FilterDateType = useSelector((state:RootState) => state.supplier.searchByDateEnd);
    // const isCircled: boolean = searchByComplited !== SEARCH_COMPLETED_ALL || (searchByRisk !== undefined) ||
    //                     (searchByDateStart !== undefined) || (searchByDateEnd !== undefined)
    const isCircled: boolean = IsSomeSearchOptionFilled();

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
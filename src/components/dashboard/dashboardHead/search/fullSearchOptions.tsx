import { useState } from 'react';
import { useSelector } from 'react-redux';
import { DARK, LIGHT } from '../../../../hooks/useTheme';
import { RootState } from '../../../../store/store';
import dbStyles from './../../dashboard.module.css';
import darkThemeArrowDown from './../../../../public/icons/down_arrow_yellow.jpg';
import lightThemeArrowDown from './../../../../public/icons/down_arrow_black.jpg';
import darkThemeArrowUp from './../../../../public/icons/up_arrow_yellow.jpg';
import lightThemeArrowUp from './../../../../public/icons/up_arrow_black.jpg';
import SearchByDate from './optionSearchDate';
import SearchByComplited from './optionSearchComplited';
import SearchRisk from './optionSearchRisk';
import searchStyles from './search.module.css';

const FullSearchOptions = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const theme: typeof DARK | typeof LIGHT = useSelector((state:RootState) => state.auth.userSettings.theme);


    return <div>

        { 
            !isOpen && theme === LIGHT && 
                <img 
                    src={lightThemeArrowDown} 
                    className={dbStyles.arrows} 
                    onClick={() => setIsOpen(true)}
                /> 
        }
        { !isOpen && theme === DARK && 
            <img 
                src={darkThemeArrowDown} 
                className={dbStyles.arrows} 
                onClick={() => setIsOpen(true)}
            /> 
        }

        { 
            isOpen && theme === LIGHT && 
                <img 
                    src={lightThemeArrowUp} 
                    className={dbStyles.arrows} 
                    onClick={() => setIsOpen(false)}
                /> 
        }
        { 
            isOpen && theme === DARK && 
                <img 
                    src={darkThemeArrowUp} 
                    className={dbStyles.arrows} 
                    onClick={() => setIsOpen(false)}
                /> 
        }



        {
            isOpen && <div className={searchStyles.searchMainDiv}>
                <SearchByDate />
                <SearchByComplited />
                <SearchRisk />
            </div>
        }
        
    </div>
}

export default FullSearchOptions;
import { t } from 'i18next';
import { useState } from 'react';
import { searchByDateFilterAC } from '../../../../store/features/supplierSlice';
import { useAppDispatch } from '../../../../store/store';
import ButtonOK from '../../../common/buttonOK/buttonOK';
import { LineTextField } from '../../../common/labelTextField/labelLineText';
import searchStyles from './search.module.css';

const SearchByDate = () => {

    const [dateStart, setDateStart] = useState<string>('');
    const [dateEnd, setDateEnd] = useState<string>('');

    const dispatch = useAppDispatch();
    const onButtonFilterHandler = () => {
        console.log(dateStart, dateEnd);
        
        dispatch(searchByDateFilterAC({dateStart: dateStart, dateEnd: dateEnd}));
    }

    return <div>
        { t("search_search_by_date") }
        <div className={searchStyles.searchDateComplitedDiv}>
            <LineTextField 
                type="text"
                text={dateStart}
                onChangeFunction={(newText) => setDateStart(newText)}
            />
            -
            <LineTextField 
                type="text"
                text={dateEnd}
                onChangeFunction={(newText) => setDateEnd(newText)}
            />
            <ButtonOK 
                text="OK"
                onClickFunction={onButtonFilterHandler}
            />
        </div>
    </div>
}
export default SearchByDate;
import { t } from 'i18next';
import { useState } from 'react';
import { searchByDateFilterAC } from '../../../../store/features/supplierSlice';
import { useAppDispatch } from '../../../../store/store';
import { ButtonOK } from '../../../common/buttons/buttons';
import { LineTextField } from '../../../common/labelTextField/labelLineText';
import s from './search.module.css';

const SearchByDate = () => {

    const [dateStart, setDateStart] = useState<string>('');
    const [dateEnd, setDateEnd] = useState<string>('');

    const dispatch = useAppDispatch();
    const onButtonFilterHandler = () => {
        // dispatch(searchByDateFilterAC({dateStart: dateStart, dateEnd: dateEnd}));
    }
    const onStartDateFieldChangeHandler = (newDate: string) => {
        setDateStart(newDate);
        dispatch(searchByDateFilterAC({dateStart: dateStart, dateEnd: dateEnd}));
    }
    const onEndDateFieldChangeHandler = (newDate: string) => {
        setDateEnd(newDate);
        dispatch(searchByDateFilterAC({dateStart: dateStart, dateEnd: dateEnd}));
    }

    return <div>
        {/* { t("search_search_by_date") } */}
        <div className={s.searchDateComplitedDiv}>
            <LineTextField 
                type="text"
                text={dateStart}
                // onChangeFunction={(newText) => setDateStart(newText)}
                className={s.searchByDate_fieldWidth}
                onChangeFunction={(newDate: string) => onStartDateFieldChangeHandler(newDate)}
            />
            -
            <LineTextField 
                type="text"
                text={dateEnd}
                // onChangeFunction={(newText) => setDateEnd(newText)}
                className={s.searchByDate_fieldWidth}
                onChangeFunction={(newDate: string) => onEndDateFieldChangeHandler(newDate)}

            />
            {/* <ButtonOK 
                text="OK"
                onClickFunction={onButtonFilterHandler}
            /> */}
        </div>
    </div>
}
export default SearchByDate;
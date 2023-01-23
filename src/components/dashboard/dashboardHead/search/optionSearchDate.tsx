import { useState } from 'react';
import { FilterDateType, searchByDateFilterAC } from '../../../../store/features/supplierSlice';
import { RootState, useAppDispatch } from '../../../../store/store';
import Calendar from '../../../common/calendar/calendar';
// import { LineTextField } from '../../../common/labelTextField/labelLineText';
import clearIcon from '../../../../public/icons/var_no.png';
import s from './search.module.css';
import { useSelector } from 'react-redux';

const SearchByDate = () => {

    const reduxStartDate:FilterDateType = useSelector((state:RootState) => state.supplier.searchByDateStart);
    const reduxEndDate:FilterDateType = useSelector((state:RootState) => state.supplier.searchByDateEnd);

    const [dateStart, setDateStart] = useState<FilterDateType>(reduxStartDate);
    const [dateEnd, setDateEnd] = useState<FilterDateType>(reduxEndDate);

    // const [dateStartText, setDateStartText] = useState<string>('');
    // const [dateEndText, setDateEndText] = useState<string>(''); 

    const dispatch = useAppDispatch();
    
    const onStartDateFieldChangeHandler = (newDate: FilterDateType) => {
        setDateStart(newDate);
        dispatch(searchByDateFilterAC({dateStart: newDate, dateEnd: dateEnd}));
    }
    const onEndDateFieldChangeHandler = (newDate: FilterDateType) => {
        setDateEnd(newDate);
        dispatch(searchByDateFilterAC({dateStart: dateStart, dateEnd: newDate}));
    }
    // const onStartDateClear = () => {
    //     setDateStart(undefined);
        
    // }
    // const onEndDateClear = () => {
    //     setDateEnd(undefined);
    // }

    return <>
        {/* { t("search_search_by_date") } */}
        <div className={s.searchDateComplitedDiv}>
            <Calendar
                choosenDate={dateStart}
                onDateChange={(newValue: FilterDateType) => onStartDateFieldChangeHandler(newValue)}
            />
            {/* {
                dateStart !== undefined && <img src={clearIcon} className={s.clearIcon} onClick={onStartDateClear}/>
            } */}
            
            {/* <LineTextField 
                type="text"
                text={dateStart}
                // onChangeFunction={(newText) => setDateStart(newText)}
                className={s.searchByDate_fieldWidth}
                onChangeFunction={(newDate: string) => onStartDateFieldChangeHandler(newDate)}
            /> */}
            -
            <Calendar
                choosenDate={dateEnd}
                onDateChange={(newValue: FilterDateType) => onEndDateFieldChangeHandler(newValue)}
            />
            {/* {
                dateEnd !== undefined && <img src={clearIcon} className={s.clearIcon} onClick={onEndDateClear}/>
            } */}
            
            {/* <LineTextField 
                type="text"
                text={dateEnd}
                // onChangeFunction={(newText) => setDateEnd(newText)}
                className={s.searchByDate_fieldWidth}
                onChangeFunction={(newDate: string) => onEndDateFieldChangeHandler(newDate)}

            /> */}
            {/* <ButtonOK 
                text="OK"
                onClickFunction={onButtonFilterHandler}
            /> */}
        </div>
    </>
}
export default SearchByDate;
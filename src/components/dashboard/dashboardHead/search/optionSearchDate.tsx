import { useState } from 'react';
import { COMMON_DATE_FORMAT, searchByDateFilterAC } from '../../../../store/features/supplierSlice';
import { RootState, useAppDispatch } from '../../../../store/store';
import Calendar from '../../../common/calendar/calendar';
import s from './search.module.css';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const SearchByDate = () => {

    // const reduxStartDate:string = useSelector((state:RootState) => state.supplier.searchByDateStart);
    // const reduxEndDate:string = useSelector((state:RootState) => state.supplier.searchByDateEnd);

    // const [dateStart, setDateStart] = useState<string>(reduxStartDate);
    // const [dateEnd, setDateEnd] = useState<string>(reduxEndDate);
    const [dateStart, setDateStart] = useState<string>('');
    const [dateEnd, setDateEnd] = useState<string>('');

    // const [dateStartText, setDateStartText] = useState<string>('');
    // const [dateEndText, setDateEndText] = useState<string>(''); 

    const dispatch = useAppDispatch();
    
    const onStartDateFieldChangeHandler = (newDate: string) => {
        setDateStart(newDate);
        dispatch(searchByDateFilterAC({dateStart: newDate, dateEnd: dateEnd}));
    }
    const onEndDateFieldChangeHandler = (newDate: string) => {
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
                //choosenDate={dateStart}
                onDateChange={(newValue: string) => onStartDateFieldChangeHandler(newValue)}
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
                //choosenDate={dateEnd}
                onDateChange={(newValue: string) => onEndDateFieldChangeHandler(newValue)}
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
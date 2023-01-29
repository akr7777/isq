import { useState } from 'react';
import { searchByDateFilterAC } from '../../../../store/features/supplierSlice';
import { useAppDispatch } from '../../../../store/store';
import Calendar from '../../../common/calendar/calendar';
import s from './search.module.css';

const SearchByDate = () => {

    const [dateStart, setDateStart] = useState<string>('');
    const [dateEnd, setDateEnd] = useState<string>('');

    const dispatch = useAppDispatch();
    
    const onStartDateFieldChangeHandler = (newDate: string) => {
        setDateStart(newDate);
        dispatch(searchByDateFilterAC({dateStart: newDate, dateEnd: dateEnd}));
    }
    const onEndDateFieldChangeHandler = (newDate: string) => {
        setDateEnd(newDate);
        dispatch(searchByDateFilterAC({dateStart: dateStart, dateEnd: newDate}));
    }

    return <>
        <div className={s.searchDateComplitedDiv}>
            <Calendar
                //choosenDate={dateStart}
                onDateChange={(newValue: string) => onStartDateFieldChangeHandler(newValue)}
            />
            -
            <Calendar
                //choosenDate={dateEnd}
                onDateChange={(newValue: string) => onEndDateFieldChangeHandler(newValue)}
            />
        </div>
    </>
}
export default SearchByDate;
import { useSelector } from 'react-redux';
import { searchByDateFilterAC } from '../../../../store/features/supplierSlice';
import { getCompaniesThunk } from '../../../../store/features/supplierThunks';
import { RootState, useAppDispatch } from '../../../../store/store';
import Calendar from '../../../common/calendar/calendar';
import s from './search.module.css';

const SearchByCreationDate = () => {

    const dateCreatedStart: string = useSelector((state:RootState) => state.supplier.searchingOptions.searchByDateStart);
    const dateCreatedEnd: string = useSelector((state:RootState) => state.supplier.searchingOptions.searchByDateEnd);

    const dispatch = useAppDispatch();

    const onStartDateFieldChangeHandler = (newDate: string) => {
        dispatch(getCompaniesThunk({
            page: 1,
            fieldForSearch: 'searchByDateStart',
            valueForSearch: newDate,
        }));
        dispatch(searchByDateFilterAC({dateStart: newDate, dateEnd: dateCreatedEnd}));
    }
    const onEndDateFieldChangeHandler = (newDate: string) => {
        dispatch(getCompaniesThunk({
            page: 1,
            fieldForSearch: 'searchByDateEnd',
            valueForSearch: newDate,
        }));
        dispatch(searchByDateFilterAC({dateStart: dateCreatedStart, dateEnd: newDate}));
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
export default SearchByCreationDate;
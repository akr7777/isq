import s from './calendar.module.css';
import iconNext from '../../../public/icons/icon_next.png';
import iconPrev from '../../../public/icons/icon_prev.png';

export type CalendarYearsPropsType = {
    date: Date;
    onDateChange: (newDate: Date) => void,
}
const calendarYears = (props: CalendarYearsPropsType) => {
    
    const currentYear = props.date.getFullYear();
    // const currentMonth = props.date.getMonth();
    // const fullMonth = props.date.toLocaleString('ru', {month: 'long'});
    // let newDate:Date = new Date();

    const onYearMinusClickHandler = () => {
        const newDate:Date = new Date(props.date.getFullYear() - 1, props.date.getMonth(), props.date.getDate());
        // newDate.setFullYear(currentYear - 1);
        props.onDateChange( newDate )
    }
    const onYearPlusClickHandler = () => {
        //newDate.setFullYear(currentYear + 1);
        const newDate:Date = new Date(props.date.getFullYear() + 1, props.date.getMonth(), props.date.getDate());

        props.onDateChange( newDate )
    }
    // const onMonthMinusClickHandler = () => {
    //     newDate.setFullYear(currentMonth - 1);
    //     props.onDateChange( newDate )
    // }
    // const onMonthPlusClickHandler = () => {
    //     newDate.setMonth(currentMonth + 1);
    //     props.onDateChange( newDate )
    // }

    return <>
        <div className={s.calendar_head_year_div + " " + s.year_width}>
            <img src={iconPrev} className={s.arrows} onClick={onYearMinusClickHandler}/>
            {currentYear}
            <img src={iconNext} className={s.arrows} onClick={onYearPlusClickHandler}/>
        </div>
        
        {/* <div className={s.calendar_head_month_div + " " + s.month_width}>
            <img src={iconPrev} className={s.arrows} onClick={onMonthMinusClickHandler}/>
            {fullMonth}
            <img src={iconNext} className={s.arrows} onClick={onMonthPlusClickHandler}/>
        </div> */}
    </>
}

export default calendarYears;
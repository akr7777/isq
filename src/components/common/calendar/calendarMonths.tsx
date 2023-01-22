import s from './calendar.module.css';
import iconNext from '../../../public/icons/icon_next.png';
import iconPrev from '../../../public/icons/icon_prev.png';


export type CalendarMonthsPropsType = {
    date: Date;
    onDateChange: (newDate: Date) => void,
}
const CalendarMonths = (props: CalendarMonthsPropsType) => {
    
    const fullMonth = props.date.toLocaleString('ru', {month: 'long'});

    const onMonthMinusClickHandler = () => {
        const newDate:Date = new Date(props.date.getFullYear(), props.date.getMonth() - 1, props.date.getDate());
        props.onDateChange( newDate )
    }
    const onMonthPlusClickHandler = () => {
        const newDate:Date = new Date(props.date.getFullYear(), props.date.getMonth() + 1, props.date.getDate());
        props.onDateChange( newDate )
    }

    return <>
        <div className={s.calendar_head_month_div + " " + s.month_width}>
            <img src={iconPrev} className={s.arrows} onClick={onMonthMinusClickHandler}/>
            {fullMonth}
            <img src={iconNext} className={s.arrows} onClick={onMonthPlusClickHandler}/>
        </div>
    </>
}

export default CalendarMonths;
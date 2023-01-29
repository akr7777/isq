import { useState } from "react";
import { LineTextField } from "../labelTextField/labelLineText";
import s from "./calendar.module.css";

import iconCalendar from "../../../public/icons/icon_calendar.png";
import CalendarYears from "./calendarYears";
import CalendarMonths from "./calendarMonths";
import CalendarDays from "./calendarDays";
import clearIcon from '../../../public/icons/var_no.png';
import dayjs from 'dayjs';
import { COMMON_DATE_FORMAT } from "../../../store/features/supplierSlice";

export type CalendarPropsType = {
    choosenDate?: string,
    onDateChange: (newValue: string) => void,
}

const Calendar = (props: CalendarPropsType) => {
    // const {t} = useTranslation();

    
    const [show, setShow] = useState<boolean>(false);
    const [date, setDate] = useState<Date>();
    if (props.choosenDate && props.choosenDate.length > 0) {
        const choosenDate:Date = new Date(dayjs(props.choosenDate).year(), dayjs(props.choosenDate).month(), dayjs(props.choosenDate).date())
        setDate(choosenDate)
    }
    
        
    const [newDate, setNewDate] = useState<Date>(date || new Date());
    const [newDateText, setNewDateText] = useState<string>(date?.toLocaleDateString() || '');
    // const [error, setError] = useState<boolean>(false);

    const showCalendarClickHandler = () => {
        // debugger
        // if (!date) {
        //     setDate( new Date() )
        // }
        setShow(!show);
    }

    
    const onNewDateHandler = (newDatefromDays: Date) => {
        setDate(newDatefromDays);
        setNewDate(newDatefromDays);
        const newTextDate:string = dayjs(newDatefromDays).format(COMMON_DATE_FORMAT);

        setNewDateText(newTextDate);
        
        // props.onDateChange(newDatefromDays);
        props.onDateChange(dayjs(newDatefromDays).format(COMMON_DATE_FORMAT));
        setShow(false);
    }
    const onDateClearClickHandler = () => {
        setDate(undefined);
        setNewDateText('');
        props.onDateChange('');

    }

    const onTextInputChangeHandler = (newText: string) => {
        setNewDateText(newText)
        if (Number(newText.slice(0,4)) > 2000) {
            const dayJsObj = dayjs(newText);
            setDate(new Date(dayJsObj.year(), dayJsObj.month(), dayJsObj.date()))
        }
    }


    return <div className={s.calendar}>
        <div className={s.textDiv} >
            <LineTextField 
                type="date"
                // text={ newDate.toLocaleDateString() }
                text={newDateText}
                
                // text={ (date && date !== undefined) ? date.toLocaleDateString() : "" }
                onChangeFunction={(text: string) => onTextInputChangeHandler(text)}
                className={s.textWidth}
                icon={iconCalendar}
                onIconClickFunction={() => setShow(!show)}
                // placeholder={ t("yyyymmdd") }
                // error={error}
            />
            {
            date !== undefined && <img src={clearIcon} className={s.clearIcon} onClick={onDateClearClickHandler}/>
            }
        </div>
            

        {
            show && <>
                <div className={s.overlay} onClick={showCalendarClickHandler}></div>

                <div className={s.calendar_desctop}>
                    <CalendarYears 
                        date={newDate}
                        onDateChange={(newDate:Date) => setNewDate(newDate)}
                    />

                    <CalendarMonths 
                        date={newDate}
                        onDateChange={(newDate:Date) => setNewDate(newDate)}
                    />

                    <CalendarDays 
                        newDate={newDate}
                        chosenDate={date || new Date()}
                        onDateChange={(newDateFromDays:Date) => onNewDateHandler(newDateFromDays)}
                    />
                </div>
                
            </>
        }

    </div>
}

export default Calendar;
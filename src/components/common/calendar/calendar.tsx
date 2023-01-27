import { createRef, useState } from "react";
import { LineTextField } from "../labelTextField/labelLineText";
import s from "./calendar.module.css";

import iconCalendar from "../../../public/icons/icon_calendar.png";
import CalendarYears from "./calendarYears";
import CalendarMonths from "./calendarMonths";
import CalendarDays from "./calendarDays";
import { useTranslation } from "react-i18next";

import clearIcon from '../../../public/icons/var_no.png';
import { FilterDateType } from "../../../store/features/supplierSlice";
import dayjs from 'dayjs';

export type CalendarPropsType = {
    choosenDate?: Date,
    onDateChange: (newValue: FilterDateType) => void,
}

const Calendar = (props: CalendarPropsType) => {
    const {t} = useTranslation();
    
    const [show, setShow] = useState<boolean>(false);
    const [date, setDate] = useState<Date>();
    if (props.choosenDate)
        setDate(props.choosenDate)
    
        
    const [newDate, setNewDate] = useState<Date>(date || new Date());
    const [newDateText, setNewDateText] = useState<string>(date?.toLocaleDateString() || '');
    // const [error, setError] = useState<boolean>(false);

    const showCalendarClickHandler = () => {
        if (!date) {
            setDate( new Date() )
        }
        setShow(!show);
    }

    // console.log("calendar / date=", typeof dayjs(new Date()).format("YYYY-MM-DD"));
    
    const onNewDateHandler = (newDatefromDays: Date) => {
        setDate(newDatefromDays);
        setNewDate(newDatefromDays);
        // setNewDateText(newDatefromDays.toLocaleDateString())
        // const newTextDate:string = String(newDatefromDays.getFullYear()) + "-" + String(newDatefromDays.getMonth()) + "-" + String(newDatefromDays.getDate())
        const newTextDate:string = dayjs(newDatefromDays).format("YYYY-MM-DD");

        setNewDateText(newTextDate);
        
        props.onDateChange(newDatefromDays);
        setShow(false);
    }
    const onDateClearClickHandler = () => {
        setDate(undefined);
        setNewDateText('');
        props.onDateChange(undefined);

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
                // text={date ? dayjs(date).format("YYYY-MM-DD") : ""}
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
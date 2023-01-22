import { useState } from "react";
import { LineTextField } from "../labelTextField/labelLineText";
import s from "./calendar.module.css";

import iconCalendar from "../../../public/icons/icon_calendar.png";
import CalendarYears from "./calendarYears";
import CalendarMonths from "./calendarMonths";
import CalendarDays from "./calendarDays";


const enDateFormat = 'EN_DATE_FORMAT';
const ruDateFormat = 'RU_DATE_FORMAT';
export type dateFormat = typeof enDateFormat | typeof ruDateFormat;

export type CalendarPropsType = {
    choosenDate?: Date,
    onDateChange: (newValue: Date) => void,
}

const Calendar = (props: CalendarPropsType) => {
    const [show, setShow] = useState<boolean>(false);
    const [date, setDate] = useState<Date>();
    const [newDate, setNewDate] = useState<Date>(date || new Date());

    const showCalendarClickHandler = () => {
        if (!date) {
            setDate( new Date() )
        }
        setShow(!show);
    }
    const onNewDateHandler = (newDatefromDays: Date) => {
        setDate(newDatefromDays);
        setNewDate(newDatefromDays);
        props.onDateChange(newDatefromDays);
    }

    const onTextInputChangeHandler = (newText: string) => {
        // let date:Date;
        // try {
        //     date = Date.parse(newText)
        // }
        alert(newText);
    }

    return <div className={s.calendar}>
        <div className={s.textDiv} >
            <LineTextField 
                type="text"
                text={ (date && date !== undefined) ? date.toLocaleDateString() : "" }
                onChangeFunction={(text: string) => onTextInputChangeHandler(text)}
                className={s.textWidth}
                icon={iconCalendar}
                onIconClickFunction={() => setShow(!show)}
            />
        </div>
        

        {
            show && <>
                <div className={s.overlay} onClick={showCalendarClickHandler}></div>

                <div className={s.calendar_desctop}>
                    {/* Calendar!!! */}
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
import { useState } from "react";
import { LineTextField } from "../labelTextField/labelLineText";
import s from "./calendar.module.css";

import iconCalendar from "../../../public/icons/icon_calendar.png";
import CalendarYears from "./calendarYears";
import CalendarMonths from "./calendarMonths";
import CalendarDays from "./calendarDays";
import { useTranslation } from "react-i18next";

import clearIcon from '../../../public/icons/var_no.png';
import { FilterDateType } from "../../../store/features/supplierSlice";

// const enDateFormat = 'EN_DATE_FORMAT';
// const ruDateFormat = 'RU_DATE_FORMAT';
// export type dateFormat = typeof enDateFormat | typeof ruDateFormat;

export type CalendarPropsType = {
    choosenDate?: Date,
    onDateChange: (newValue: FilterDateType) => void,
}

const Calendar = (props: CalendarPropsType) => {
    const {t} = useTranslation();
    
    const [show, setShow] = useState<boolean>(false);
    const [date, setDate] = useState<FilterDateType>();
    const [newDate, setNewDate] = useState<Date>(date || new Date());
    const [newDateText, setNewDateText] = useState<string>(date?.toLocaleDateString() || '');
    const [error, setError] = useState<boolean>(false);
    // console.log('Calendar / newDateText=', newDateText);
    

    const showCalendarClickHandler = () => {
        if (!date) {
            setDate( new Date() )
        }
        setShow(!show);
    }
    const onNewDateHandler = (newDatefromDays: Date) => {
        setDate(newDatefromDays);
        setNewDate(newDatefromDays);
        setNewDateText(newDatefromDays.toLocaleDateString())
        props.onDateChange(newDatefromDays);
        setShow(false);
    }
    const onDateClearClickHandler = () => {
        setDate(undefined);
        setNewDateText('');
        props.onDateChange(undefined);

    }

    const onTextInputChangeHandler = (newText: string) => {
        const newTextArr = newText.split('-');
        const conditionDateFormat:boolean = 
            newTextArr.length === 3 &&
            newTextArr[0].length === 4 &&
            ( newTextArr[1].length === 2 && Number(newTextArr[1]) > 0 && Number(newTextArr[1]) < 13) &&
            ( newTextArr[2].length === 2 && Number(newTextArr[2]) > 0 && Number(newTextArr[2]) < 32)
        
        if (conditionDateFormat) {
            // let date:Date;
            try {
                // date = new Date(Date.parse(newText));
                setDate(new Date(Date.parse(newText)));
                // alert("!!!" + date.toLocaleDateString());
            } catch(e) {
                console.log('onTextInputChangeHandler / dateParseError:', e);
            }
        }

        setError(false);
        if (newText.length === 10 && !conditionDateFormat) {
            setError(true);
        }

        setNewDateText(newText);
        
        // alert(newText);
    }

    return <div className={s.calendar}>
        <div className={s.textDiv} >
            <LineTextField 
                type="text"
                text={ newDateText }
                // text={ (date && date !== undefined) ? date.toLocaleDateString() : "" }
                onChangeFunction={(text: string) => onTextInputChangeHandler(text)}
                className={s.textWidth}
                icon={iconCalendar}
                onIconClickFunction={() => setShow(!show)}
                placeholder={ t("yyyymmdd") }
                error={error}
            />
            {
            date !== undefined && <img src={clearIcon} className={s.clearIcon} onClick={onDateClearClickHandler}/>
            }
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
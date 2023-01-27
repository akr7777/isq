import s from './calendar.module.css';

const weekRu = ['П', 'В', 'C', 'Ч', 'П', 'C', 'В'];
const weekEn = ['M', "T", "W", "T", "F", "S", "S"];

export type CalendarDaysPropsType = {
    chosenDate: Date,
    newDate: Date,
    onDateChange: (newDate: Date) => void,
}
function daysCountinMonth(date: Date) {
    return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
}
function numberCountArray(n: number):Array<number> {
    const arr:Array<number> = [];
    let count:number = n;
    if (count === -1)
        count = 6;
    for (let i=1; i<=count; i++)
        arr.push(i);
    return arr;
}


const CalendarDays = (props: CalendarDaysPropsType) => {
    
    // const currentMonth = props.date.getMonth();
    // const fullMonth = props.date.toLocaleString('ru', {month: 'long'});

    // const onMonthMinusClickHandler = () => {
    //     newDate.setFullYear(currentMonth - 1);
    //     props.onDateChange( newDate )
    // }
    // const onMonthPlusClickHandler = () => {
    //     newDate.setMonth(currentMonth + 1);
    //     props.onDateChange( newDate )
    // }

    // const options = { weekday: 'long' as const, year: 'numeric'  as const, month: 'long'  as const, day: 'numeric'  as const };
    // const options = { weekday: 'long' as const };
    const daysCountArr:Array<number> = numberCountArray(daysCountinMonth(props.newDate));

    const currentDayOfWeekArr:Array<number> = numberCountArray(new Date(props.newDate.getFullYear(), props.newDate.getMonth(), 1).getDay() - 1);

    const onDayClickHandler = (chosenDay: number) => {
        const newDate:Date = new Date(props.newDate.getFullYear(), props.newDate.getMonth(), chosenDay);
        // alert(newDate)
        props.onDateChange(newDate);
    }

    const markedDayCondition = (day: number):boolean => {
        return props.chosenDate.toLocaleDateString() === new Date(props.newDate.getFullYear(), props.newDate.getMonth(), day).toLocaleDateString()
            ?  true : false
    } 

    // console.log('CalendarDays / props.newDate=', props.newDate, '\n choosenDate=', props.chosenDate);
    

    return <>
        <div className={s.calendar_head_days_div + " " + s.days_width}>
            {/* <label>{props.date.getFullYear()}/{props.date.getMonth()}/{props.date.getDate()} === {props.date.getDay()}</label> */}
            {/* {props.date.toLocaleDateString()} */}
            {/* {props.date.toLocaleString('en-US', options)} */}
            {/* {daysCountinMonth(props.date)} */}
            <div className={s.calendar_days_fields_div}>
                {
                    weekRu.map((el:string, i:number) => <label key={"letter_"+i} className={s.td_tr}>{el}</label>)
                }
                {
                    currentDayOfWeekArr.map((el:number,i:number) => <label key={"empty_"+el} className={s.td_tr}></label>)
                }
                {
                    daysCountArr.map( (d:number, i:number) => {
                        return <div 
                                    key={'day_'+i}
                                    className={
                                        markedDayCondition(d)
                                            ? s.calendar_oneDayField + " " + s.calendar_oneDayField_checked
                                            : s.calendar_oneDayField
                                    }
                                    onClick={() => onDayClickHandler(d)}
                                >
                            {d}
                        </div>
                    })
                }

            </div>
            {/* <img src={iconPrev} className={s.arrows} onClick={onMonthMinusClickHandler}/>
            {fullMonth}
            <img src={iconNext} className={s.arrows} onClick={onMonthPlusClickHandler}/> */}
        </div>
    </>
}

export default CalendarDays;
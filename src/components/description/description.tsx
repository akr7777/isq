import dayjs from "dayjs";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserIdType } from "../../store/features/authSlice";
import { RootState } from "../../store/store";
import Calendar from "../common/calendar/calendar";
import Cal from "../common/calendar2/cal";
import s from './description.module.css';

const Description = () => {
    const { t } = useTranslation();
    // const userId:UserIdType = useSelector((state:RootState) => state.auth.userId);

    // console.log('dayjs()=', dayjs().format("YYYY-MM-DD"));
    // console.log('DESCRIPTION day=', dayjs('1985-12-23'), typeof dayjs('1985-12-23'));
    // console.log('DESCRIPTION day=', dayjs('1985-12-23'), typeof dayjs('1985-12-23'));
    // console.log(dayjs('1985-12-23').year(), typeof dayjs('1985-12-23').year());
    // console.log(dayjs('1985-12-23').month(), typeof dayjs('1985-12-23').month());
    // console.log(dayjs('1985-12-23').day(), typeof dayjs('1985-12-23').day());
    
    
    return <div className={s.description}>

        { t("main_page_text_1")}

        ЭТО ГЛАВНАЯ СТРАНИЦА.

       
        <Calendar onDateChange={()=> {}}/>
        ккк
        <input autoFocus type="text" maxLength={2} size={2}/>
        <input  type="text" maxLength={2} size={2}/>
        <input  type="text" maxLength={4} size={4}/>
       
        
        {/* 111<Cal/>222 */}
        <ul>
            <li>Посмоттреть статьи о стандартных цветах кнопок</li>
            <li>Сделать в календаре отображение дат в формате EU и US</li>
            <li>Исправить баг, связанный с тем, что в localStorage одни значения настроек, а по факту - другие (возможно, из-за non-serialized)</li>
            <li>Разобраться с ошибкой non-serialized, из-за которой некоторые функции не работают корректно</li>
            <li>Сделать для даты невозможность вводить ничего, кроме цифр и также установить шаблон nn.nn.nnnn или nn/nn/nnnn</li>
            <li>сделать ссылку в input на странице, когда новый поставщик создан</li>
            <li>Исправить баг в Профайле: не происходит смены настроек</li>
        </ul>
    </div>
}

export default Description
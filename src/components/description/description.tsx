import { t } from "i18next";
import { useEffect } from "react";
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
    const userId:UserIdType = useSelector((state:RootState) => state.auth.userId);

    return <div className={s.description}>

        { t("main_page_text_1")}

        ЭТО ГЛАВНАЯ СТРАНИЦА. ДЛЯ ВХОДА СЮДА НЕ НЕЖНА АУТЕНТИФИКАЦИЯ. ЗДЕСЬ МОЖЕТ БЫТЬ ОПИСАНИЕ ПРИЛОЖЕНИЯ

        <br />
        userId: {userId} 
        <br/><br/>
        dksfjgsdf
        <Calendar onDateChange={()=> {}}/>
        dsjflh
        <br />
        dsjflh
        <br />dsjflh
        <br />
        {/* 111<Cal/>222 */}
        <ul>
            <li>Header: либо уже, либо убрать Логотип</li>
            <li>Pagination</li>
            <li>Навесить иконки на input-ы</li>
            <li>Посмоттреть статьи о стандартных цветах кнопок</li>
            <li>Сделать в календаре отображение дат в формате EU и US</li>
            <li>Исправить баг, связанный с тем, что в localStorage одни значения настроек, а по факту - другие (возможно, из-за non-serialized)</li>
            <li>Разобраться с ошибкой non-serialized, из-за которой некоторые функции не работают корректно</li>
            <li>Сделать удобные клики или фокусы на кнопках и полях воода, чтобы пользователю не надо было кликать больше, чем нужно</li>
        </ul>
    </div>
}

export default Description
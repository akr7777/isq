import { useTranslation } from "react-i18next";
import Calendar from "../common/calendar/calendar";
import s from './description.module.css';

const Description = () => {
    const { t } = useTranslation();    
    return <div className={s.description}>

        { t("main_page_text_1")}

        <Calendar onDateChange={()=> {}}/>
       
        <input type="date" name="bday" required pattern="\d{4}-\d{2}-\d{2}" />

        <ul>
            <li>Посмоттреть статьи о стандартных цветах кнопок</li>
            {/* <li>---------------------Сделать в календаре отображение дат в формате EU и US</li> */}
            {/* <li>Календарь popup сделать отображение дней недели на разных языках (П В С Ч П С В)</li> */}
            <li>OptionforSearchDate : очистить закомментитрвоанный код</li>
            {/* <li>Исправить баг с поиском по диапазону дат (множественный rerendering)</li> */}
            {/* <li>Возмоно, сделать ссылку на dashboard когда новый поставщик создан</li> */}
            {/* <li>Сделать input на ссылке на вновь созданного поставщика</li> */}
            {/* <li>Из страницы нового поставщика сделать ссылку на dashboard</li> */}
            <li>Запрос на сервер при поиске через 1 сек</li>
        </ul>
    </div>
}

export default Description
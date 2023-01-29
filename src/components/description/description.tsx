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
            <li>EditSuppliers сделать</li>
            <li>Сделать кнопку удаления компании на странице companyCard</li>
            <li>Сделать прелоадеры для необходимыхз элементов, когда сервер будет готов</li>
        </ul>
    </div>
}

export default Description
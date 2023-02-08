import { useTranslation } from "react-i18next";
import Calendar from "../common/calendar/calendar";
import s from './description.module.css';

const Description = () => {
    const { t } = useTranslation();  
    const xss = <script>alert('this is xss!')</script>  
    return <div className={s.description}>

        {/* { t("main_page_text_1")} */}
        
        { xss }

        <ul>
            <li>EditSuppliers сделать</li>
            <li>Сделать кнопку удаления компании на странице companyCard</li>
            <li>Сделать прелоадеры для необходимыхз элементов, когда сервер будет готов</li>
            <li>Навесить react.lazy() на все большие компоненты</li>
            <li>ЗАвершить функцию редактирования имени и username в Profile</li>
        </ul>
    </div>
}

export default Description
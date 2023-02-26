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
            <li>Список компаний: dashboard : сделвть центровку</li>
            <li>поставить длинные тире на странце supplier card</li>
            
        </ul>
    </div>
}

export default Description
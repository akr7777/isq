import { t } from "i18next";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserIdType } from "../../store/features/authSlice";
import { RootState } from "../../store/store";
import s from './description.module.css';

const Description = () => {
    const { t } = useTranslation();

    // let navigate = useNavigate();
    // const userId:UserIdType = useSelector( (state: RootState) => state.auth.userId);
    // const isAuth:boolean = userId ? true : false;

    // useEffect(() => {
    // if (!isAuth){
    //     return navigate("/login");
    // }
    // },[isAuth]);

    const userId:UserIdType = useSelector((state:RootState) => state.auth.userId);

    return <div className={s.description}>

        { t("main_page_text_1")}

        ЭТО ГЛАВНАЯ СТРАНИЦА. ДЛЯ ВХОДА СЮДА НЕ НЕЖНА АУТЕНТИФИКАЦИЯ. ЗДЕСЬ МОЖЕТ БЫТЬ ОПИСАНИЕ ПРИЛОЖЕНИЯ

        <br />
        userId: {userId} 
        
    </div>
}

export default Description
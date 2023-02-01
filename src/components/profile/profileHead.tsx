import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ava from "./../../public/images/ava.jpg";
import s from './profile.module.css';
import ProfileHeadFieldName from "./profileHeadName";

const ProfileHead = () => {
    const {t} = useTranslation();
    const myUsername: string = useSelector((state: RootState) => state.auth.username);

    return <div className={s.profile_head}>
        <img src={ava} className={s.avaImg} alt="Заменить аватар" />

        <ProfileHeadFieldName />

        <div className={s.line_div}>
            <label>{t("profile_username")}:</label>
            <h2>{myUsername}</h2>
        </div>

        {/* 
            <ProfileHeadField 
                text={ t("profile_role") }
                value={profileRole}
                onChangeFunction={(newValue: string) => onProfileRoleChangeHandler(newValue)}
            />
        */}
    </div>
}

export default ProfileHead;
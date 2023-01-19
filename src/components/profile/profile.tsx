import s from "./profile.module.css";
import Checker from "./checker";
import ava from "./../../public/images/ava.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { RoleType } from "../../store/features/authSlice";
import { t } from "i18next";

const Profile = () => {
    const userRole:RoleType = useSelector((state: RootState) => state.auth.role);
    const userName:string = useSelector((state: RootState) => state.auth.name);

    return <div className={s.profileWrappedDiv}>

        <img src={ava} className={s.avaImg} alt="Заменить аватар" />

        {/* <div className={s.profile_info}>
            <label>Имя:</label>
            <h2>{userName}</h2>

            <label>Роль:</label>
            <h2>{userRole}</h2>
        </div> */}

        <div>
            <div className={s.line_div}>
                <label>{ t("profile_name") }:</label>
                <h2>{userName}</h2>
            </div>

            <div className={s.line_div}>
                <label>{ t("profile_role") }:</label>
                <h2>{userRole}</h2>
            </div>
        </div>

        <Checker />

    </div>
}

export default Profile;
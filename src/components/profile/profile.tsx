import s from "./profile.module.css";
import TableBrickChecker from "./interfaceTableView";
import ava from "./../../public/images/ava.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { RoleType } from "../../store/features/authSlice";
import { useTranslation } from "react-i18next";
import ProfileRiskViewChecker from "./interfaceRiskView";
import InterfaceDateFormat from "./interfaceDataFormat";
import InterfacePageSizing from "./interfacePageSizing";


const Profile = () => {
    const userRole:RoleType = useSelector((state: RootState) => state.auth.role);
    const userName:string = useSelector((state: RootState) => state.auth.name);
    const { t } = useTranslation();


    return <div className={s.profileWrappedDiv}>

        <img src={ava} className={s.avaImg} alt="Заменить аватар" />

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


        <h2>{ t("profile_user_interface_settings") }</h2>
        <div className={s.user_interface_settings}>
            <TableBrickChecker />
            <ProfileRiskViewChecker />
            <InterfaceDateFormat />
            <InterfacePageSizing />
        </div>

        

        
        
        <button>Редактировать список поставщиков</button>

    </div>
}

export default Profile;
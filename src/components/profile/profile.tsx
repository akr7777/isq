import s from "./profile.module.css";
import TableBrickChecker from "./interfaceTableView";
import ava from "./../../public/images/ava.jpg";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { ADMIN_USER_ROLE, MANAGER_USER_ROLE, RoleType } from "../../store/features/authSlice";
import { useTranslation } from "react-i18next";
import ProfileRiskViewChecker from "./interfaceRiskView";
import InterfaceDateFormat from "./interfaceDataFormat";
import InterfacePageSizing from "./interfacePageSizing";
import { ButtonCancel } from "../common/buttons/buttons";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../outlet/outlet";
import { useEffect } from "react";
import { profileThunk } from "../../store/features/authThunks";


const Profile = () => {
    // const userRole:RoleType = useSelector((state: RootState) => state.auth.role);
    const userName:string = useSelector((state: RootState) => state.auth.name);
    const { t } = useTranslation();
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect( () => {
        dispatch(profileThunk());
    }, []);


    return <div className={s.profileWrappedDiv}>

        <img src={ava} className={s.avaImg} alt="Заменить аватар" />

        <div>
            <div className={s.line_div}>
                <label>{ t("profile_name") }:</label>
                <h2>{userName}</h2>
            </div>

            {/* <div className={s.line_div}>
                <label>{ t("profile_role") }:</label>
                <h2>{userRole}</h2>
            </div> */}
        </div>


        <h2>{ t("profile_user_interface_settings") }</h2>
        <div className={s.user_interface_settings}>
            <TableBrickChecker />
            <ProfileRiskViewChecker />
            <InterfaceDateFormat />
            <InterfacePageSizing />
        </div>
        
        {/* {
            ( userRole === ADMIN_USER_ROLE || userRole === MANAGER_USER_ROLE) &&  
                <ButtonCancel
                    text={ t("edit_suppliers_list") }
                    onClickFunction={() => navigate(PATHS.editSuppliers)}
                />
        } */}

    </div>
}

export default Profile;
import s from "./profile.module.css";
import TableBrickChecker from "./interfaceTableView";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { useTranslation } from "react-i18next";
import ProfileRiskViewChecker from "./interfaceRiskView";
import InterfaceDateFormat from "./interfaceDataFormat";
import InterfacePageSizing from "./interfacePageSizing";
import { useEffect } from "react";
import { getProfileThunk } from "../../store/features/authThunks";
import Preloader from "../common/preloader/preloader";
import ProfileHead from "./profileHead";


const Profile = () => {
    // const userRole:RoleType = useSelector((state: RootState) => state.auth.role);
    const { t } = useTranslation();
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect( () => {
        dispatch(getProfileThunk());
    }, []);

    const isLoading:boolean = useSelector((state:RootState) => state.auth.loadingStatus.profileRequestLoadingStatus);

    return <>
        {
            isLoading
                ? <div className={s.profileWrappedDiv}>
                    <Preloader />
                </div>
                : <div className={s.profileWrappedDiv}>

                    <ProfileHead />    
        
                    <h2>{ t("profile_user_interface_settings") }</h2>
                    <div className={s.user_interface_settings}>
                        <TableBrickChecker />
                        <ProfileRiskViewChecker />
                        <InterfaceDateFormat />
                        <InterfacePageSizing />
                        {/* <div className={s.user_interface_settings_one_block}>
                            <Preloader/>
                        </div> */}
                    </div>
                    
            </div>
        }
    </>
}

export default Profile;
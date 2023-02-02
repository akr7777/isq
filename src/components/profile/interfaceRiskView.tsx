import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { useTranslation } from "react-i18next";
import { RadioLabelOptionType, RadioLabels } from "../common/radioLabels/radioLabels";
import s from './profile.module.css';
import { changeLoadingStatus, RiskViewSTAR, RiskViewType, RiskViewWORD } from "../../store/features/authSlice";
import { updateProfileThunk } from "../../store/features/authThunks";
import Preloader from "../common/preloader/preloader";

const ProfileRiskViewChecker = () => {
    // const myName:string = useSelector((state:RootState) => state.auth.name);

    // const userSettings:ProfileUserSettingsType = useSelector((state:RootState) => state.auth.userSettings);
    const riskView:RiskViewType = useSelector((state:RootState) => state.auth.userSettings.risk_format);
    const isLoading: boolean = useSelector((state:RootState) => state.auth.loadingStatus.riskFormatLoadingStatus);
    
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const onViewChangeClickHandler = (newValue: string) => {
        if (newValue === RiskViewSTAR || newValue === RiskViewWORD) {
            // const dataForThunk:ProfileRequestType = {
            //     ...userSettings,
            //     risk_format: newValue,
            //     name: myName,
            // }
            dispatch(changeLoadingStatus({field: "riskFormatLoadingStatus", newValue: true}))
            dispatch(updateProfileThunk({risk_format: newValue}));
        }
    }

    const options:Array<RadioLabelOptionType> = [
        {
            text: t("profile_risk_view_word"),
            value: RiskViewWORD,
        },
        {
            text: t("profile_risk_view_star"),
            value: RiskViewSTAR,
        }
    ]
    
    return <>
        {
            isLoading
                ? <div className={s.user_interface_settings_one_block + " " + s.user_interface_settings_one_block_loading}>
                    <Preloader />
                </div>
                : <div className={s.user_interface_settings_one_block}>
                    <h3>{ t("profile_risk_view_title") }</h3>
                    <RadioLabels 
                        options={options}
                        defaultOption={riskView}
                        onClickFunction={(newValue: string) => onViewChangeClickHandler(newValue)}
                    />
                </div>
        }
    </>
}

export default ProfileRiskViewChecker;
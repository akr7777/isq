import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { useTranslation } from "react-i18next";
import { RadioLabelOptionType, RadioLabels } from "../common/radioLabels/radioLabels";
import s from './profile.module.css';
import { changeLoadingStatus, DATE_EU, DATE_US, FormatDateType, ProfileUserSettingsType } from "../../store/features/authSlice";
import { ProfileRequestType, updateProfileThunk } from "../../store/features/authThunks";
import Preloader from "../common/preloader/preloader";

const InterfaceDateFormat = () => {
    // const myName:string = useSelector((state:RootState) => state.auth.name);
    // const userName:string = useSelector((state: RootState) => state.auth.username);

    // const userSettings:ProfileUserSettingsType = useSelector((state:RootState) => state.auth.userSettings);
    const dateFormat:FormatDateType = useSelector((state:RootState) => state.auth.userSettings.date_format);
    const isLoading: boolean = useSelector((state:RootState) => state.auth.loadingStatus.dateFormatLoadingStatus);

    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const onViewChangeClickHandler = (newValue: string) => {
        if (newValue === DATE_EU || newValue === DATE_US) {
            // const dataForThunk:ProfileRequestType = {
            //     ...userSettings,
            //     date_format: newValue,
            //     name: myName,
            // }
            dispatch(changeLoadingStatus({field: "dateFormatLoadingStatus", newValue: true}))
            dispatch(updateProfileThunk({date_format: newValue,}));
        }
    }

    const options:Array<RadioLabelOptionType> = [
        {
            text: t("profile_date_format_EU"),
            value: DATE_EU,
        },
        {
            text: t("profile_date_format_US"),
            value: DATE_US,
        }
    ]
    
    return <>
        {
            isLoading
                ? <div className={s.user_interface_settings_one_block + " " + s.user_interface_settings_one_block_loading}>
                    <Preloader />
                </div>
                : <div className={s.user_interface_settings_one_block}>
                    <h3>{ t("profile_date_format_title") }</h3>
                    <RadioLabels 
                        options={options}
                        defaultOption={dateFormat}
                        onClickFunction={(newValue: string) => onViewChangeClickHandler(newValue)}
                    />
                </div>
        }
    </>
}

export default InterfaceDateFormat;
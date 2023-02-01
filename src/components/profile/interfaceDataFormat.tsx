import { useSelector } from "react-redux";
// import { DATE_EU, DATE_US, FormatDateType, userDateFormatChangeAC } from "../../store/features/supplierSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { useTranslation } from "react-i18next";
import { RadioLabelOptionType, RadioLabels } from "../common/radioLabels/radioLabels";
import s from './profile.module.css';
import { DATE_EU, DATE_US, FormatDateType, ProfileUserSettingsType } from "../../store/features/authSlice";
import { ProfileRequestResponseType, updateProfileThunk } from "../../store/features/authThunks";

const InterfaceDateFormat = () => {
    const myName:string = useSelector((state:RootState) => state.auth.name);
    const userName:string = useSelector((state: RootState) => state.auth.username);

    // const dateFormat:FormatDateType = useSelector((state:RootState) => state.supplier.settings.userDateFormat);
    const userSettings:ProfileUserSettingsType = useSelector((state:RootState) => state.auth.userSettings);
    const dateFormat:FormatDateType = userSettings.date_format;

    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const onViewChangeClickHandler = (newValue: string) => {
        if (newValue === DATE_EU || newValue === DATE_US) {
            const dataForThunk:ProfileRequestResponseType = {
                ...userSettings,
                date_format: newValue,
                name: myName,
                username: userName,
            }
            dispatch(updateProfileThunk(dataForThunk));
            // dispatch(userDateFormatChangeAC(val));
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
    
    return <div className={s.user_interface_settings_one_block}>
         <h3>{ t("profile_date_format_title") }</h3>
        <RadioLabels 
            options={options}
            defaultOption={dateFormat}
            onClickFunction={(newValue: string) => onViewChangeClickHandler(newValue)}
        />
    </div>
}

export default InterfaceDateFormat;
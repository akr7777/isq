import { useSelector } from "react-redux";
import { DATE_EU, DATE_US, FormatDataType, userDateFormatChangeAC } from "../../store/features/supplierSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { useTranslation } from "react-i18next";
import { RadioLabelOptionType, RadioLabels } from "../common/radioLabels/radioLabels";
import s from './profile.module.css';

const InterfaceDateFormat = () => {

    const dateFormat:FormatDataType = useSelector((state:RootState) => state.supplier.settings.userDateFormat);
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const onViewChangeClickHandler = (val: string) => {
        if (val === DATE_EU || val === DATE_US) {
            dispatch(userDateFormatChangeAC(val));
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
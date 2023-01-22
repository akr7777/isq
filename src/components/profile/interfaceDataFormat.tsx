import { useSelector } from "react-redux";
import { changeRiskInLineAC, RiskViewSTAR, RiskViewType, RiskViewWORD } from "../../store/features/supplierSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { useTranslation } from "react-i18next";
import { RadioLabelOptionType, RadioLabels } from "../common/radioLabels/radioLabels";
import s from './profile.module.css';

const InterfaceDateFormat = () => {

    const riskView:RiskViewType = useSelector((state:RootState) => state.supplier.riskView);
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const onViewChangeClickHandler = (val: string) => {
        if (val === RiskViewSTAR || val === RiskViewWORD) {
            dispatch(changeRiskInLineAC(val));
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
    
    return <div className={s.user_interface_settings_one_block}>
         <h3>{ t("profile_date_format_title") }</h3>
        <RadioLabels 
            options={options}
            defaultOption={riskView}
            onClickFunction={(newValue: string) => onViewChangeClickHandler(newValue)}
        />
    </div>
}

export default InterfaceDateFormat;
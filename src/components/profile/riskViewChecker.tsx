import { useSelector } from "react-redux";
import { changeRiskInLineAC, RiskViewSTAR, RiskViewType, RiskViewWORD } from "../../store/features/supplierSlice";
import { RootState, useAppDispatch } from "../../store/store";
import s from "./profile.module.css";
import { useTranslation } from "react-i18next";
import { MouseEvent } from "react";


const ProfileRiskViewChecker = () => {

    const riskView:RiskViewType = useSelector((state:RootState) => state.supplier.riskView);
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const onViewChangeClickHandler = (e: MouseEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === RiskViewSTAR || e.currentTarget.value === RiskViewWORD) {
            dispatch(changeRiskInLineAC(e.currentTarget.value));
        }
    }

    
    return <fieldset>
        <legend className={s.myLegend}><h4>{ t("profile_risk_view_title") }</h4></legend>

        <div className={s.input_div}>
            <input type="radio" id="word" name="word" 
                className={
                    riskView === RiskViewWORD
                        ? s.ligend_input + " " + s.ligend_input_checked
                        : s.ligend_input
                }
                value={RiskViewWORD}
                onClick={(e) => onViewChangeClickHandler(e)}
            />
            <label 
                htmlFor="word"
                className={ riskView === RiskViewWORD 
                                ? s.ligend_label + " " + s.ligend_label_checked
                                : s.ligend_label
                        }
            >
                { t("profile_risk_view_word") }
            </label>
        </div>

        <div className={s.input_div}>
            <input type="radio" id="star" name="star" 
                className={
                    riskView === RiskViewSTAR
                        ? s.ligend_input + " " + s.ligend_input_checked
                        : s.ligend_input
                }
                value={RiskViewSTAR}
                onClick={(e) => onViewChangeClickHandler(e)}
            />
            <label 
                htmlFor="star"
                className={ riskView === RiskViewSTAR 
                    ? s.ligend_label + " " + s.ligend_label_checked
                    : s.ligend_label
            }
            >
                { t("profile_risk_view_star") }
            </label>
        </div>

        
    </fieldset>
}

export default ProfileRiskViewChecker;
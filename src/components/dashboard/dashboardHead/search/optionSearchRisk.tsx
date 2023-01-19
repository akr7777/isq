import { t } from "i18next";
import { useSelector } from "react-redux";
import { searchByRiskAC, RiskType, RISK_HIGH, RISK_LOW, RISK_MEDIUM } from "../../../../store/features/supplierSlice";
import { RootState, useAppDispatch } from "../../../../store/store";
import s from "./search.module.css";

const SearchRisk = () => {
    const searchRisk:RiskType = useSelector((state:RootState) => state.supplier.searchByRisk);
    const dispatch = useAppDispatch();
    
    const onRiskChangeClickHandler = (newRisk:RiskType) => {
        dispatch(searchByRiskAC(newRisk))
    }
    return <div className={s.riskMainDiv}>

        <label>{ t("search_risks") }</label>

        <div className={
            searchRisk === undefined
                ? s.riskOption + " " + s.riskUndefinedChecked
                : s.riskOption + " " + s.riskUndefined
            }
            onClick={() => onRiskChangeClickHandler(undefined)}
        >
            All
        </div>

        <div className={
            searchRisk === RISK_LOW
                ? s.riskOption + " " + s.riskLowChecked
                : s.riskOption + " " + s.riskLow
            }
            onClick={() => onRiskChangeClickHandler(RISK_LOW)}
        >
            Low
        </div>
        
        <div className={
            searchRisk === RISK_MEDIUM
                ? s.riskOption + " " + s.riskMediumChecked
                : s.riskOption + " " + s.riskMedium
            }
            onClick={() => onRiskChangeClickHandler(RISK_MEDIUM)}
        >
            Medium
        </div>

        <div className={
            searchRisk === RISK_HIGH
                ? s.riskOption + " " + s.riskHighChecked
                : s.riskOption + " " + s.riskHigh
            }
            onClick={() => onRiskChangeClickHandler(RISK_HIGH)}
        >
            High
        </div>
    </div>
}

export default SearchRisk;
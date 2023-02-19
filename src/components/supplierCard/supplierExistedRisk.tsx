import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RISK_HIGH, RISK_LOW, RISK_MEDIUM, RiskType } from "../../store/features/supplierSlice";
import { RootState } from "../../store/store";
import cardStyle from "./card.module.css";

const SupplierExistedRisk = () => {
    const {t} = useTranslation();

    const currentRisk:RiskType = useSelector((state:RootState) => state.complited.riskLevel);
    // const currentComment:string = useSelector((state:RootState) => state.complited.comment);

    return <div className={cardStyle.existedRisk + " " + cardStyle.appearance}>
        <div className={cardStyle.risks}>
            <h1 className={
                currentRisk === RISK_LOW
                    ? cardStyle.low
                    : currentRisk === RISK_MEDIUM
                        ? cardStyle.medium
                        : currentRisk === RISK_HIGH
                            ? cardStyle.high
                            : ""
            }>
                {currentRisk}
            </h1>
        </div>

        <div className={cardStyle.commentLabel}>
            <label className={cardStyle.label_title_2}>
                { t("supplierCard_comment") }
            </label>
            <p>
                -----Тут должен быть текст комментария. Что отобразить, если комментария нет?-----
                {/* {currentComment} */}
            </p>
        </div>
    </div>
}

export default SupplierExistedRisk;
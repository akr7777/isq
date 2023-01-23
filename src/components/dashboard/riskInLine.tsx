import { useSelector } from "react-redux";

import starBlack from "../../public/icons/icon_star_black.png" //../../../  ../../public/icons/icon_star_black.png";
import starGreen from "../../public/icons/icon_star_green.png";
import starRed from "../../public/icons/icon_star_red.png";
import starYellow from "../../public/icons/icon_star_yellow.png";

import { RiskType, RiskViewType, RiskViewWORD, RISK_LOW, RISK_MEDIUM } from "../../store/features/supplierSlice";
import { RootState } from "../../store/store";

import dbStyles from './dashboard.module.css';

type RiskInLinePropsType = { risk: RiskType }
const RiskInLine = ({risk}: RiskInLinePropsType) => {
    const riskView:RiskViewType = useSelector((state: RootState) => state.supplier.settings.riskView);

    return <>
         {
            riskView === RiskViewWORD
                ? risk !== undefined && <div
                    className={
                        risk === RISK_LOW
                            ? dbStyles.risk + " " + dbStyles.risk_low
                            : risk === RISK_MEDIUM
                                ? dbStyles.risk + " " + dbStyles.risk_medium
                                : dbStyles.risk + " " + dbStyles.risk_high
                    }>
                    { risk }
                </div>
                : risk === undefined
                    ? <img src={starBlack} className={dbStyles.star}/>
                    : risk === RISK_LOW
                        ? <img src={starGreen} className={dbStyles.star}/>
                        : risk === RISK_MEDIUM
                            ? <img src={starYellow} className={dbStyles.star}/>
                            : <img src={starRed} className={dbStyles.star}/>
                
        }
    </>
}

export default RiskInLine;
import { t } from "i18next";
import { useSelector } from "react-redux";
import { SearchByComplitedType, RiskType, SEARCH_COMPLETED_FINISHED, SEARCH_COMPLETED_UNFINISHED, SupplerDataType, SupplierIdType } from "../../../store/features/supplierSlice";
import { RootState } from "../../../store/store";
import s from "./dataBricks.module.css";
import profileStyles from "./../dashboard.module.css";

import yes from './../../../public/icons/var_yes.png';
import no from './../../../public/icons/var_no.png';
import { DARK, LIGHT } from "../../../hooks/useTheme";
import { addSearchOptions } from "../dashboardHead/search/functions-for-search";
import { PATHS } from "../../outlet/outlet";
import { useNavigate } from "react-router-dom";

const DataBricks = () => {
    const searchField:string = useSelector((state:RootState) => state.supplier.search);
    const searchComplited:SearchByComplitedType = useSelector((state:RootState) => state.supplier.searchByComplited);
    const searchRisk:RiskType = useSelector((state:RootState) => state.supplier.searchByRisk);
    const searchByDateStart: string = useSelector((state: RootState) => state.supplier.searchByDateStart);
    const searchByDateEnd: string = useSelector((state: RootState) => state.supplier.searchByDateEnd);
    // let companies:SupplerDataType[] = useSelector((state:RootState) => state.supplier.suppliers)
    //     .filter( el => el.supplierName.toLowerCase().includes(searchField.toLowerCase()))
    // if (searchComplited === SEARCH_COMPLETED_FINISHED)
    //     companies = companies.filter( el => el.isComplite === true );
    // if (searchComplited === SEARCH_COMPLETED_UNFINISHED)
    //     companies = companies.filter( el => el.isComplite === false );
    // if (searchRisk === )

    const companies:SupplerDataType[] = addSearchOptions({
            array: useSelector((state:RootState) => state.supplier.suppliers), 
            searchField: searchField, 
            searchComplited: searchComplited, 
            searchRisk: searchRisk,
            searchByDateStart: searchByDateStart,
            searchByDateEnd: searchByDateEnd
        });
    
    // const theme: typeof DARK | typeof LIGHT = useSelector((state:RootState) => state.auth.userSettings.theme);

    const navigate = useNavigate();
    const onSupplierClickHandler = (supplierId: SupplierIdType) => {
        navigate(PATHS.supplierCard + "/" + String(supplierId));
    }

    return <div className={s.dataBricksWrapper}>

        <div className={s.brickHead}>
            <div className={s.brickHeadPeice}>
                <label>{ t("table_name") }</label>
            </div>
            <div className={s.brickHeadPeice}>
                <label>{ t("table_creation_date")}</label>
            </div>
            <div className={s.brickHeadPeice}>
                <label>{ t("table_is_complite") }</label>
            </div>
            <div className={s.brickHeadPeice}>
                <label>{ t("table_risk") }</label>
            </div>
        </div>

        {
            companies.map( (c:SupplerDataType, ind: number) => {
                return <div 
                            className={s.oneBrick} 
                            key={c.supplierId}
                            onClick={() => onSupplierClickHandler(c.supplierId)}
                        >
                    <div className={s.oneBrickPiece}>
                        {c.supplierName}
                    </div>
                    <div className={s.oneBrickPiece}>
                        {c.creationDate}
                    </div>
                    <div className={s.oneBrickPiece}>
                        {
                            c.isComplite
                                ? <img src={yes} className={profileStyles.icon_yes_no}/>
                                : <img src={no} className={profileStyles.icon_yes_no}/>
                        }
                    </div>
                    <div className={s.oneBrickPiece}>
                        { 
                            c.risk !== undefined && <div
                                className={
                                    c.risk === "low"
                                        ? profileStyles.risk + " " + profileStyles.risk_low
                                        : c.risk === "medium"
                                            ? profileStyles.risk + " " + profileStyles.risk_medium
                                            : profileStyles.risk + " " + profileStyles.risk_high
                                }>
                                { c.risk }
                            </div>
                        }
                    </div>
                </div>
            })
        }

    </div>
}

export default DataBricks;
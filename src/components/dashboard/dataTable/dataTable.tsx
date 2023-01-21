import { useSelector } from "react-redux";
import { SearchByComplitedType, RiskType, SupplerDataType, SupplierIdType } from "../../../store/features/supplierSlice";
import { RootState } from "../../../store/store";
import s from './dataTable.module.css';
import dashboardStyles from "./../dashboard.module.css";

import yes from './../../../public/icons/var_yes.png';
import no from './../../../public/icons/var_no.png';
import { addSearchOptions } from "../dashboardHead/search/functions-for-search";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../outlet/outlet";
import RiskInLine from "../riskInLine";
import { useTranslation } from "react-i18next";

const DataTable = () => {
    const {t} = useTranslation();
    const searchField:string = useSelector((state:RootState) => state.supplier.search);
    
    const searchComplited:SearchByComplitedType = useSelector((state:RootState) => state.supplier.searchByComplited);
    const searchRisk:RiskType = useSelector((state:RootState) => state.supplier.searchByRisk);
    const searchByDateStart: string = useSelector((state: RootState) => state.supplier.searchByDateStart);
    const searchByDateEnd: string = useSelector((state: RootState) => state.supplier.searchByDateEnd);
    
    const companies:SupplerDataType[] = addSearchOptions({
        array: useSelector((state:RootState) => state.supplier.suppliers), 
        searchField: searchField, 
        searchComplited: searchComplited, 
        searchRisk: searchRisk,
        searchByDateStart: searchByDateStart,
        searchByDateEnd: searchByDateEnd
    });

    const navigate = useNavigate();

    const onSupplierClickHandler = (supplierId: SupplierIdType) => {
        navigate(PATHS.supplierCard + "/" + String(supplierId));
    }
    
    return <>
            <table className={s.theTable}>
                <thead>
                    <tr>
                        <td>{ t("table_name") }</td>
                        <td>{ t("table_creation_date") }</td>
                        <td>{ t("table_is_complite") }</td>
                        <td>{ t("table_risk") }</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        companies.map( c => 
                            <tr className={s.theTableTr} key={c.supplierId} onClick={() => onSupplierClickHandler(c.supplierId)}>
                                <td>{c.supplierName}</td>
                                <td>{c.creationDate}</td>
                                <td>{
                                    c.isComplite
                                        ? <img src={yes} className={dashboardStyles.icon_yes_no}/>
                                        : <img src={no} className={dashboardStyles.icon_yes_no}/>
                                }</td>
                                <td>
                                    <RiskInLine risk={c.risk}/>
                                    {/* { 
                                        c.risk !== undefined && <div
                                            className={
                                                c.risk === "low"
                                                    ? dashboardStyles.risk + " " + dashboardStyles.risk_low
                                                    : c.risk === "medium"
                                                        ? dashboardStyles.risk + " " + dashboardStyles.risk_medium
                                                        : dashboardStyles.risk + " " + dashboardStyles.risk_high
                                            }>
                                            { c.risk }
                                        </div>
                                    } */}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
}

export default DataTable;
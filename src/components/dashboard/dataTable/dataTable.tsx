import { useSelector } from "react-redux";
import { SearchByComplitedType, RiskType, SupplerDataType, SupplierIdType, changeColumnNameSortingAC, changeColumnDirectionSortingAC, NAME_COLUMN_SORT, CREATION_DATE_COLUMN_SORT, COMPLITED_COLUMN_SORT, RISK_COLUMN_SORT } from "../../../store/features/supplierSlice";
import { RootState } from "../../../store/store";
import s from './dataTable.module.css';
import dashboardStyles from "./../dashboard.module.css";

import yes from './../../../public/icons/var_yes.png';
import no from './../../../public/icons/var_no.png';
import { AddSearchOptions } from "../dashboardHead/search/functions-for-search";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../outlet/outlet";
import RiskInLine from "../riskInLine";
import { useTranslation } from "react-i18next";
import SortingIcons from "../sortIcons";

const DataTable = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const companies:SupplerDataType[] = AddSearchOptions();

    const onSupplierClickHandler = (supplierId: SupplierIdType) => {
        navigate(PATHS.supplierCard + "/" + String(supplierId));
    }
    
    
    return <>
            <table className={s.theTable}>
                <thead>
                    <tr>
                        <td>
                            { t("table_name") }
                            <SortingIcons columnName={NAME_COLUMN_SORT}/>
                        </td>
                        <td>
                            { t("table_creation_date") }
                            <SortingIcons columnName={CREATION_DATE_COLUMN_SORT}/>
                        </td>
                        <td>
                            { t("table_is_complite") }
                            <SortingIcons columnName={COMPLITED_COLUMN_SORT}/>
                        </td>
                        <td>
                            { t("table_risk") }
                            <SortingIcons columnName={RISK_COLUMN_SORT}/>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        companies.map( c => 
                            <tr className={s.theTableTr} key={c.supplierId} onClick={() => onSupplierClickHandler(c.supplierId)}>
                                <td>
                                    {c.supplierName}
                                </td>
                                <td>
                                    {c.creationDate.toLocaleDateString()}
                                </td>
                                <td>{
                                        c.isComplite
                                          ? <img src={yes} className={dashboardStyles.icon_yes_no}/>
                                          : <img src={no} className={dashboardStyles.icon_yes_no}/>
                                    }
                                </td>
                                <td>
                                    <RiskInLine risk={c.risk}/>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
}

export default DataTable;
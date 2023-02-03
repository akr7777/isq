import { useSelector } from "react-redux";
import { SupplerDataType, SupplierIdType } from "../../../store/features/supplierSlice";
import { RootState, useAppDispatch } from "../../../store/store";
import s from './dataTable.module.css';
import dashboardStyles from "./../dashboard.module.css";
import yes from './../../../public/icons/var_yes.png';
import no from './../../../public/icons/var_no.png';
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../outlet/outlet";
import RiskInLine from "../riskInLine";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { FormatDateType } from "../../../store/features/authSlice";
import { useEffect } from "react";
import { getCompaniesThunk } from "../../../store/features/supplierThunks";

const DataTable = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const companies:SupplerDataType[] = useSelector((state:RootState) => state.supplier.suppliers);
    const userDateFormat:FormatDateType = useSelector((state: RootState) => state.auth.userSettings.date_format);

    const onSupplierClickHandler = (supplierId: SupplierIdType) => {
        navigate(PATHS.supplierCard + "/" + String(supplierId));
    }
    
    return <>
        <table className={s.theTable}>
            <thead>
                <tr>
                    <td>
                        { t("table_name") }
                        {/* <SortingIcons columnName={NAME_COLUMN_SORT}/> */}
                    </td>
                    <td>
                        { t("table_creation_date") }
                        {/* <SortingIcons columnName={CREATION_DATE_COLUMN_SORT}/> */}
                    </td>
                    <td>
                        { t("table_is_complite") }
                        {/* <SortingIcons columnName={COMPLITED_COLUMN_SORT}/> */}
                    </td>
                    <td>
                        { t("table_risk") }
                        {/* <SortingIcons columnName={RISK_COLUMN_SORT}/> */}
                    </td>
                </tr>
            </thead>
            <tbody>
                {
                    companies.map( (c:SupplerDataType, ind: number) => {
                        return <tr className={s.theTableTr} key={c.supplierId} onClick={() => onSupplierClickHandler(c.supplierId)}>
                            <td>
                            Номер строки {ind+1}, компания: {c.supplierName}
                            </td>
                            <td>
                                {c.creationDate && dayjs(c.creationDate.slice(0,10)).format(userDateFormat)}
                            </td>
                            <td>{
                                    c.filledDate
                                        ? <img src={yes} className={dashboardStyles.icon_yes_no} alt=""/>
                                        : <img src={no} className={dashboardStyles.icon_yes_no} alt=""/>
                                }
                            </td>
                            <td>
                                <RiskInLine risk={c.risk}/>
                            </td>
                        </tr>
                    }
                    )
                }
            </tbody>
        </table>
    </>
}
            
       

export default DataTable;
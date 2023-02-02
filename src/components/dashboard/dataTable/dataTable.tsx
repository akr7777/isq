import { useSelector } from "react-redux";
import { 
    SupplerDataType, SupplierIdType, 
} from "../../../store/features/supplierSlice";
import { RootState, useAppDispatch } from "../../../store/store";
import s from './dataTable.module.css';
import dashboardStyles from "./../dashboard.module.css";

import yes from './../../../public/icons/var_yes.png';
import no from './../../../public/icons/var_no.png';
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../outlet/outlet";
import RiskInLine from "../riskInLine";
import { useTranslation } from "react-i18next";
import SortingIcons from "../sortIcons";
import dayjs from "dayjs";
import Preloader from "../../common/preloader/preloader";
import { FormatDateType } from "../../../store/features/authSlice";
import { useEffect } from "react";
import { getCompaniesThunk, getCompaniesThunkVarType } from "../../../store/features/supplierThunks";
// import preloaderSpinner1 from "../../../public/preloader/preloader1.gif"

const DataTable = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        // dispatch(getCompaniesThunk({data: 'adb'}));
        dispatch(getCompaniesThunk({page: 1}));
    }, [])

    // const companies:SupplerDataType[] = AddSearchOptions();
    const companies:SupplerDataType[] = useSelector((state:RootState) => state.supplier.suppliers);
    // const userDateFormat:FormatDateType = useSelector((state: RootState) => state.supplier.settings.userDateFormat);
    const userDateFormat:FormatDateType = useSelector((state: RootState) => state.auth.userSettings.date_format);
    const isLoading:boolean = useSelector((state:RootState) => state.supplier.loadingVars.suppliersLoading);

    const onSupplierClickHandler = (supplierId: SupplierIdType) => {
        navigate(PATHS.supplierCard + "/" + String(supplierId));
    }

    
    
    
    return <>
            {
                isLoading
                    ? <Preloader />
                    : <table className={s.theTable}>
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
                        companies.map( c => 
                            <tr className={s.theTableTr} key={c.supplierId} onClick={() => onSupplierClickHandler(c.supplierId)}>
                                <td>
                                    {c.supplierName}
                                </td>
                                <td>
                                    {c.creationDate && dayjs(c.creationDate).format(userDateFormat)}
                                    {/* {c.creationDate?.toLocaleDateString()} */}
                                </td>
                                <td>{
                                        c.filledDate
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
            }
            
        </>
}

export default DataTable;
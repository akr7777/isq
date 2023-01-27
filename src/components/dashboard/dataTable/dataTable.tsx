import { useSelector } from "react-redux";
import { SearchByComplitedType, RiskType, SupplerDataType, SupplierIdType, changeColumnNameSortingAC, changeColumnDirectionSortingAC, NAME_COLUMN_SORT, CREATION_DATE_COLUMN_SORT, COMPLITED_COLUMN_SORT, RISK_COLUMN_SORT, FilterDateType, ColumnSortNameType, ColumnSortDirectionType, FormatDateType } from "../../../store/features/supplierSlice";
import { RootState } from "../../../store/store";
import s from './dataTable.module.css';
import dashboardStyles from "./../dashboard.module.css";

import yes from './../../../public/icons/var_yes.png';
import no from './../../../public/icons/var_no.png';
import { AddSearchOptions, AddSearchOptionsPropsType } from "../dashboardHead/search/functions-for-search";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../outlet/outlet";
import RiskInLine from "../riskInLine";
import { useTranslation } from "react-i18next";
import SortingIcons from "../sortIcons";
import dayjs from "dayjs";

const DataTable = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();


    // const searchField:string = useSelector((state:RootState) => state.supplier.search);
    // const searchComplited:SearchByComplitedType = useSelector((state:RootState) => state.supplier.searchByComplited);
    // const searchRisk:RiskType = useSelector((state:RootState) => state.supplier.searchByRisk);
    // const searchByDateStart: FilterDateType = useSelector((state: RootState) => state.supplier.searchByDateStart);
    // const searchByDateEnd: FilterDateType = useSelector((state: RootState) => state.supplier.searchByDateEnd);
    // const searchByPurchaseTicket:string = useSelector((state:RootState) => state.supplier.searchByPurchaseTicket) || "";
    // const columnNameSorting:ColumnSortNameType = useSelector((state:RootState) => state.supplier.sortingOptions.columnNameSorting);
    // const columnSortDirection:ColumnSortDirectionType = useSelector((state:RootState) => state.supplier.sortingOptions.columnSortDirection);
    // const initCompaniesArray:Array<SupplerDataType> = useSelector((state:RootState) => state.supplier.suppliers);
    // const searchOptions:AddSearchOptionsPropsType = {
    //     initArray: initCompaniesArray,
    //     searchField:searchField,
    //     searchComplited:searchComplited,
    //     searchRisk:searchRisk,
    //     searchByDateStart: searchByDateStart,
    //     searchByDateEnd:searchByDateEnd,
    //     searchByPurchaseTicket:searchByPurchaseTicket,
    //     columnNameSorting:columnNameSorting,
    //     columnSortDirection:columnSortDirection,
    // }

    const companies:SupplerDataType[] = AddSearchOptions();
    const userDateFormat:FormatDateType = useSelector((state: RootState) => state.supplier.settings.userDateFormat);

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
                                    {c.creationDate && dayjs(c.creationDate).format(userDateFormat)}
                                    {/* {c.creationDate?.toLocaleDateString()} */}
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
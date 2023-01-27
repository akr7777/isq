// import { t } from "i18next";
import { useSelector } from "react-redux";
import { 
    SearchByComplitedType, RiskType, SupplerDataType, SupplierIdType, RISK_LOW, RISK_MEDIUM, RiskViewType, 
    RiskViewWORD, ColumnSortNameType, ColumnSortDirectionType, FormatDateType 
} from "../../../store/features/supplierSlice";
import { RootState } from "../../../store/store";
import s from "./dataBricks.module.css";
import dbStyles from "./../dashboard.module.css";

import yes from './../../../public/icons/var_yes.png';
import no from './../../../public/icons/var_no.png';
import { AddSearchOptions, AddSearchOptionsPropsType } from "../dashboardHead/search/functions-for-search";
import { PATHS } from "../../outlet/outlet";
import { useNavigate } from "react-router-dom";
import RiskInLine from "../riskInLine";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";



const DataBricks = () => {

    const {t} = useTranslation();
    
    // const searchField:string = useSelector((state:RootState) => state.supplier.search);
    // const searchComplited:SearchByComplitedType = useSelector((state:RootState) => state.supplier.searchByComplited);
    // const searchRisk:RiskType = useSelector((state:RootState) => state.supplier.searchByRisk);
    // const searchByDateStart: FilterDateType = useSelector((state: RootState) => state.supplier.searchByDateStart);
    // const searchByDateEnd: FilterDateType = useSelector((state: RootState) => state.supplier.searchByDateEnd);
    // const searchByPurchaseTicket:string = useSelector((state:RootState) => state.supplier.searchByPurchaseTicket) || "";

    // let companies:SupplerDataType[] = useSelector((state:RootState) => state.supplier.suppliers)
    //     .filter( el => el.supplierName.toLowerCase().includes(searchField.toLowerCase()))
    // if (searchComplited === SEARCH_COMPLETED_FINISHED)
    //     companies = companies.filter( el => el.isComplite === true );
    // if (searchComplited === SEARCH_COMPLETED_UNFINISHED)
    //     companies = companies.filter( el => el.isComplite === false );
    // if (searchRisk === )

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
    // const companies:SupplerDataType[] = AddSearchOptions();
    const userDateFormat:FormatDateType = useSelector((state: RootState) => state.supplier.settings.userDateFormat);

    
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
                        {c.creationDate && dayjs(c.creationDate).format(userDateFormat)}
                        {/* {c.creationDate?.toLocaleDateString()} */}
                    </div>
                    <div className={s.oneBrickPiece}>
                        {
                            c.isComplite
                                ? <img src={yes} className={dbStyles.icon_yes_no}/>
                                : <img src={no} className={dbStyles.icon_yes_no}/>
                        }
                    </div>
                    <div className={s.oneBrickPiece}>
                        <RiskInLine risk={c.risk}/>
                        {/* {
                            riskView === RiskViewWORD
                                ? c.risk !== undefined && <div
                                    className={
                                        c.risk === RISK_LOW
                                            ? profileStyles.risk + " " + profileStyles.risk_low
                                            : c.risk === RISK_MEDIUM
                                                ? profileStyles.risk + " " + profileStyles.risk_medium
                                                : profileStyles.risk + " " + profileStyles.risk_high
                                    }>
                                    { c.risk }
                                </div>
                                : c.risk === undefined
                                    ? <img src={starBlack} className={s.star}/>
                                    : c.risk === RISK_LOW
                                        ? <img src={starGreen} className={s.star}/>
                                        : c.risk === RISK_MEDIUM
                                            ? <img src={starYellow} className={s.star}/>
                                            : <img src={starRed} className={s.star}/>
                                
                        } */}
                        {/* { 
                            c.risk !== undefined && <div
                                className={
                                    c.risk === RISK_LOW
                                        ? profileStyles.risk + " " + profileStyles.risk_low
                                        : c.risk === RISK_MEDIUM
                                            ? profileStyles.risk + " " + profileStyles.risk_medium
                                            : profileStyles.risk + " " + profileStyles.risk_high
                                }>
                                { c.risk }
                            </div>
                        } */}

                        {/* STAR */}
                        {/* {
                            c.risk === undefined
                                ? <img src={starBlack} className={s.star}/>
                                : c.risk === RISK_LOW
                                    ? <img src={starGreen} className={s.star}/>
                                    : c.risk === RISK_MEDIUM
                                        ? <img src={starYellow} className={s.star}/>
                                        : <img src={starRed} className={s.star}/>
                        } */}
                        {/* / Star */}

                    </div>
                </div>
            })
        }

    </div>
}

export default DataBricks;
// import { t } from "i18next";
import { useSelector } from "react-redux";
import { 
    SupplerDataType, SupplierIdType
} from "../../../store/features/supplierSlice";
import { RootState, useAppDispatch } from "../../../store/store";
import s from "./dataBricks.module.css";
import dbStyles from "./../dashboard.module.css";

import yes from './../../../public/icons/var_yes.png';
import no from './../../../public/icons/var_no.png';
import { PATHS } from "../../outlet/outlet";
import { useNavigate } from "react-router-dom";
import RiskInLine from "../riskInLine";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useEffect } from "react";
import { getCompaniesThunk } from "../../../store/features/supplierThunks";
import Preloader from "../../common/preloader/preloader";
import { FormatDateType } from "../../../store/features/authSlice";



const DataBricks = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {t} = useTranslation();

    useEffect(() => {
        dispatch(getCompaniesThunk({page: 1}));
    }, [])

    // const companies:SupplerDataType[] = AddSearchOptions();
    const companies:SupplerDataType[] = useSelector((state:RootState) => state.supplier.suppliers);
    const userDateFormat:FormatDateType = useSelector((state: RootState) => state.auth.userSettings.date_format);
    // const userDateFormat:FormatDateType = useSelector((state: RootState) => state.supplier.settings.userDateFormat);
    const isLoading:boolean = useSelector((state:RootState) => state.supplier.loadingVars.suppliersLoading);
    
    const onSupplierClickHandler = (supplierId: SupplierIdType) => {
        navigate(PATHS.supplierCard + "/" + String(supplierId));
    }

    return <div className={s.dataBricksWrapper}>

        {
            isLoading
                ? <Preloader />
                : <>
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
                                </div>
                                <div className={s.oneBrickPiece}>
                                    {
                                        c.filledDate
                                            ? <img src={yes} className={dbStyles.icon_yes_no}/>
                                            : <img src={no} className={dbStyles.icon_yes_no}/>
                                    }
                                </div>
                                <div className={s.oneBrickPiece}>
                                    <RiskInLine risk={c.risk}/>
                                </div>
                            </div>
                        })
                    }
                </>
        }
        

    </div>
}

export default DataBricks;
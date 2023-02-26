import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { FormatDateType } from "../../store/features/authSlice";
import { RootState } from "../../store/store";
import cardStyles from "./card.module.css";

const SupplierHead = () => {
    const {t} = useTranslation();

    const supplierName: string = useSelector((state:RootState) => state.complited.company);
    const dateFormat:FormatDateType = useSelector((state:RootState) => state.auth.userSettings.date_format);
    const creationDate: string = dayjs(useSelector((state: RootState) => state.complited.createdAt)).format(dateFormat);
    const complitedDate: string = useSelector((state: RootState) => state.complited.filledAt) || "";
    const checkedDate: string = useSelector((state: RootState) => state.complited.checkedAt) || "";

    return <div className={cardStyles.supplierArea + " " + cardStyles.appearance}>
        <label className={cardStyles.label_title_1}>
            {supplierName}
        </label>
        <div className={cardStyles.supplierHeadDates}>
            <label>{ t("supplierCard_creation_date") } {creationDate}</label>
            {
                complitedDate.length > 0 
                    ? <label>{ t("supplierCard_complited_date") } {complitedDate}</label>
                    : <label>{ t("supplierCard_complited_date") } &mdash</label>
            }
            <label>{ t("supplierCard_checked_date") } {checkedDate}</label>
        </div>
    </div>
}

export default SupplierHead;
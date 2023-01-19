import { t } from "i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import cardStyles from "./card.module.css";

const SupplierHead = () => {

    const supplierName: string = useSelector((state:RootState) => state.complited.supplierName);
    const creationDate: string = useSelector((state: RootState) => state.complited.creationDate);
    const complitedDate: string = useSelector((state: RootState) => state.complited.complitedDate) || "-";
    const checkedDate: string = useSelector((state: RootState) => state.complited.checkedDate) || "-";

    return <div className={cardStyles.supplierArea + " " + cardStyles.appearance}>
        <label className={cardStyles.label_title_1}>
            {supplierName}
        </label>
        <div className={cardStyles.supplierHeadDates}>
            <label>{ t("supplierCard_creation_date") } {creationDate}</label>
            <label>{ t("supplierCard_complited_date") } {complitedDate}</label>
            <label>{ t("supplierCard_checked_date") } {checkedDate}</label>
        </div>
    </div>
}

export default SupplierHead;
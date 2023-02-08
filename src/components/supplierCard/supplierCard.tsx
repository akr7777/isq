import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../../store/store";
import Preloader from "../common/preloader/preloader";
import cardStyles from "./card.module.css";
import ChangeZone from "./changeZone";
import DeleteCompany from "./DeleteCompany";
import QA from "./QA";
import SupplierExistedRisk from "./supplierExistedRisk";
import SupplierHead from "./supplierHead";

const SupplierCard = () => {
    const { supplierId } = useParams();
    // const dispatch = useAppDispatch();
    // const [l, setL] = useState(true);
    const isLoading: boolean = useSelector((state:RootState) => state.supplier.loadingVars.supplierCardLoading);

    const checkedDate: string = useSelector((state:RootState) => state.complited.checkedDate);

    return <div className={cardStyles.cardWrapper}>

        supplier CARD #{supplierId}
        {
            isLoading
                ? <Preloader />
                : <>
                    <SupplierHead />
                    { checkedDate.length > 0 && <SupplierExistedRisk/> }
                    <QA />
                    <ChangeZone />
                    <DeleteCompany />
                </>
        }

    </div>
}

export default SupplierCard;
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getComplitedInfoCompany } from "../../store/features/complitedThunks";
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
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getComplitedInfoCompany(supplierId || ""));
    }, [])

    const isLoading: boolean = useSelector((state:RootState) => state.complited.isLoading);

    return <div className={cardStyles.cardWrapper}>

        supplier CARD #{supplierId}
        {
            isLoading
                ? <Preloader />
                : <>
                    <SupplierHead />
                    {/* { checkedDate.length > 0 && <SupplierExistedRisk/> } */} <SupplierExistedRisk/>
                    <QA />
                    <ChangeZone />
                    <DeleteCompany />
                </>
        }

    </div>
}

export default SupplierCard;

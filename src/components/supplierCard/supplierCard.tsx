import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../../store/store";
import Preloader from "../common/preloader/preloader";
import cardStyles from "./card.module.css";
import ChangeZone from "./changeZone";
import QA from "./QA";
import SupplierExistedRisk from "./supplierExistedRisk";
import SupplierHead from "./supplierHead";

const SupplierCard = () => {
    const { supplierId } = useParams();
    const dispatch = useAppDispatch();
    // const isLoading = true;
    //dispatch санку на сервер с supplierId и получаем информацию в state
    // меняем isLoading на false

    const [l, setL] = useState(true);
    
    

    const checkedDate: string = useSelector((state:RootState) => state.complited.checkedDate);

    return <div className={cardStyles.cardWrapper}>

        supplier CARD #{supplierId}
        <button onClick={() => setL(!l)}>
            Нажми на меня, чтобы завершить или начать заново загрузку.....
        </button>

        { 
            l && <Preloader /> 
        }

        {
            !l && <>
                <SupplierHead />
                { checkedDate.length > 0 && <SupplierExistedRisk/> }
                <QA />
                <ChangeZone />
            </>
        }
        
    </div>
}

export default SupplierCard;
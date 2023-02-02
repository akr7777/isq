import { useState } from "react";
import SearchByComplited from "./optionSearchComplited";
import SearchByDate from "./optionSearchDate";
import SearchRisk from "./optionSearchRisk";
import { useTranslation } from "react-i18next";
import SearchByPurchaseTicket from "./optionPurchaseTicket";

import s from './search.module.css';
import SearchByCompanyField from "./searchByCompanyField";


const SearchField = () => {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    return <div className={s.searchMainDiv}>
            <SearchByCompanyField isOpen={isOpen} setIsOpen={setIsOpen}/>
            {
                isOpen &&  <div className={s.additionSearchOptionsDiv}>
                        <h4>{ t("search_search_by_date") }</h4>
                        <SearchByDate />
                        <h4>{ t("search_search_by_complited") }</h4>
                        <SearchByComplited />
                         <h4>{ t("search_risks") }</h4>
                        <SearchRisk />
                        <h4>{ t("search_purchase_ticket_title") }</h4>
                        <SearchByPurchaseTicket />
                    </div>
            }
        </div>
}

export default SearchField;
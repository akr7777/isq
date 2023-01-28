import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { searchFieldChangeAC, SEARCH_TEXT_DELAY } from "../../../../store/features/supplierSlice";
import { RootState, useAppDispatch } from "../../../../store/store";
import { LineTextField } from "../../../common/labelTextField/labelLineText";
import s from './search.module.css';
import IsOpenIcon from "./isOpenIcon";
import circleIcon from '../../../../public/icons/icon_circle.png';
import searchIcon from '../../../../public/icons/icon_search.png';
import SearchByComplited from "./optionSearchComplited";
import SearchByDate from "./optionSearchDate";
import SearchRisk from "./optionSearchRisk";
import { useTranslation } from "react-i18next";
import { IsSomeSearchOptionFilled } from "./functions-for-search";
import SearchByPurchaseTicket from "./optionPurchaseTicket";
import useDebounce from "../../../../hooks/debounced-hook";



const SearchField = () => {
    const {t} = useTranslation();
    const searchField:string = useSelector((state:RootState) => state.supplier.search);
    // const [text, setText] = useState<string>('');
    const dispatch = useAppDispatch();

    const debouncedValue = useDebounce<string>(searchField, SEARCH_TEXT_DELAY);

    useEffect(() => {
        if (searchField.length > 0) {
            console.log('!!!searchField=',searchField);
        }
    }, [debouncedValue])

    const onSearchChangeHandler = (searchText: string) => {
        dispatch(searchFieldChangeAC(searchText))
    }

    
    const isCircled: boolean = IsSomeSearchOptionFilled();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    return <div className={s.searchMainDiv}>

            <div className={s.searchByTextDiv}>
                <LineTextField 
                    type="text"
                    // text={text}
                    text={searchField}
                    placeholder={t('search_field_placeholder')}
                    onChangeFunction={onSearchChangeHandler}
                    icon={isCircled ? circleIcon : searchIcon}
                    className={s.searchFieldWidth}
                    autofocus={true}
                />

                <IsOpenIcon 
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            </div>
            

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
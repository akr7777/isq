import s from './search.module.css';
import { LineTextField } from "../../../common/labelTextField/labelLineText";
import IsOpenIcon from "./isOpenIcon";
import circleIcon from '../../../../public/icons/icon_circle.png';
import searchIcon from '../../../../public/icons/icon_search.png';
import useDebounce from "../../../../hooks/debounced-hook";
import { getCompaniesThunk } from "../../../../store/features/supplierThunks";
import { useEffect, useState } from "react";
import { RiskType, SearchByComplitedType, searchFieldChangeAC, SEARCH_COMPLETED_ALL, SEARCH_TEXT_DELAY } from "../../../../store/features/supplierSlice";
import { RootState, useAppDispatch } from '../../../../store/store';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

type SearchByCompanyFieldPropsType = {
    isOpen: boolean,
    setIsOpen: (v: boolean) => void,
}
const SearchByCompanyField = (props: SearchByCompanyFieldPropsType) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const [searchInput, setSearchInput] = useState<string>('');
    const debouncedValue = useDebounce<string>(searchInput, SEARCH_TEXT_DELAY);

    const searchFieldText:string = useSelector((state:RootState) => state.supplier.searchingOptions.search) || "";
    const searchByComplited: SearchByComplitedType = useSelector((state:RootState) => state.supplier.searchingOptions.searchByComplited);
    const searchByRisk: RiskType = useSelector((state:RootState) => state.supplier.searchingOptions.searchByRisk);
    const searchByDateStart: string = useSelector((state:RootState) => state.supplier.searchingOptions.searchByDateStart) || "";
    const searchByDateEnd: string = useSelector((state:RootState) => state.supplier.searchingOptions.searchByDateEnd) || "";
    const searchByPurchaseTicket: string = useSelector((state: RootState) => state.supplier.searchingOptions.searchByPurchaseTicket) || "";

    const isCircled: boolean = searchFieldText.length > 0 || searchByComplited !== SEARCH_COMPLETED_ALL || 
                        (searchByRisk !== undefined && searchByRisk !== null) ||
                        (searchByDateStart.length > 0) || (searchByDateEnd.length > 0) ||
                        searchByPurchaseTicket.length > 0;


    useEffect(() => {
        dispatch(searchFieldChangeAC(searchInput));
        dispatch(getCompaniesThunk({
            page: 1,
            fieldForSearch: 'search',
            valueForSearch: searchInput,
        }))
    }, [debouncedValue])


    return <div className={s.searchByTextDiv}>
        <LineTextField 
            type="text"
            // text={text}
            text={searchInput}
            placeholder={t('search_field_placeholder')}
            onChangeFunction={(newInput: string) => setSearchInput(newInput)}
            icon={isCircled ? circleIcon : searchIcon}
            className={s.searchFieldWidth}
            autofocus={true}
        />

        <IsOpenIcon 
            isCircled={isCircled}
            isOpen={props.isOpen}
            setIsOpen={props.setIsOpen}
        />
    </div>
}

export default SearchByCompanyField;
import { t } from "i18next";
import { useSelector } from "react-redux";
import { searchFieldChangeAC } from "../../../../store/features/supplierSlice";
import { RootState, useAppDispatch } from "../../../../store/store";
import { LineTextField } from "../../../common/labelTextField/labelLineText";
import s from './../../dashboard.module.css';
import FullSearchOptions from "./fullSearchOptions";

const SearchField = () => {
    const searchField:string = useSelector((state:RootState) => state.supplier.search);
    const dispatch = useAppDispatch();
    const onSearchChangeHandler = (searchText: string) => {
        dispatch(searchFieldChangeAC(searchText))
    }

    return <div className={s.searchDiv}>
        <label>{t('search')}:</label>
        <LineTextField 
            type="text"
            text={searchField}
            placeholder={t('search_field_placeholder')}
            onChangeFunction={onSearchChangeHandler}
        />
        <FullSearchOptions />
    </div>
}

export default SearchField;
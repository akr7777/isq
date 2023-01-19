import { t } from "i18next";
import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { SEARCH_COMPLETED_ALL,SEARCH_COMPLETED_UNFINISHED,SEARCH_COMPLETED_FINISHED, searchByComplitedChangeAC, SearchByComplitedType, searchByRiskAC } from "../../../../store/features/supplierSlice";
import { RootState, useAppDispatch } from "../../../../store/store";
import searchStyles from "./search.module.css";

const SearchByComplited = () => {
    const dispatch = useAppDispatch();
    const checkedField:SearchByComplitedType = useSelector((state:RootState) => state.supplier.searchByComplited);

    const onCheckedChange = (e: ChangeEvent<HTMLInputElement>) => {
        if  (
            e.currentTarget.value === SEARCH_COMPLETED_ALL ||
            e.currentTarget.value === SEARCH_COMPLETED_FINISHED ||
            e.currentTarget.value === SEARCH_COMPLETED_UNFINISHED
            ) {
                dispatch(searchByComplitedChangeAC(e.currentTarget.value));
                dispatch(searchByRiskAC(undefined))
        }
    }

    return <div>
        <label>{ t("search_search_by_complited") }</label>
        <div className={searchStyles.searchDateComplitedDiv}>
            <div>
                <input type="radio" value={SEARCH_COMPLETED_ALL} name="all" 
                    onChange={(e) => onCheckedChange(e)}
                    checked={checkedField === SEARCH_COMPLETED_ALL}
                />
                <label htmlFor="all">{ t("search_search_by_complited_all") }</label>
            </div>
            <div>
                <input type="radio" value={SEARCH_COMPLETED_FINISHED} name="complited" 
                    onChange={(e) => onCheckedChange(e)}
                    checked={checkedField === SEARCH_COMPLETED_FINISHED}

                />
                <label htmlFor="complited">{ t("search_search_by_complited_complited") }</label>
            </div>
            <div>
                <input type="radio" value={SEARCH_COMPLETED_UNFINISHED} name="notComplited" 
                    onChange={(e) => onCheckedChange(e)}
                    checked={checkedField === SEARCH_COMPLETED_UNFINISHED}
                />
                <label htmlFor="notComplited">{ t("search_search_by_complited_not_complited") }</label>
            </div>
        </div>
    </div>
}
export default SearchByComplited;
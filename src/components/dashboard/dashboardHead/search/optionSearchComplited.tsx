import { t } from "i18next";
import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { SEARCH_COMPLETED_ALL,SEARCH_COMPLETED_UNFINISHED,SEARCH_COMPLETED_FINISHED, searchByComplitedChangeAC, SearchByComplitedType, searchByRiskAC } from "../../../../store/features/supplierSlice";
import { RootState, useAppDispatch } from "../../../../store/store";
import s from "./search.module.css";

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

    return <>
        {/* <label>{ t("search_search_by_complited") }</label> */}
        <div className={s.searchDateComplitedDiv}>

            <div className={s.oneOptionDiv}>
                <input type="radio" value={SEARCH_COMPLETED_ALL} name="all" 
                    onChange={(e) => onCheckedChange(e)}
                    checked={checkedField === SEARCH_COMPLETED_ALL}
                    // className={s.complitedCheckOptionCircle}
                    className={checkedField === SEARCH_COMPLETED_ALL 
                        ? s.complitedCheckOptionCircle + " " +s.checkedInputAll
                        : s.complitedCheckOptionCircle
                    }
                />
                <label 
                    className={s.complitedCheckOption} 
                    htmlFor="all"
                >
                    { t("search_search_by_complited_all") }
                </label>
            </div>

            <div className={s.oneOptionDiv}>
                <input type="radio" value={SEARCH_COMPLETED_FINISHED} name="complited" 
                    onChange={(e) => onCheckedChange(e)}
                    checked={checkedField === SEARCH_COMPLETED_FINISHED}
                    // className={s.complitedCheckOptionCircle}
                    className={checkedField === SEARCH_COMPLETED_FINISHED 
                        ? s.complitedCheckOptionCircle + " " +s.checkedInputComplited
                        : s.complitedCheckOptionCircle
                    }
                />
                <label 
                    className={s.complitedCheckOption} 
                    htmlFor="complited"
                >
                    { t("search_search_by_complited_complited") }
                </label>
            </div>

            <div className={s.oneOptionDiv}>
                <input type="radio" value={SEARCH_COMPLETED_UNFINISHED} name="notComplited" 
                    onChange={(e) => onCheckedChange(e)}
                    checked={checkedField === SEARCH_COMPLETED_UNFINISHED}
                    className={checkedField === SEARCH_COMPLETED_UNFINISHED 
                        ? s.complitedCheckOptionCircle + " " +s.checkedInputNotComplited
                        : s.complitedCheckOptionCircle
                    }
                />
                <label className={s.complitedCheckOption} htmlFor="notComplited">{ t("search_search_by_complited_not_complited") }</label>
            </div>
        </div>
    </>
}
export default SearchByComplited;
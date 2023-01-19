import { useSelector } from "react-redux";
import { BRICK_VIEW, changeViewAC, TABLE_VIEW, ViewOptionsType } from "../../store/features/supplierSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { ChangeEvent } from "react";
import { t } from "i18next";

const Checker = () => {
    const currentView:ViewOptionsType = useSelector((state:RootState) => state.supplier.view);
    const dispatch = useAppDispatch();
    const onViewChangeClickHandler = (e:ChangeEvent<HTMLInputElement>) => {
        // console.log('e=', e.currentTarget.value);
        if (e.currentTarget.value === TABLE_VIEW ||
                e.currentTarget.value === BRICK_VIEW) {
                    dispatch(changeViewAC(e.currentTarget.value))
                }
    }

    return <fieldset>
        <legend>{ t("profile_view_legend") }</legend>

        <div>
            <input type="radio" id="table" name="table" 
                value={TABLE_VIEW}
                checked={currentView === 'table'} 
                onChange={(e) => onViewChangeClickHandler(e)}
            />
            <label htmlFor="table">{ t("profile_view_table") }</label>
        </div>

        <div>
            <input type="radio" id="brick" name="brick" 
                value={BRICK_VIEW}
                checked={currentView === 'brick'}
                onChange={(e) => onViewChangeClickHandler(e)}
            />
            <label htmlFor="brick">{ t("profile_view_brick") }</label>
        </div>

        
    </fieldset>
}

export default Checker;
import { useSelector } from "react-redux";
import { BRICK_VIEW, changeViewAC, TABLE_VIEW, ViewOptionsType } from "../../store/features/supplierSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { ChangeEvent, MouseEvent } from "react";
import { t } from "i18next";
import s from './profile.module.css';

const Checker = () => {
    const currentView:ViewOptionsType = useSelector((state:RootState) => state.supplier.view);
    const dispatch = useAppDispatch();
    const onViewChangeClickHandler = (e:MouseEvent<HTMLInputElement>) => {

        if (e.currentTarget.value === TABLE_VIEW ||
                e.currentTarget.value === BRICK_VIEW) {
                    dispatch(changeViewAC(e.currentTarget.value))
                }
    }

    return <fieldset>
        <legend className={s.myLegend}><h4>{ t("profile_view_legend") }</h4></legend>

        <div className={s.input_div}>
            <input type="radio" id="table" name="table" 
                className={
                    currentView === TABLE_VIEW
                        ? s.ligend_input + " " + s.ligend_input_checked
                        : s.ligend_input
                }
                value={TABLE_VIEW}
                onClick={(e) => onViewChangeClickHandler(e)}
            />
            <label 
                htmlFor="table"
                className={ currentView === TABLE_VIEW 
                                ? s.ligend_label + " " + s.ligend_label_checked
                                : s.ligend_label
                        }
            >
                { t("profile_view_table") }
            </label>
        </div>

        <div className={s.input_div}>
            <input type="radio" id="brick" name="brick" 
                className={
                    currentView === BRICK_VIEW
                        ? s.ligend_input + " " + s.ligend_input_checked
                        : s.ligend_input
                }
                value={BRICK_VIEW}
                onClick={(e) => onViewChangeClickHandler(e)}
            />
            <label 
                htmlFor="brick"
                className={ currentView === BRICK_VIEW 
                    ? s.ligend_label + " " + s.ligend_label_checked
                    : s.ligend_label
            }
            >
                { t("profile_view_brick") }
            </label>
        </div>

        
    </fieldset>
}

export default Checker;
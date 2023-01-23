import { useSelector } from "react-redux";
import { BRICK_VIEW, changeViewAC, TABLE_VIEW, ViewOptionsType } from "../../store/features/supplierSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { t } from "i18next";
import { RadioLabelOptionType, RadioLabels } from "../common/radioLabels/radioLabels";
import s from './profile.module.css';

const Checker = () => {
    const currentView:ViewOptionsType = useSelector((state:RootState) => state.supplier.settings.view);
    const dispatch = useAppDispatch();
    const onViewChangeClickHandler = (newValue: string) => {
        if (newValue===TABLE_VIEW || newValue===BRICK_VIEW) {
            dispatch(changeViewAC(newValue))
        }
    }

    const options:Array<RadioLabelOptionType> = [
        {
            text: t("profile_view_table"),
            value: TABLE_VIEW,
        },
        {
            text: t("profile_view_brick"),
            value: BRICK_VIEW,
        }
    ]

    return <div className={s.user_interface_settings_one_block}>
        <h3>{ t("profile_view_legend") }</h3>
        <RadioLabels 
            options={options}
            defaultOption={currentView}
            onClickFunction={(newValue: string) => onViewChangeClickHandler(newValue)}
        />
    </div>
}

export default Checker;
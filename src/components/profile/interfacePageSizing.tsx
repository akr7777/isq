import { useSelector } from "react-redux";
import { changePageSizingAC, changeRiskInLineAC, pageSizeOptions, RiskViewSTAR, RiskViewType, RiskViewWORD } from "../../store/features/supplierSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { useTranslation } from "react-i18next";
import { RadioLabelOptionType, RadioLabels } from "../common/radioLabels/radioLabels";
import s from './profile.module.css';

const InterfacePageSizing = () => {

    const riskView:number = useSelector((state:RootState) => state.supplier.settings.pageSizing);
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const onViewChangeClickHandler = (val: string) => {
        const intVal = Number(val);
        if (pageSizeOptions.some( s => s === intVal)) {
            dispatch(changePageSizingAC(intVal));
          }
    }

    const options:Array<RadioLabelOptionType> = pageSizeOptions.map( s => {
        return {
            text: String(s),
            value: String(s)
        }
    })
    
    return <div className={s.user_interface_settings_one_block}>
         <h3>{ t("profile_page_size_title") }</h3>
        <RadioLabels 
            options={options}
            defaultOption={'20'}
            onClickFunction={(newValue: string) => onViewChangeClickHandler(newValue)}
        />
    </div>
}

export default InterfacePageSizing;
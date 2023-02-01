import { useSelector } from "react-redux";
// import { changePageSizingAC, changeRiskInLineAC, pageSizeOptions, RiskViewSTAR, RiskViewType, RiskViewWORD } from "../../store/features/supplierSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { useTranslation } from "react-i18next";
import { RadioLabelOptionType, RadioLabels } from "../common/radioLabels/radioLabels";
import s from './profile.module.css';
import { pageSizeOptions, ProfileUserSettingsType } from "../../store/features/authSlice";
import { ProfileRequestType, updateProfileThunk } from "../../store/features/authThunks";

const InterfacePageSizing = () => {
    const myName:string = useSelector((state:RootState) => state.auth.name);
    const userName:string = useSelector((state: RootState) => state.auth.username);

    // const riskView:number = useSelector((state:RootState) => state.supplier.settings.pageSizing);
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const userSettings:ProfileUserSettingsType = useSelector((state:RootState) => state.auth.userSettings);
    const currentPageSize:number = userSettings.items_per_page;
    // const defaultOption:string = String(useSelector((state:RootState) => state.supplier.settings.pageSizing));

    const onViewChangeClickHandler = (newValue: string) => {
        const intVal = Number(newValue);
        if (pageSizeOptions.some( s => s === intVal)) {
            const dataForThunk:ProfileRequestType = {
                ...userSettings,
                items_per_page: intVal,
                name: myName,
            }
            dispatch(updateProfileThunk(dataForThunk));
            // dispatch(changePageSizingAC(intVal));
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
            defaultOption={String(currentPageSize)}
            onClickFunction={(newValue: string) => onViewChangeClickHandler(newValue)}
        />
    </div>
}

export default InterfacePageSizing;
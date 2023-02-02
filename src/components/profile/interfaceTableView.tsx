import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { t } from "i18next";
import { RadioLabelOptionType, RadioLabels } from "../common/radioLabels/radioLabels";
import s from './profile.module.css';
import { BRICK_VIEW, ProfileUserSettingsType, TABLE_VIEW, LayoutOptionsType, changeLoadingStatus } from "../../store/features/authSlice";
import { ProfileRequestType, updateProfileThunk } from "../../store/features/authThunks";
import Preloader from "../common/preloader/preloader";

const Checker = () => {
    // const myName:string = useSelector((state:RootState) => state.auth.name);

    // const userSettings:ProfileUserSettingsType = useSelector((state:RootState) => state.auth.userSettings);
    const currentLayout:LayoutOptionsType = useSelector((state:RootState) => state.auth.userSettings.layout);
    // const currentView:ViewOptionsType = useSelector((state:RootState) => state.supplier.settings.view);
    const dispatch = useAppDispatch();
    const isLoading: boolean = useSelector((state:RootState) => state.auth.loadingStatus.layoutLoadingStatus);

    const onViewChangeClickHandler = (newValue: string) => {
        if (newValue===TABLE_VIEW || newValue===BRICK_VIEW) {
            // const dataForThunk:ProfileRequestType = {
            //     ...userSettings,
            //     layout: newValue,
            //     name: myName,
            // }
            dispatch(changeLoadingStatus({field: "layoutLoadingStatus", newValue: true}))
            dispatch(updateProfileThunk({layout: newValue}));
            // dispatch(changeViewAC(newValue))
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

    return <>
    {
        isLoading
            ? <div className={s.user_interface_settings_one_block + " " + s.user_interface_settings_one_block_loading}>
                <Preloader />
            </div>
            : <div className={s.user_interface_settings_one_block}>
                <h3>{ t("profile_view_legend") }</h3>
                <RadioLabels 
                    options={options}
                    defaultOption={currentLayout}
                    onClickFunction={(newValue: string) => onViewChangeClickHandler(newValue)}
                />
            </div>
    }
    </>
    
}

export default Checker;

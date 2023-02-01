import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { t } from "i18next";
import { RadioLabelOptionType, RadioLabels } from "../common/radioLabels/radioLabels";
import s from './profile.module.css';
import { BRICK_VIEW, ProfileUserSettingsType, TABLE_VIEW, LayoutOptionsType } from "../../store/features/authSlice";
import { ProfileRequestResponseType, updateProfileThunk } from "../../store/features/authThunks";

const Checker = () => {
    const myName:string = useSelector((state:RootState) => state.auth.name);
    const userName:string = useSelector((state: RootState) => state.auth.username);

    const userSettings:ProfileUserSettingsType = useSelector((state:RootState) => state.auth.userSettings);
    const currentLayout:LayoutOptionsType = userSettings.layout;
    // const currentView:ViewOptionsType = useSelector((state:RootState) => state.supplier.settings.view);
    const dispatch = useAppDispatch();

    const onViewChangeClickHandler = (newValue: string) => {
        if (newValue===TABLE_VIEW || newValue===BRICK_VIEW) {
            const dataForThunk:ProfileRequestResponseType = {
                ...userSettings,
                layout: newValue,
                name: myName,
                username: userName,
            }
            dispatch(updateProfileThunk(dataForThunk));
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

    return <div className={s.user_interface_settings_one_block}>
        <h3>{ t("profile_view_legend") }</h3>
        <RadioLabels 
            options={options}
            defaultOption={currentLayout}
            onClickFunction={(newValue: string) => onViewChangeClickHandler(newValue)}
        />
    </div>
}

export default Checker;

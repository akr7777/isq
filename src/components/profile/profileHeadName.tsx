import { useTranslation } from 'react-i18next';
import s from './profile.module.css';
import iconUpdate from "../../public/icons/icon_update.png";
import iconDone from "../../public/icons/icon_done.png";
import iconCross from "../../public/icons/icon_cross.png";
import { useState } from 'react';
import { LineTextField } from '../common/labelTextField/labelLineText';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { ProfileUserSettingsType } from '../../store/features/authSlice';
import { updateProfileThunk } from '../../store/features/authThunks';

const ProfileHeadFieldName = () => {
    const {t} = useTranslation();

    const myName: string = useSelector((state: RootState) => state.auth.name);
    // const newName: string = useSelector((state: RootState) => state.auth.vars.newNameInput);
    const [newName, setNewName] = useState<string>(myName);
    const [isChange, setIsChange] = useState<boolean>(false);
    // const userSettings:ProfileUserSettingsType = useSelector((state:RootState) => state.auth.userSettings);
    // const username: string = useSelector((state:RootState) => state.auth.username);
    const dispatch = useAppDispatch();

    const onDoneIconClickHandler = () => {
        setIsChange(false);
        dispatch(updateProfileThunk({name: newName}));
    }
    const crossIconClickHandler = () => {
        setIsChange(false);
        setNewName(myName);
    }

    return <div className={s.line_div}>

        <label>{t("profile_name")}:</label>

        {
            !isChange
                ? <h2>{myName}</h2>
                : <LineTextField 
                    type='text'
                    text={newName}
                    onChangeFunction={(newValue: string) => setNewName(newValue)}
                />
        }
        {
            !isChange
                ? <img src={iconUpdate} className={s.small_icons} onClick={() => setIsChange(true)}/>
                : <>
                    <img src={iconDone} className={s.small_icons} onClick={onDoneIconClickHandler}/>
                    <img src={iconCross} className={s.small_icons} onClick={crossIconClickHandler}/>
                </>
        }

    </div>
}

export default ProfileHeadFieldName;
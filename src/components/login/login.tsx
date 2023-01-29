import s from "./login.module.css";
import { ButtonOK } from '../common/buttons/buttons';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { onLoginInputAC, onPasswordInputAC, UserIdType } from "../../store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LineTextField } from "../common/labelTextField/labelLineText";

import iconUserName from "../../public/icons/icon_username.png";
import iconPassword from "../../public/icons/icon_password.png";
import iconEyeOpened from "../../public/icons/icon_eye_opened.png";
import iconEyeClosed from "../../public/icons/icon_eye_closed.png";
import { PATHS } from "../outlet/outlet";
import { loginThunk, loginThunkPropsType } from "../../store/features/authThunks";

const Login = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    const userId:UserIdType = useSelector((state: RootState) => state.auth.userId);
    const isAuth:boolean = userId ? true : false;
    useEffect(() => {
        if (isAuth){
            return navigate(PATHS.dashboard);
        }
        
    },[isAuth]);


    //console.log('Login / Error=', error);
    const loginInput: string = useSelector((state: RootState) => state.auth.vars.loginInput);
    const passwordInput: string = useSelector((state: RootState) => state.auth.vars.passwordInput);
    
    const loginError:string = useSelector((state: RootState) => state.auth.vars.loginError);
    const loginRequired:boolean = useSelector((state: RootState) => state.auth.vars.emptyLogin);
    const passwordRequired:boolean = useSelector((state: RootState) => state.auth.vars.emptyPassword);
    
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const onLoginClickHandler = () => {
        const credentials:loginThunkPropsType = {
            username: loginInput,
            password: passwordInput
        }
        dispatch(loginThunk(credentials));
    }
    const onLoginChange = (newValue: string) => {
        dispatch(onLoginInputAC(newValue));
    }
    const onPasswordChange = (newValue: string) => {
        dispatch(onPasswordInputAC(newValue));
    }
        
    return <>
        <div className={s.fields}>
            <div className={s.inputs_divs}>
                <h2>{ t("login_login") }</h2>
                <LineTextField 
                    type="text"
                    text={loginInput}
                    placeholder={ t("login_login_placeholder") }
                    onChangeFunction={onLoginChange}
                    error={loginError.length > 0 || loginRequired}
                    icon={iconUserName}
                    autofocus={true}
                />
                { loginRequired && <label className={s.error_label}>{t("required_field")}</label>}
                {/* <input type={'text'} placeholder=""/> */}
            </div>
            <div className={s.inputs_divs}>
                <h2>{ t("login_password") }</h2>
                <LineTextField 
                    type={showPassword ? "text" : "password"}
                    text={passwordInput}
                    placeholder={ t("login_password_placeholder") }
                    onChangeFunction={onPasswordChange}
                    error={loginError.length > 0 || passwordRequired}
                    icon={
                        passwordInput.length > 0 
                            ? showPassword
                                ? iconEyeClosed
                                : iconEyeOpened
                            : iconPassword
                    }
                    onIconClickFunction={() => setShowPassword(!showPassword)}
                />
                { passwordRequired && <label className={s.error_label}>{t("required_field")}</label>}
                {/* <input type={'password'} placeholder=""/> */}
            </div>

            { loginError.length > 0 && <label className={s.error_label}>{loginError}</label>}

            <ButtonOK 
                text={ t("login_button") }
                onClickFunction={() => onLoginClickHandler()}
            />
        </div>
    </>
}

export default Login;
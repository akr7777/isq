import { useSelector } from "react-redux";
import { DARK, LIGHT } from "../../../hooks/useTheme";
import { RootState } from "../../../store/store";
import s from "./buttonOk.module.css";

type ButtonPropsType = {
    text: string,
    onClickFunction: () => void,
}

const ButtonOK = (props: ButtonPropsType) => {

    const theme: typeof DARK | typeof LIGHT = useSelector((state: RootState) => state.auth.userSettings.theme);

    return <div
        onClick={props.onClickFunction}
        className={
            theme === LIGHT
                ? s.buttonOk + " " + s.buttonOKLight
                : s.buttonOk + " " + s.buttonOKDark
        }
        tabIndex={1}
    >
        {props.text}
    </div>
}

export default ButtonOK;
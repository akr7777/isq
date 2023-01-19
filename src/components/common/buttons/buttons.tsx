import { useSelector } from "react-redux";
import { DARK, LIGHT } from "../../../hooks/useTheme";
import { RootState } from "../../../store/store";
import s from "./buttons.module.css";

type ButtonPropsType = {
    text: string,
    onClickFunction: () => void,
    className?: string
}

export const ButtonOK = (props: ButtonPropsType) => {

    const theme: typeof DARK | typeof LIGHT = useSelector((state: RootState) => state.auth.userSettings.theme);

    return <div
        onClick={props.onClickFunction}
        className={s.buttonOk + " " + props.className}

        // className={
        //     theme === LIGHT
        //         ? s.buttonOk + " " + s.buttonOKLight
        //         : s.buttonOk + " " + s.buttonOKDark
        // }
        tabIndex={1}
    >
        {props.text}
    </div>
}

export const ButtonCancel = (props: ButtonPropsType) => {

    // const theme: typeof DARK | typeof LIGHT = useSelector((state: RootState) => state.auth.userSettings.theme);

    return <div
        onClick={props.onClickFunction}
        // className={
        //     theme === LIGHT
        //         ? s.buttonOk + " " + s.buttonOKLight
        //         : s.buttonOk + " " + s.buttonOKDark
        // }
        className={s.buttonCancel}
        tabIndex={1}
    >
        {props.text}
    </div>
}


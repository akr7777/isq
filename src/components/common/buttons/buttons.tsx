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
    return <button
        onClick={props.onClickFunction}
        className={s.buttonOk + " " + props.className}
        // autoFocus={true}
    >
        {props.text}
    </button>
}

export const ButtonCancel = (props: ButtonPropsType) => {
    return <button
        onClick={props.onClickFunction}
        className={s.buttonCancel}
    >
        {props.text}
    </button>
}


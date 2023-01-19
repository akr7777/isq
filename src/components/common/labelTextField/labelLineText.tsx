import { ChangeEvent } from "react";
import s from "./labelLineText.module.css";

type LineTextFieldPropsType = {
    type: 'text' | 'password',
    text: string,
    placeholder?: string | null,
    error?: boolean,
    onChangeFunction: (text: string) => void,
}
export const LineTextField = (props: LineTextFieldPropsType) => {

    const onTextChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value;
        props.onChangeFunction(text)
    }

    return <input 
        type={props.type} 
        value={props.text}
        placeholder={props.placeholder || ""}
        onChange={(e) => onTextChangeHandler(e)}
        className={ props.error 
            ? s.lineTextDecoration + " " + s.error
            : s.lineTextDecoration
        }
    />
}
import { ChangeEvent } from "react";
import s from "./labelLineText.module.css";

type LineTextFieldPropsType = {
    type: 'text' | 'password',
    text: string,
    placeholder?: string | null,
    error?: boolean,
    onChangeFunction: (text: string) => void,
    className?: string,
    icon?: any,
    onIconClickFunction?: () => void,
    autofocus?: boolean
}
export const LineTextField = (props: LineTextFieldPropsType) => {

    const onTextChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value;
        props.onChangeFunction(text)
    }
    const onIconClickHandler = () => {
        if (props.onIconClickFunction) {
            props.onIconClickFunction();
        }
    }

    return <div className={s.lineTextDiv}>
            <input 
                type={props.type} 
                value={props.text}
                placeholder={props.placeholder || ""}
                onChange={(e) => onTextChangeHandler(e)}
                className={ props.error 
                    ? s.lineTextDecoration + " " + s.error + " " + props.className
                    : s.lineTextDecoration + " " + props.className
                }
                autoFocus={props.autofocus}
            />

            {
                props.icon && <img 
                        src={props.icon} 
                        className={s.icon}
                        onClick={onIconClickHandler}
                    />
            }

    </div>
}
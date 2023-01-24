
import { ChangeEvent } from 'react';
import s from './text.module.css';

type MuliLineTextPropsType = {
    text: string,
    onChangeFunction: (newText: string) => void,
    cols?: number,
    rows?: number,
    autofocus?: boolean,
}

const MuliLineText = (props: MuliLineTextPropsType) => {

    const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onChangeFunction(e.currentTarget.value)
    }

    return <textarea
        className={s.textArea}
        rows={props.rows ? props.rows : 9}
        onChange={(e) => onChangeText(e)}
        value={props.text}
        autoFocus={props.autofocus}
    />
}

export default MuliLineText;
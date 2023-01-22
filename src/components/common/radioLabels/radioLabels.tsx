import s from './radioLabel.module.css';
import { MouseEvent } from 'react';

export type RadioLabelOptionType = {
    text: string,
    value: string
}

export type RadioLabelsPropsType = {
    options: Array<RadioLabelOptionType>,
    defaultOption: string,
    className?: string,
    onClickFunction: (value: string) => void,

}
export const RadioLabels = (props: RadioLabelsPropsType) => {

    const onRadioInputClickHandler = (e: MouseEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        if ( props.options.some( el => el.value === value ) ) {
            props.onClickFunction(value);
        }
    }

    return <>
        {
            props.options.map( (o:RadioLabelOptionType, elemIndex: number) => {
                return <div className={s.input_div} key={o.value + "_" + String(elemIndex)}>

                <input type="radio" id={o.value + "_" + String(elemIndex)} name={o.value + "_" + String(elemIndex)} 
                    className={ o.value === props.defaultOption
                            ? s.ligend_input + " " + s.ligend_input_checked
                            : s.ligend_input
                    }
                    value={o.value}
                    onClick={(e) => onRadioInputClickHandler(e)}
                />
                
                <label 
                    htmlFor={o.value + "_" + String(elemIndex)}
                    className={ o.value === props.defaultOption 
                                    ? s.ligend_label + " " + s.ligend_label_checked
                                    : s.ligend_label
                            }
                >
                    { o.text }
                </label>

            </div>
            })
        }
    </>
}
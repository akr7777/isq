import { ChangeEvent } from 'react';
import s from './options.module.css';

export type OptionType = {
    text: string | undefined,
    value: string | undefined
}
export type OptionsPropsType = {
    options: Array<OptionType>,
    defaultOption: string | undefined,
    error?: boolean,
    onChangeEvent: (value: string | undefined) => void
}
const Options = (props: OptionsPropsType) => {

    const onOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        props.onChangeEvent(e.currentTarget.value)
    }

    return <select 
                className={props.error 
                                ? s.selectElement + " " + s.error 
                                : s.selectElement
                          } 
                onChange={(e) => onOptionChange(e)}
                defaultValue={props.defaultOption}
            >
        {
            props.options.map((o: OptionType, elIndex: number) => {
                return <option 
                            key={elIndex} 
                            value={o.value}
                            // selected={o.value === props.defaultOption}
                            // className={s.oneOption}
                        >
                    {o.text}
                </option>
            })
        }
    </select>
}

export default Options;
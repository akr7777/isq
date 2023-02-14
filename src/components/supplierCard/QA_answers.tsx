import { QuestionsTypeRadioMultiTextCheckbox } from "../../store/features/complitedSlice";
import s from "./card.module.css";

export type QAAnswersType = {
    options?: Array<string> | null,
    answer?: string | null,
    answers?: Array<string> | null,
    type: QuestionsTypeRadioMultiTextCheckbox
}

const QAAnswers = (props: QAAnswersType) => {
    return <>
        {
            props.options && props.options.map( (opt:string, ind: number) => 
            <div 
                key={opt+"_"+String(ind)}
                className={
                    props.answers && props.answers.some( ans => ans === opt)
                        ? s.QA_answers_button_div + " " + s.QA_answers_button_div_checked
                        : s.QA_answers_button_div
                }
            >
                {opt}
            </div>)
        }

        {/* Text type */}
        {
            props.type==='text' && <div className={s.QA_multilinetext_answer_div}>
                    {props.answer}
                    {/* <LineTextField type="text" text="" onChangeFunction={()=>{}} /> */}
                </div>
        }
        {/* Multiline type */}
        {
            props.type==='multiline' && <div className={s.QA_multilinetext_answer_div}>
                     {props.answer}
                    {/* <MuliLineText text="" onChangeFunction={()=>{}}/> */}
                </div>
        }
    </>
}

export default QAAnswers;
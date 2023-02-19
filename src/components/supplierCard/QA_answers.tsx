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
        {/* checkbox type */}
        {
            props.type==='checkbox' && props.options && props.options.map( (opt:string, ind: number) => 
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

        {/* radiobutton type */}
        {
            props.type==='radiobutton' && props.options && props.options.map( (opt:string, ind: number) => 
            <div 
                key={opt+"_"+String(ind)}
                className={
                    props.answer && props.answer === opt
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
                    {props.answer || "---- ответ не предоставлен. Что делать с пустым полем? ----"}
                    {/* <LineTextField type="text" text="" onChangeFunction={()=>{}} /> */}
                </div>
        }
        {/* Multiline type */}
        {
            props.type==='multiline' && <div className={s.QA_multilinetext_answer_div}>
                     {props.answer || "---- ответ не предоставлен. Что делать с пустым полем? ----"}
                    {/* <MuliLineText text="" onChangeFunction={()=>{}}/> */}
                </div>
        }
    </>
}

export default QAAnswers;
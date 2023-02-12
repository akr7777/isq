import s from "./card.module.css";

export type QAAnswersType = {
    options?: Array<string> | null,
    answer?: string | null,
    answers?: Array<string> | null,
}

const QAAnswers = (props: QAAnswersType) => {
    return <>
        {
            props.options && props.options.map( opt => 
            <div className={
                props.answers && props.answers.some( ans => ans === opt)
                    ? s.QA_answers_button_div + " " + s.QA_answers_button_div_checked
                    : s.QA_answers_button_div
            }>
                {opt}
            </div>)
        }
    </>
}

export default QAAnswers;
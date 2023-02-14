import { addOptionToAnswerAC, changeAnswerAC, changeOptionToAnswersAC, InitQuestionType, removeOptionToAnswerAC } from "../../store/features/questionsSlice";
import { useAppDispatch } from "../../store/store";
import { LineTextField } from "../common/labelTextField/labelLineText";
import MuliLineText from "../common/multiLineText/multilineText";
import s from './questions.module.css';

type AnswerFieldType = {
    q: InitQuestionType,
    onChangeError: (sec_no: number) => void
}
const AnswerField = ( props: AnswerFieldType ) => {

    const dispatch = useAppDispatch();
    
    const addOptionClickHandler = (seq_no: number, newAnswer: string) => {
        props.onChangeError(seq_no);
        dispatch(addOptionToAnswerAC({seq_no, newAnswer}));
    }
    const removeOptionClickHandler = (seq_no: number, newAnswer: string) => {
        dispatch(removeOptionToAnswerAC({seq_no, newAnswer}));
    }
    const changeOptionClickHandler = (seq_no: number, newAnswers: Array<string>) => {
        dispatch(changeOptionToAnswersAC({seq_no: seq_no, newAnswers: newAnswers}))
    }
    const changeTextAnswerClickHandler = (seq_no: number, newAnswer: string) => {
        dispatch(changeAnswerAC({seq_no: seq_no, newAnswer: newAnswer}))
    }

    return <div>
    {/* checkbox (options) type */}
    {
        (props.q.type==='checkbox' || props.q.type==='radiobutton') && props.q.options && 
            props.q.options.map( (option: string, ind: number) => {
            return <div key={option + "__" + ind}>
                {
                    props.q.answers && props.q.answers.length > 0 && props.q.answers.includes(option)

                        ? <div
                            onClick={
                                props.q.type==='checkbox'
                                    ? () => removeOptionClickHandler(props.q.seq_no, option)
                                    : () => changeOptionClickHandler(props.q.seq_no, [])
                            }
                            className={s.oneOption + " " + s.oneOptionSelected}
                        >
                            {option}
                        </div>

                        : <div
                            onClick={
                                props.q.type==='checkbox'
                                    ? () => addOptionClickHandler(props.q.seq_no, option)
                                    : () => changeOptionClickHandler(props.q.seq_no, [option])
                                }
                            className={s.oneOption}
                        >
                            {option}
                        </div>
                }
                
            </div>
        })
    }




    {/* Text type */}
    {
        props.q.type==='text' && <LineTextField 
                type="text" 
                text="" 
                onChangeFunction={(newText: string)=> changeTextAnswerClickHandler(props.q.seq_no, newText)}
            />
    }
    {/* Multiline type */}
    {
        props.q.type==='multiline' && <MuliLineText 
                text="" 
                onChangeFunction={(newText: string)=> changeTextAnswerClickHandler(props.q.seq_no, newText)}
            />
    }

    </div>
}
export default AnswerField;
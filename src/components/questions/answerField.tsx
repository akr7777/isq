import { useSelector } from "react-redux";
import { addOptionToAnswerAC, changeAnswerAC, changeOptionToAnswersAC, InitQuestionType, 
        removeOptionToAnswerAC, setErrorsAC } 
    from "../../store/features/questionsSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { LineTextField } from "../common/labelTextField/labelLineText";
import MuliLineText from "../common/multiLineText/multilineText";
import s from './questions.module.css';

type AnswerFieldType = {
    q: InitQuestionType,
    // onChangeError: (sec_no: number) => void
}
const AnswerField = ( props: AnswerFieldType ) => {

    const dispatch = useAppDispatch();
    const errors:Array<number> = useSelector((state:RootState) => state.questions.errors);
    
    const addOptionClickHandler = (seq_no: number, newAnswer: string) => {
        dispatch(setErrorsAC([...errors].filter(e => e !== seq_no)));
        dispatch(addOptionToAnswerAC({seq_no, newAnswer}));
    }
    const removeOptionClickHandler = (seq_no: number, newAnswer: string) => {
        dispatch(removeOptionToAnswerAC({seq_no, newAnswer}));
    }
    const changeOptionClickHandler = (seq_no: number, newAnswer: string) => {
        if (newAnswer.length > 0)
            dispatch(setErrorsAC([...errors].filter(e => e !== seq_no)));
        dispatch(changeOptionToAnswersAC({seq_no: seq_no, newAnswer: newAnswer}))
    }
    const changeTextAnswerClickHandler = (seq_no: number, newAnswer: string) => {
        // console.log('AnswerField / changeTextAnswerClickHandler / seq_no=', seq_no, 'newAnswer=', newAnswer);
        dispatch(setErrorsAC( [...errors].filter(e => e !== seq_no) ));
        dispatch(changeAnswerAC({seq_no: seq_no, newAnswer: newAnswer}))
    }


    return <div className={s.answers_div_863}>
    {/* checkbox (options) type */}
    {
        (props.q.type==='checkbox') && props.q.options && 
            props.q.options.map( (option: string, ind: number) => {
            return <div key={option + "_checkbox_" + ind} className={s.oneOption0}>
                {
                    props.q.answers && props.q.answers.length > 0 && props.q.answers.includes(option)

                        ? <div
                            onClick={() => removeOptionClickHandler(props.q.seq_no, option)
                                // props.q.type==='checkbox'
                                //     ? () => removeOptionClickHandler(props.q.seq_no, option)
                                //     : () => changeOptionClickHandler(props.q.seq_no, '')
                            }
                            className={s.oneOption + " " + s.oneOptionSelected}
                        >
                            {option}
                        </div>

                        : <div
                            onClick={() => addOptionClickHandler(props.q.seq_no, option)
                                // props.q.type==='checkbox'
                                //     ? () => addOptionClickHandler(props.q.seq_no, option)
                                //     : () => changeOptionClickHandler(props.q.seq_no, option)
                                }
                            className={s.oneOption}
                        >
                            {option}
                        </div>
                }
                
            </div>
        })
    }

    {/* Radiobutton type  */}
    {
        props.q.type==='radiobutton' && <>
            {
                props.q.options.map( (option: string, ind: number) => 
                <div 
                    key={option + "_radiobutton_" + ind}
                    className={ option === props.q.answer ? s.oneOption + " " + s.oneOptionSelected : s.oneOption }
                    onClick={ option === props.q.answer 
                        ? () => changeOptionClickHandler(props.q.seq_no, '') 
                        : () => changeOptionClickHandler(props.q.seq_no, option)}
                >
                    {option}
                </div>)
            }
        </>
            
    }


    {/* Text type */}
    {
        props.q.type==='text' && <LineTextField 
                type="text" 
                text={props.q.answer || ""}
                onChangeFunction={(newText: string)=> changeTextAnswerClickHandler(props.q.seq_no, newText)}
                className={s.textLineWidth}
            />
    }
    {/* Multiline type */}
    {
        props.q.type==='multiline' && <MuliLineText 
                text={props.q.answer || ""}
                onChangeFunction={(newText: string)=> changeTextAnswerClickHandler(props.q.seq_no, newText)}
            />
    }

    </div>
}
export default AnswerField;
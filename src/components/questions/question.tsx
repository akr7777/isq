
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addOptionToAnswerAC, removeOptionToAnswerAC, InitQuestionType, OptionType } from "../../store/features/questionsSlice";
import { RootState, useAppDispatch } from "../../store/store";
import s from "./questions.module.css";

const Questions = () => {

    const dispatch = useAppDispatch();
    const questions:Array<InitQuestionType> = useSelector( (state: RootState) => state.questions);
    
    const {questionarieId} = useParams();
    // useEffect(() => {
    //     const questions:Array<InitQuestionType> = useSelector( (state: RootState) => state.questions);
    // }, []);

    const addOptionClickHandler = (question_id: number, option: OptionType) => {
        dispatch(addOptionToAnswerAC({question_id, option}));
    }
    const removeOptionClickHandler = (question_id: number, option: OptionType) => {
        dispatch(removeOptionToAnswerAC({question_id, option}));
    }


    return <div className={s.questions}>
        questionarieId: {questionarieId}
        Questions:

        {
            questions.map( (q:InitQuestionType) => {
                return <div className={s.oneQuestion} key={q.question_id}>

                    <label>{q.question}</label>

                    {
                        q.options.map( (option: OptionType, ind: number) => 
                            
                                q.answer.includes(option)

                                ? <div
                                    key={ind}
                                    onClick={() => removeOptionClickHandler(q.question_id, option)}
                                    className={s.oneOption + " " + s.oneOptionSelected}
                                >
                                    {option}
                                </div>

                                : <div
                                    key={ind}
                                    onClick={() => addOptionClickHandler(q.question_id, option)}
                                    className={s.oneOption}
                                >
                                    {option}
                                </div>
                            
                            // <div 
                            //     onClick={() => addOptionClickHandler(q.question_id, option)}
                            //     className={q.answer.includes(option) ? s.oneOption + " " + s.oneOptionSelected : s.oneOption}
                            // >
                            //     {option}
                            // </div>
                            )
                    }


                </div>
            })
        }

    </div>
}

export default Questions;
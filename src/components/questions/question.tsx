import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetQuestionsPartRequestType, getQuestionsPartThunk, InitQuestionType } 
    from "../../store/features/questionsSlice";
import { RootState, useAppDispatch } from "../../store/store";
import Preloader from "../common/preloader/preloader";
import AnswerField from "./answerField";
import QuestionsProgressBar from "./progressBar";
import s from "./questions.module.css";
import QuestionsButtons from "./questionsButtons";

const Questions = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const questions:Array<InitQuestionType> = useSelector( (state: RootState) => state.questions.questions);
    
    const { questionarieId } = useParams();
    
    const totalParts: number = useSelector((state:RootState) => state.questions.total_parts);
    // const isFilled: boolean = useSelector((state: RootState) => state.questions.is_filled);
    const errors: Array<number> = useSelector((state: RootState) => state.questions.errors);
    const isLoading: boolean = useSelector((state:RootState) => state.questions.isLoading);
    const partNumber: number = useSelector((state:RootState) => state.questions.partNumber);

    useEffect(() => {
        const data:GetQuestionsPartRequestType = { questionarieId: questionarieId || "", partNumber: partNumber}
        dispatch(getQuestionsPartThunk(data));
    }, [questionarieId, partNumber]);

    return <div className={s.questions}>
        
        {
            isLoading
                ? <Preloader />
                : partNumber > totalParts
                    ? <div>{ t("questionarie_successful_filled") }</div>
                    : questions.length > 0
                        ? <>
                            questionarieId: {questionarieId}, partN: {partNumber},

                            <QuestionsProgressBar totalPages={totalParts} currentPage={Number(partNumber)}/>
                            <label>Questions:</label>
                            {
                                questions.map( (q:InitQuestionType, ind: number) => {
                                    return <div className={s.oneQuestion} key={q.question + "_" + String(ind)}>

                                        <div className={s.question_div_824}>
                                            {q.question}
                                            {q.type}
                                            { q.is_required ? <label>requred</label> : <label>not requred</label>}
                                            { errors.some(e => e === q.seq_no) && <label className={s.questions_error_label}>{t("questions_required_question")}</label>}
                                        </div>

                                        <AnswerField 
                                            q={ {...q} } 
                                            // onChangeError={(sec_no:number) => setErrors([...errors].filter(e => e !== sec_no))}
                                        />

                                    </div>
                                }) 
                            }
                            <QuestionsButtons />
                        </> 
                        : <div>{ t("questions_no_questions_received") }</div>
        }

        
        
    </div>
}

export default Questions;
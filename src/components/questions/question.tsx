import { loadPlugin } from "immer/dist/internal";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addOptionToAnswerAC, AnswersArrayType, GetQuestionsPartRequestType, getQuestionsPartThunk, InitQuestionType, removeOptionToAnswerAC, sendQuestionsPartThunk, SendQuestionsPartType, } from "../../store/features/questionsSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { ButtonOK } from "../common/buttons/buttons";
import { LineTextField } from "../common/labelTextField/labelLineText";
import MuliLineText from "../common/multiLineText/multilineText";
import { PATHS } from "../outlet/outlet";
import AnswerField from "./answerField";
import QuestionsProgressBar from "./progressBar";
import s from "./questions.module.css";

const Questions = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const questions:Array<InitQuestionType> = useSelector( (state: RootState) => state.questions.questions);
    
    const { questionarieId, partNumber } = useParams();
    
    let answersData:SendQuestionsPartType;
    if (questionarieId && partNumber) {
        answersData = {
            questionarieId: questionarieId,
            partNumber: Number(partNumber),
            answersArray: questions.map( el => {
                return {
                    seq_no: el.seq_no,
                    answer: el.answer || "",
                    answers: el.answers || []
                }
            })
        }
    }

    useEffect(() => {
        const data:GetQuestionsPartRequestType = { questionarieId: questionarieId || "", partNumber: partNumber || ""}
        dispatch(getQuestionsPartThunk(data));
    }, [questionarieId, partNumber]);

    const totalPages: number = 5;
    

    const [errors, setErrors] = useState<number[]>([]);

    const nextChapterClickHandler = () => {
        const questionsWithoutAnswer = [...questions].filter(el => 
            el.is_required && 
            ( (el.answer === null || el.answer.length === 0) && el.answers.length === 0)
            );
        console.log('1:q:', questions);
        console.log('questionsWithoutAnswer=',questionsWithoutAnswer);
        
        if ( questionsWithoutAnswer.length === 0 ) {
            dispatch(sendQuestionsPartThunk(answersData))
            navigate(PATHS.questions + '/' + questionarieId + '/' + String(Number(partNumber) + 1) );
        } else {
            setErrors (questionsWithoutAnswer.map(el => el.seq_no));
        }
    }
    const prevChapterClickHandler = () => {
        navigate(PATHS.questions + '/' + questionarieId + '/' + String(Number(partNumber) - 1) );
    }


    return <div className={s.questions}>
        questionarieId: {questionarieId}, partN: {partNumber},

        

        { 
            questions.length > 0 && <>
                <QuestionsProgressBar totalPages={totalPages} currentPage={Number(partNumber)}/>
                <label>Questions:</label>
            </> 
        }

        {
            questions.map( (q:InitQuestionType, ind: number) => {
                return <div className={s.oneQuestion} key={q.question + "_" + String(ind)}>

                    <div className={ errors.some(e => e === q.seq_no) ? s.question_div_824 + " " + s.question_div_824_error : s.question_div_824}>
                        {q.question}
                        { errors.some(e => e === q.seq_no) && <label className={s.questions_error_label}>{t("questions_required_question")}</label>}
                    </div>

                    <AnswerField 
                        q={ {...q} } 
                        onChangeError={(sec_no:number) => setErrors([...errors].filter(e => e !== sec_no))}
                    />

                </div>
            }) 
        }

        {
            Number(partNumber) > totalPages
                ? <div>{ t("questionarie_successful_filled") }</div>
                : <div className={s.controlButtonsDiv}>
                    {
                        Number(partNumber) > 1 && <ButtonOK 
                                text={ t("questionsToSupplier_prevButton") }
                                onClickFunction={prevChapterClickHandler} 
                            />
                    }
        
                    <ButtonOK 
                        text={ Number(partNumber) < totalPages ? t("questionsToSupplier_nextButton") : t("questionsToSupplier_complite") } 
                        onClickFunction={nextChapterClickHandler} 
                    />
                </div>
        }
        

    </div>
}

export default Questions;
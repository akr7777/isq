import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { changePartNumber, InitQuestionType, sendQuestionsPartThunk, SendQuestionsPartType, setErrorsAC } from "../../store/features/questionsSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { ButtonOK } from "../common/buttons/buttons";
import s from "./questions.module.css";

const QuestionsButtons = () => {

    const dispatch = useAppDispatch();
    const { questionarieId } = useParams();
    const {t} = useTranslation();
    const questions:Array<InitQuestionType> = useSelector( (state: RootState) => state.questions.questions);
    const totalParts: number = useSelector((state:RootState) => state.questions.total_parts);
    const partNumber: number = useSelector((state:RootState) => state.questions.partNumber);

    const answersData:SendQuestionsPartType = {
        questionarieId: questionarieId || "",
        partNumber: Number(partNumber),
        answersArray: questions.map( el => {
            return {
                seq_no: el.seq_no,
                answer: el.answer || "",
                answers: el.answers || []
            }
        })
    }

    const nextChapterClickHandler = () => {
        const questionsWithoutAnswer = [...questions].filter(el => 
            el.is_required && 
            ( (el.answer === null || el.answer.length === 0) && el.answers.length === 0)
            );
        if ( questionsWithoutAnswer.length === 0 ) {
            dispatch(setErrorsAC([]));
            dispatch(sendQuestionsPartThunk(answersData));
        } else {
            dispatch(setErrorsAC(questionsWithoutAnswer.map(el => el.seq_no)));
        }
    }
    const prevChapterClickHandler = () => {
        if (partNumber > 1) {
            dispatch(setErrorsAC([]));
            dispatch(changePartNumber(partNumber - 1));
        }
    }

    return <div className={s.controlButtonsDiv}>
    {
        Number(partNumber) > 1 && <ButtonOK 
                text={ t("questionsToSupplier_prevButton") }
                onClickFunction={prevChapterClickHandler} 
                className={s.lower_button_class}
            />
    }
    <ButtonOK 
        text={ partNumber === totalParts ? t("questionsToSupplier_complite") : t("questionsToSupplier_nextButton") } 
        onClickFunction={nextChapterClickHandler} 
        className={s.lower_button_class}
    />
    
</div>
}

export default QuestionsButtons;
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FormatDateType } from '../../store/features/authSlice';
import { QuestionsComplitedSliceType } from '../../store/features/complitedSlice';
import { RootState } from '../../store/store';
import cardStyle from './card.module.css';
import QAAnswers from './QA_answers';

const QA = () => {
    const {t} = useTranslation();

    const parts:{ [part: string]: Array<QuestionsComplitedSliceType> } = useSelector((state:RootState) => state.complited.parts);
    const keysArr:Array<string> = Object.keys(parts);
    const dateFormat:FormatDateType = useSelector((state:RootState) => state.auth.userSettings.date_format);
    
    return <div className={cardStyle.qaDiv + " " + cardStyle.appearance}>

        {
            keysArr.map( (keyPart:string, ind1: number) => {
                return <div key={'first_'+String(ind1)} className={cardStyle.qaDivOne}>

                    <h3>Часть {keyPart}</h3>

                    {/* <div key={ind1} className={cardStyle.one_QA_part}> */}
                    
                    {
                        parts[keyPart].map( (el:QuestionsComplitedSliceType, ind2: number) => {

                            return <div key={'Second_'+String(ind2)} className={cardStyle.one_QA_part}>
                                <div className={cardStyle.QA_question}>
                                    <label>{el.question}</label>
                                    { el.is_required ? <label>Обязателен</label> : <label>Не Обязателен</label> }
                                    <label>{el.type}</label>
                                    <label>{ dayjs(el.created_at).format(dateFormat) }</label>
                                </div>
                                <div className={cardStyle.QA_answers}>
                                    <QAAnswers options={el.options} answer={el.answer} answers={el.answers} type={el.type}/>
                                    {/* <label>{el.risks}</label>
                                    <label>{el.answer}</label> */}
                                    {/* <label>{el.answers}</label>
                                    <label>{el.options}</label> */}
                                </div>
                                {/* <div className={cardStyle.qaQuestion}>
                                    <label>{el.question}</label>
                                </div>
                                <div className={cardStyle.qaAnswer}>
                                    {
                                        el.answer && el.answer.length > 0 && <label>{el.answer}</label>
                                    }
                                    {
                                        el.answers && el.answers.length > 0 && el.answers.map( ans => <label>{ans}</label>)
                                    }
                                </div> */}
                            </div>
                        })
                    }
                {/* </div> */}
                </div>
            })
        }

        {/* <div className={cardStyle.qaQuestion}>
            <label>Вопрос 1</label>
        </div>
        <div className={cardStyle.qaAnswer}>
            <label>Ответы на вопрос 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</label>
        </div>
        <div className={cardStyle.qaQuestion}>
            <label>Вопрос 2</label>
        </div>
        <div className={cardStyle.qaAnswer}>
            <label>Ответы на вопрос 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</label>
        </div> */}
        
    </div>
}

export default QA;
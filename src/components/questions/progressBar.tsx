import { useTranslation } from 'react-i18next';
import s from './progress.module.css';
import s1 from './progress1.module.css';

type QuestionsProgressBarPropsType = {
    totalPages: number,
    currentPage: number
}
const QuestionsProgressBar = (props: QuestionsProgressBarPropsType) => {
    const {t} = useTranslation();
    // const totalPages = 5;
    // const currentPage = 3;

    const arr: Array<number> = [];
    for (let i = 1; i <= props.totalPages; i++)
        arr.push(i)

    return <div className={s.stepper_wrapper}>
        
        {
            arr.map( el => {
                const currentClass: string = el < props.currentPage
                                        ? el === props.currentPage
                                            ? s.stepper_item + " " + s.active + " " + s.current_item_border
                                            : s.stepper_item + " " + s.completed
                                        : s.stepper_item

                return <div key={el} className={currentClass}>
                    <div className={s.step_counter}>{el}</div>
                    <div className={s.step_name}>{ t("partN_" + String(el)) }</div>
                </div>
            })
        }


        {/* <div className={s1.container}>
        <ul className={s1.progressbar}>
            <li className={s1.active}>Step 1</li>
            <li>Step 2</li>
            <li>Step 3</li>
            <li>Step 4</li>
            <li>Step 5</li>
        </ul>
        </div>
        
            <div className={s.stepper_item + " " + s.completed}>
                <div className={s.step_counter}>1</div>
                <div className={s.step_name}>First</div>
            </div>
            <div className={s.stepper_item + " " + s.completed}>
                <div className={s.step_counter}>2</div>
                <div className={s.step_name}>Second</div>
            </div>
            <div className={s.stepper_item + " " + s.active}>
                <div className={s.step_counter}>3</div>
                <div className={s.step_name}>Third</div>
            </div>
            <div className={s.stepper_item}>
                <div className={s.step_counter}>4</div>
                <div className={s.step_name}>Forth</div>
            </div> */}

            
        </div>
}

export default QuestionsProgressBar;
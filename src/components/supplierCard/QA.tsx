import cardStyle from './card.module.css';

const QA = () => {
    return <div className={cardStyle.qaDiv + " " + cardStyle.appearance}>
        <div className={cardStyle.qaQuestion}>
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
        </div>
        
    </div>
}

export default QA;
import s from "./preloader.module.css";

const Preloader = () => {
    return <div>
        <label className={s.preloader}>
            Загрузка данных...
        </label>
    </div>
}

export default Preloader;
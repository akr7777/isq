import { useTranslation } from "react-i18next";
import s from "./preloader.module.css";

const Preloader = () => {
    const { t } = useTranslation();
    return <>
        <center>
            <label className={s.preloader}>
                { t("isLoadingOn") }
            </label>
        </center>
    </>
}

export default Preloader;
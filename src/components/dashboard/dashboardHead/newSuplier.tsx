import { t } from "i18next";
import ButtonOK from "../../common/buttonOK/buttonOK";
import s from './../dashboard.module.css';

const NewSuplier = () => {

    const onNewSupplierCreationClickHandler = () => {

    }

    return <div className={s.newCreationDiv}>
        <ButtonOK 
            text={t("newCompany")}
            onClickFunction={onNewSupplierCreationClickHandler}
        />
    </div>
}

export default NewSuplier;
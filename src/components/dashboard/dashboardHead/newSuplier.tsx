import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { ButtonOK } from "../../common/buttons/buttons";
import { PATHS } from "../../outlet/outlet";
import s from './../dashboard.module.css';

const NewSuplier = () => {

    const navigate = useNavigate();
    const onNewSupplierCreationClickHandler = () => {
        navigate(PATHS.newSupplier);
    }

    return <div className={s.newCreationDiv}>
        <ButtonOK 
            text={t("newCompany")}
            onClickFunction={onNewSupplierCreationClickHandler}
        />
    </div>
}

export default NewSuplier;
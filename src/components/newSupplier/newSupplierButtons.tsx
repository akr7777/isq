import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { newSupplierChangeInfo } from "../../store/features/newSupplierSlice";
import { useAppDispatch } from "../../store/store";
import { ButtonCancel, ButtonOK } from "../common/buttons/buttons";
import { PATHS } from "../outlet/outlet";
import s from "./newSupplier.module.css";

type NewSupplierFirstButtonsPropsType = { onClick: () => void }

export const NewSupplierFirstButtons = (props: NewSupplierFirstButtonsPropsType) => {
    const {t} = useTranslation();

    return <div className={s.buttonsDiv + " " + s.btn_width}>
        <ButtonOK 
            text={ t("newSupplier_create_new") }
            onClickFunction={props.onClick}
        />
        <ButtonCancel 
            text={ t("newSupplier_cancel_new") }
            onClickFunction={props.onClick}
        />
    </div>
}

export const NewSupplierSecondButtons = () => {

    const navigate = useNavigate();
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const onNewCompanyClickHandler = () => {
        const info = { id: '', company: '', ticket: '' }
        dispatch(newSupplierChangeInfo(info))
    }

    return <div className={s.newSupplierButtons}>
        <ButtonOK
            text={ t("newSupplier_goToMainPage")}
            onClickFunction={() => navigate(PATHS.dashboard)}
        />
        <ButtonOK 
            text={ t("newCompany") }
            onClickFunction={onNewCompanyClickHandler}
        />
    </div>
}

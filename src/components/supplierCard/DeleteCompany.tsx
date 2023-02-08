import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCompanyThunk } from "../../store/features/supplierThunks";
import { useAppDispatch } from "../../store/store";
import { ButtonCancel } from "../common/buttons/buttons";
import { PATHS } from "../outlet/outlet";

const DeleteCompany = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { supplierId } = useParams();
    const {t} = useTranslation();

    const onDelButtonClickHandler = () => {
        if (supplierId)
            dispatch(deleteCompanyThunk(supplierId));
        navigate(PATHS.dashboard);
    }

    return <>
        <ButtonCancel 
            text={ t("supplierCard_delete_this_questionare") } 
            onClickFunction={onDelButtonClickHandler}            
        />
    </>
}

export default DeleteCompany;
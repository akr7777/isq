import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCompanyThunk, DeleteCompanyThunkPropsType } from "../../store/features/supplierThunks";
import { RootState, useAppDispatch } from "../../store/store";
import { ButtonCancel } from "../common/buttons/buttons";
import s from './card.module.css';

const DeleteCompany = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { supplierId } = useParams();
    const {t} = useTranslation();
    const deleteError: string = useSelector((state:RootState) => state.complited.errors.deleteError);

    const onDelButtonClickHandler = () => {
        if (supplierId) {
            const dataForDelete:DeleteCompanyThunkPropsType = {
                companyId: supplierId,
                navigate: navigate
            }
            dispatch(deleteCompanyThunk(dataForDelete));
        }
    }

    return <>

        {   deleteError.length > 0 && <div className={s.delete_questionarie_error}> {deleteError} </div>  }

        <ButtonCancel 
            text={ t("supplierCard_delete_this_questionare") } 
            onClickFunction={onDelButtonClickHandler}            
        />
        
    </>
}

export default DeleteCompany;
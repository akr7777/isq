import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { changePurchaseTicketSearchAC } from '../../../../store/features/supplierSlice';
import { RootState, useAppDispatch } from '../../../../store/store';
import { LineTextField } from '../../../common/labelTextField/labelLineText';
import s from './search.module.css';
import ticketIcon from '../../../../public/icons/purchase_ticket.png';


const SearchByPurchaseTicket = () => {
    const ticket:string = useSelector((state:RootState) => state.supplier.searchByPurchaseTicket);
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const onTicketFieldChangeHandler = (newTicket: string) => {
        dispatch(changePurchaseTicketSearchAC(newTicket));
    }

    return <div className={s.searchDateComplitedDiv}>
        <LineTextField 
            type="text"
            text={ ticket }
            // text={ (date && date !== undefined) ? date.toLocaleDateString() : "" }
            onChangeFunction={(text: string) => onTicketFieldChangeHandler(text)}
            className={s.textWidth}
            icon={ticketIcon}
            // onIconClickFunction={() => setShow(!show)}
            placeholder={ t("search_ticket_placeholder") }
        />
    </div>
}

export default SearchByPurchaseTicket;
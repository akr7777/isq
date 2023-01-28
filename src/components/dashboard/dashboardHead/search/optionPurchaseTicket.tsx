import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { changePurchaseTicketSearchAC, SEARCH_TEXT_DELAY } from '../../../../store/features/supplierSlice';
import { RootState, useAppDispatch } from '../../../../store/store';
import { LineTextField } from '../../../common/labelTextField/labelLineText';
import s from './search.module.css';
import ticketIcon from '../../../../public/icons/purchase_ticket.png';
import useDebounce from '../../../../hooks/debounced-hook';
import { useEffect } from 'react';


const SearchByPurchaseTicket = () => {
    const ticket:string = useSelector((state:RootState) => state.supplier.searchingOptions.searchByPurchaseTicket);
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const debouncedValue = useDebounce<string>(ticket, SEARCH_TEXT_DELAY);

    useEffect(() => {
        if (ticket.length > 0) {
            console.log('!!!ticket=',ticket);
        }
    }, [debouncedValue])

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
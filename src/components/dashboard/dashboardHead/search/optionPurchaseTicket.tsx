import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { changePurchaseTicketSearchAC, SEARCH_TEXT_DELAY } from '../../../../store/features/supplierSlice';
import { RootState, useAppDispatch } from '../../../../store/store';
import { LineTextField } from '../../../common/labelTextField/labelLineText';
import s from './search.module.css';
import ticketIcon from '../../../../public/icons/purchase_ticket.png';
import useDebounce from '../../../../hooks/debounced-hook';
import { useEffect, useState } from 'react';
import { getCompaniesThunk } from '../../../../store/features/supplierThunks';


const SearchByPurchaseTicket = () => {
    // const ticket:string = useSelector((state:RootState) => state.supplier.searchingOptions.searchByPurchaseTicket);
    const [ticket, setTicket] = useState<string>('')
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const debouncedValue = useDebounce<string>(ticket, SEARCH_TEXT_DELAY);

    useEffect(() => {
        dispatch(changePurchaseTicketSearchAC(ticket));
        dispatch(getCompaniesThunk({
            page: 1,
            fieldForSearch: 'searchByPurchaseTicket',
            valueForSearch: ticket,
        }))
    }, [debouncedValue])


    // useEffect(() => {
    //     dispatch(searchFieldChangeAC(searchInput));
    //     dispatch(getCompaniesThunk({
    //         page: 1,
    //         fieldForSearch: 'searchField',
    //         valueForSearch: searchInput,
    //     }))
    // }, [debouncedValue])
    // const onTicketFieldChangeHandler = (newTicket: string) => {
    //     dispatch(changePurchaseTicketSearchAC(newTicket));
    // }

    return <div className={s.searchDateComplitedDiv}>
        <LineTextField 
            type="text"
            text={ ticket }
            // text={ (date && date !== undefined) ? date.toLocaleDateString() : "" }
            onChangeFunction={(text: string) => setTicket(text)}
            className={s.textWidth}
            icon={ticketIcon}
            // onIconClickFunction={() => setShow(!show)}
            placeholder={ t("search_ticket_placeholder") }
        />
    </div>
}

export default SearchByPurchaseTicket;
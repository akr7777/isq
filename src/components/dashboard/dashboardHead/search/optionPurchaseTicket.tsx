import { useTranslation } from 'react-i18next';
import { changePurchaseTicketSearchAC, SEARCH_TEXT_DELAY } from '../../../../store/features/supplierSlice';
import { RootState, useAppDispatch } from '../../../../store/store';
import { LineTextField } from '../../../common/labelTextField/labelLineText';
import s from './search.module.css';
import ticketIcon from '../../../../public/icons/purchase_ticket.png';
import useDebounce from '../../../../hooks/debounced-hook';
import { useEffect, useState } from 'react';
import { getCompaniesThunk } from '../../../../store/features/supplierThunks';
import { useSelector } from 'react-redux';


const SearchByPurchaseTicket = () => {
    const [ticket, setTicket] = useState<string>('')
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const debouncedValue = useDebounce<string>(ticket, SEARCH_TEXT_DELAY);

    const currentStatePageNumber: number = useSelector((state: RootState) => state.supplier.pageOptions.currentPage);
    const searchPageNumber:number = currentStatePageNumber > 1 ? 1 : currentStatePageNumber
    useEffect(() => {
        dispatch(changePurchaseTicketSearchAC(ticket));
        dispatch(getCompaniesThunk({
            page: searchPageNumber,
            fieldForSearch: 'searchByPurchaseTicket',
            valueForSearch: ticket,
            where: 'SearchByPurchaseTicket / useEffect'
        }))
    }, [debouncedValue])


    return <div className={s.searchDateComplitedDiv}>
        <LineTextField 
            type="text"
            text={ ticket }
            onChangeFunction={(text: string) => setTicket(text)}
            className={s.textWidth}
            icon={ticketIcon}
            placeholder={ t("search_ticket_placeholder") }
        />
    </div>
}

export default SearchByPurchaseTicket;
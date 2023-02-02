import { useState } from 'react';
import { LineTextField } from '../common/labelTextField/labelLineText';
import s from './newSupplier.module.css';
import { useTranslation } from 'react-i18next';
import iconTicket from "../../public/icons/purchase_ticket.png";
import iconCompany from "../../public/icons/icon_company.png";
import { RootState, useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { createNewSupplierThunk, newSupplierChangeInfoAC, NewSupplierType } from '../../store/features/newSupplierSlice';
import Preloader from '../common/preloader/preloader';
import { NewSupplierSecondButtons, NewSupplierFirstButtons } from './newSupplierButtons';
import NewSuplierLinkCreated from './newSupplierLinkCreated';


const NewSupplier = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const company: string = useSelector((state: RootState) => state.newSupplier.company)
    const ticket: string = useSelector((state: RootState) => state.newSupplier.ticket)
    const newSupplierLink: string = useSelector((state:RootState) => state.newSupplier.link);
    const isLoading: boolean = useSelector((state:RootState) => state.newSupplier.isLoading);
    const [error, setError] = useState<string>('');

    // const createdSupplierName:string = useSelector((state:RootState) => state.newSupplier.company);
    // const createdSupplierTicket: string | null = useSelector((state:RootState) => state.newSupplier.ticket);

    const onNewSupplierNameChangeHandler = (newText: string) => {
        dispatch(newSupplierChangeInfoAC( {company: newText} ));
        setError('');
    }
    const onSupplierTicketChangeHandler = (newText: string) => {
        dispatch(newSupplierChangeInfoAC( {ticket: newText} ));
        setError('');
    }

    const onNewSupplierCreateClickHandler = () => {
        if (company.length > 0) {
            dispatch(createNewSupplierThunk({company: company, ticket: ticket}));
        } else {
            const errorMessage:string = t("required_field");
            setError(errorMessage);
        }
    }

    return <div className={s.newWrapper}>
        <div>
            <h1>{ t("newSupplier_title") }</h1>
        </div>

        {
            newSupplierLink.length === 0 && <>
            
                    <div className={s.fields}>
                        <div className={s.oneField + " " + s.fields_width}>
                            <label>{ t("newSupplier_name") }</label>

                            <LineTextField 
                                type='text'
                                text={company}
                                placeholder={ t("newSupplier_name_placeholder") }
                                error={error.length > 0}
                                onChangeFunction={ (newText:string) => onNewSupplierNameChangeHandler(newText) }
                                className={s.labelText + " " + s.company_label_width}
                                autofocus={true}
                                icon={iconCompany}
                            />

                            {
                                error.length > 0 && <div className={s.error}>{ t("required_field") }</div>
                            }
                        </div>

                        <div className={s.oneField + " " + s.fields_width}>
                            <label>{ t("newSupplier_ticketLink") }</label>

                            <LineTextField 
                                type='text'
                                text={ticket}
                                placeholder={ t("newSupplier_ticketLink_placeholder") }
                                onChangeFunction={ (newText:string) => onSupplierTicketChangeHandler(newText) }
                                className={s.labelText}
                                icon={iconTicket}
                            />
                        </div>

                    </div>

                    <NewSupplierFirstButtons onClick={onNewSupplierCreateClickHandler} />

                </>
        }

        {
            isLoading 
                ? <Preloader />
                : <>
                    {
                        newSupplierLink.length > 0 && <div className={s.newSupplier_link_div}>
                            <h3>{ t("newSupplier_link_send_it_1") }</h3>

                            <h3>
                                { t("newSupplier_company_name") } 
                                { company }
                            </h3>
                            {
                                ticket && <h3>
                                    { t("newSupplier_ticket") }
                                    { ticket }
                                </h3>
                            }
                            

                            <h3>{ t("newSupplier_link_send_it_2") }</h3>


                            <NewSuplierLinkCreated newSupplierLink={newSupplierLink}/>

                            <NewSupplierSecondButtons />
                        </div>
                    }
                </>
            
        }
        
    </div>
}

export default NewSupplier;
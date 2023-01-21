import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonCancel, ButtonOK } from '../common/buttons/buttons';
import { LineTextField } from '../common/labelTextField/labelLineText';
import { PATHS } from '../outlet/outlet';
import s from './newSupplier.module.css';
import { useTranslation } from 'react-i18next';
import iconCopyGreen from '../../public/icons/icon_copy_green.png';
import iconCopyBlue from '../../public/icons/icon_copy_blue.png';


const NewSupplier = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [supplierName, setSupplierName] = useState<string>('');
    const [purchaseTicket, setPurchaseTicket] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [newSupplierLink, setNewSupplierLink] = useState<string>('');
    const [copyLinkSuccess, setCopyLinkSuccess] = useState<boolean>(false);

    const delay = (seconds: number) => new Promise(resolve => setTimeout(resolve,seconds*1000)) 

    const onNewSupplierNameChangeHandler = (newText: string) => {
        setSupplierName(newText);
        setError('');
    }
    const onNewSupplierCreateClickHandler = () => {
        if (supplierName.length > 0) {
            setNewSupplierLink("https://example.com/kshfgskjfgbsubrevgsbvhbvsjhhsvcs");
        } else {
            const errorMessage:string = t("required_field");
            setError(errorMessage);
        }
    }
    const onNewSupplierCancelClickHandler = () => {
        navigate(PATHS.dashboard);
    }
    const copyToBuffer = async () => {
        navigator.clipboard.writeText(newSupplierLink)
        .then(async () => {
            setCopyLinkSuccess(true);
            await delay(3);
            setCopyLinkSuccess(false);
        })
        .catch(err => {
            console.log('Something went wrong', err);
        });
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
                                text={supplierName}
                                placeholder={ t("newSupplier_name_placeholder") }
                                error={error.length > 0}
                                onChangeFunction={ (newText:string) => onNewSupplierNameChangeHandler(newText) }
                                className={s.labelText}
                            />

                            {
                                error.length > 0 && <div className={s.error}>{ t("required_field") }</div>
                            }
                        </div>

                        <div className={s.oneField + " " + s.fields_width}>
                            <label>{ t("newSupplier_ticketLink") }</label>

                            <LineTextField 
                                type='text'
                                text={purchaseTicket}
                                placeholder={ t("newSupplier_ticketLink_placeholder") }
                                onChangeFunction={ (newText:string) => setPurchaseTicket(newText) }
                                className={s.labelText}
                            />
                        </div>

                    </div>

                    <div className={s.buttonsDiv + " " + s.btn_width}>
                        <ButtonOK 
                            text={ t("newSupplier_create_new") }
                            onClickFunction={onNewSupplierCreateClickHandler}
                        />
                        <ButtonCancel 
                            text={ t("newSupplier_cancel_new") }
                            onClickFunction={onNewSupplierCancelClickHandler}
                        />
                    </div>
                </>
        }

        
        
        {
            newSupplierLink.length > 0 && <div className={s.newSupplier_link_div}>
                <h2>{ t("newSupplier_link_send_it") }</h2>

                <div className={s.newSupplier_link_link}>
                    <h3 className={s.newSupplier_link_link_text}>{ newSupplierLink }</h3>

                    {
                        copyLinkSuccess 
                            ? <img src={iconCopyGreen} className={s.copy_icon}/>
                            : <img src={iconCopyBlue} className={s.copy_icon} onClick={() => copyToBuffer()}/>
                            // ? <h2>{ t("newSupplier_linkCopied") }</h2>
                            // : <button 
                            //         onClick={() => copyToBuffer()}
                            //     >
                            //         Скопировать ссылку (в виде иконки)
                            //     </button>
                    }
                </div>
                
                
                {/* name: {supplierName}
                ticket: {purchaseTicket} */}
            </div>
        }
        
    </div>
}

export default NewSupplier;
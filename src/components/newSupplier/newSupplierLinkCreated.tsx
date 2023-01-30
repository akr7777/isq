import { useState } from "react";
import { LineTextField } from "../common/labelTextField/labelLineText";
import s from "./newSupplier.module.css";
import iconCopyGreen from '../../public/icons/icon_copy_green.png';
import iconCopyBlue from '../../public/icons/icon_copy_blue.png';

type NewSuplierLinkCreatedPropsType = { newSupplierLink: string }

const NewSuplierLinkCreated = (props: NewSuplierLinkCreatedPropsType) => {

    const [copyLinkSuccess, setCopyLinkSuccess] = useState<boolean>(false);

    const delay = (seconds: number) => new Promise(resolve => setTimeout(resolve,seconds*1000)) 

    const copyToBuffer = async () => {
        navigator.clipboard.writeText(props.newSupplierLink)
        .then(async () => {
            setCopyLinkSuccess(true);
            await delay(3);
            setCopyLinkSuccess(false);
        })
        .catch(err => {
            console.log('Something went wrong', err);
        });
    }

    return <div className={s.newSupplier_link_link}>
        <LineTextField
            type='text'
            text={ props.newSupplierLink }
            onChangeFunction={() => {}}
            className={s.newSupplier_link_link_width1}
        />
        {
            copyLinkSuccess 
                ? <img src={iconCopyGreen} className={s.copy_icon}/>
                : <img src={iconCopyBlue} className={s.copy_icon} onClick={() => copyToBuffer()}/>
        }
    </div>
}

export default NewSuplierLinkCreated;
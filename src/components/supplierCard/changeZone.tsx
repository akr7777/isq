import { t } from "i18next";
import { useState } from "react";
import { useSelector } from "react-redux";
import { onRiskAndCommentChange, OnRiskAndCommentChangeType } from "../../store/features/complitedSlice";
import { RISK_HIGH, RISK_LOW, RISK_MEDIUM, RiskType } from "../../store/features/supplierSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { ButtonOK } from "../common/buttons/buttons";
import MuliLineText from "../common/multiLineText/multilineText";
import Options from "../common/Options/options";
import cardStyle from "./card.module.css";

const ChangeZone = () => {
    const dispatch = useAppDispatch();

    const currentRisk:RiskType = useSelector((state:RootState) => state.complited.risk);
    const comment:string = useSelector((state:RootState) => state.complited.comment);

    const [error, setError] = useState<string>('');
    const [newRisk, setNewRisk] = useState<RiskType>(currentRisk);
    const [newComment, setNewComment] = useState<string>(comment);

    const onNewRiskChanged = (value: string | undefined) => {
        if ( value === RISK_LOW || value === RISK_MEDIUM || value === RISK_HIGH ) {
            setNewRisk(value);
            setError('');
        } else {
            setNewRisk(undefined);
            const errorText: string =  t("required_field");
            setError(errorText)
        }
    }
    const onNewCommitChangeHandler = (text: string) => {
        setNewComment(text)
    }
    const onSaveClickHandler = () => {
        if ( newRisk === RISK_LOW || newRisk === RISK_MEDIUM || newRisk === RISK_HIGH ) {
            const newData:OnRiskAndCommentChangeType = {
                risk: newRisk,
                comment: newComment
            }
            dispatch(onRiskAndCommentChange(newData));
        } else {
            const errorText: string =  t("required_field");
            setError(errorText)
        }
    }

    

    return <div className={cardStyle.changeZoneDiv + " " + cardStyle.appearance}>

        <div className={cardStyle.changeZone_Risk}>
            <label>{ t("supplierCard_risk") }</label> 
            <Options 
                options={[
                    {text: "-", value: undefined},
                    {text: "Low", value: RISK_LOW},
                    {text: "Medium", value: RISK_MEDIUM},
                    {text: "High", value: RISK_HIGH}
                ]}
                defaultOption={currentRisk}
                onChangeEvent={ (value) => onNewRiskChanged(value) }
                error={error.length > 0}
            />
            <div className={cardStyle.formErrorDiv}>
                {error}
            </div>
        </div>

        <div className={cardStyle.changeZone_Commet}>
            <label>{ t("supplierCard_comment") }</label>
            <MuliLineText
                text={newComment}
                onChangeFunction={(text) => onNewCommitChangeHandler(text)}
            />
        </div>
        <div className={cardStyle.changeZone_SaveButton}>
            <div className={cardStyle.btn_padding}>
                <ButtonOK
                    text={ t("save") }
                    onClickFunction={onSaveClickHandler}
                />
            </div>
        </div>
        
    </div>
}

export default ChangeZone;
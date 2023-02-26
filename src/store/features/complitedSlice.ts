import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getComplitedInfoCompany, GetComplitedInfoCompanyResponseType } from "./complitedThunks";
import { InitQuestionType } from "./questionsSlice";
import { RiskType, RISK_LOW, SupplierIdType } from "./supplierSlice";

export type OnRiskAndCommentChangeType = {
    risk: RiskType,
    comment: string,
}
export type QuestionsTypeRadioMultiTextCheckbox = 'checkbox' | 'radiobutton' | 'text' | 'multiline'
export type QuestionsComplitedSliceType = {
        "seq_no": number,
        "type": QuestionsTypeRadioMultiTextCheckbox,
        "is_required": boolean,
        "question": string,
        "options": Array<string>,
        "answer": string | null,
        "answers": Array<string>,
        "created_at": string | null,
        "risks": Array<string>
}
export type ComplitedSliceType = {
    companyId: string,
    company: string,
    createdAt: string,
    filledAt: string | null,
    checkedAt: string | null,
    riskLevel: RiskType,
    comment: string,
    ticket: string,

    parts: { [part: number]: Array<QuestionsComplitedSliceType> }
    isLoading: boolean,
    errors: {
        deleteError: string
    }
}
const initData:ComplitedSliceType = {
    companyId: '',
    company: '',
    createdAt: '',
    filledAt: null,
    checkedAt: null,
    riskLevel: null,
    comment: '',
    ticket: '',
    parts: { 1: [{
        "seq_no": 1,
        "type": 'checkbox',
        "is_required": true,
        "question": '',
        "options": [],
        "answer": null,
        "answers": [],
        "created_at": null,
        "risks": []
    }] },

    isLoading: false,
    errors: {
        deleteError: ''
    }
}

export const complitedSlice = createSlice({
    name: 'complited',
    initialState: initData,
    reducers: {
        onRiskAndCommentChange: (state:ComplitedSliceType, action:PayloadAction<OnRiskAndCommentChangeType>):ComplitedSliceType => {
            return {
                ...state,
                riskLevel: action.payload.risk,
                comment: action.payload.comment,
            }
        },
        deleteErrorOccured: (state:ComplitedSliceType, action:PayloadAction<string>):ComplitedSliceType => {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    deleteError: action.payload
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getComplitedInfoCompany.pending, (state:ComplitedSliceType) => { state.isLoading = true })
        builder.addCase(getComplitedInfoCompany.fulfilled, (state:ComplitedSliceType, action: PayloadAction<GetComplitedInfoCompanyResponseType>) => { 
            state.companyId = action.payload.questionary.id;
            state.company = action.payload.questionary.company;
            state.createdAt = action.payload.questionary.created_at;
            state.checkedAt = action.payload.questionary.checked_at;
            state.filledAt = action.payload.questionary.filled_at;
            state.riskLevel = action.payload.questionary.risk_level;
            state.ticket = action.payload.questionary.ticket;

            state.parts = {...action.payload.parts};

            state.isLoading = false;
        })
        builder.addCase(getComplitedInfoCompany.rejected, (state:ComplitedSliceType) => { state.isLoading = false })
    }
})

export const {onRiskAndCommentChange, deleteErrorOccured} = complitedSlice.actions;

export default complitedSlice.reducer;
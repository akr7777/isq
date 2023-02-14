import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getComplitedInfoCompany, GetComplitedInfoCompanyResponseType } from "./complitedThunks";
import { InitQuestionType } from "./questionsSlice";
import { RiskType, RISK_LOW, SupplierIdType } from "./supplierSlice";

export type OnRiskAndCommentChangeType = {
    risk: RiskType,
    comment: string
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
    riskLevel: RiskType,
    ticket: string,

    parts: { [part: number]: Array<QuestionsComplitedSliceType> }
    isLoading: boolean
}
const initData:ComplitedSliceType = {
    companyId: '',
    company: '',
    createdAt: '',
    filledAt: null,
    riskLevel: null,
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
}

export const complitedSlice = createSlice({
    name: 'complited',
    initialState: initData,
    reducers: {
        onRiskAndCommentChange: (state:ComplitedSliceType, action:PayloadAction<OnRiskAndCommentChangeType>) => {
            return {
                ...state,
                risk: action.payload.risk,
                comment: action.payload.comment,
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getComplitedInfoCompany.pending, (state:ComplitedSliceType) => { state.isLoading = true })
        builder.addCase(getComplitedInfoCompany.fulfilled, (state:ComplitedSliceType, action: PayloadAction<GetComplitedInfoCompanyResponseType>) => { 
            state.companyId = action.payload.questionary.id;
            state.company = action.payload.questionary.company;
            state.createdAt = action.payload.questionary.created_at;
            state.filledAt = action.payload.questionary.filled_at;
            state.riskLevel = action.payload.questionary.risk_level;
            state.ticket = action.payload.questionary.ticket;

            // console.log('getComplitedInfoCompany.fulfilled / state.parts=', state.parts, 'action.payload.parts=', action.payload.parts);

            const additionalPart:Array<QuestionsComplitedSliceType> = [
                {
                    "seq_no": 1,
                    "type": 'radiobutton',
                    "is_required": true,
                    "question": 'radiobutton question',
                    "options": ['ans1', 'ans2', 'ans3'],
                    "answer": 'ans2',
                    "answers": ['ans3'],
                    "created_at": null,
                    "risks": []
                },
                {
                    "seq_no": 2,
                    "type": 'text',
                    "is_required": true,
                    "question": 'text question',
                    "options": [],
                    "answer": 'text answer',
                    "answers": [],
                    "created_at": null,
                    "risks": []
                },
                {
                    "seq_no": 3,
                    "type": 'multiline',
                    "is_required": true,
                    "question": 'multiline question',
                    "options": [],
                    "answer": 'multiline answer multiline answer multiline answer multiline answer multiline answer multiline answer multiline answer multiline answer multiline answer multiline answer multiline answer',
                    "answers": [],
                    "created_at": null,
                    "risks": []
                }
            ]
            state.parts = {...action.payload.parts, 6: additionalPart};

            // console.log('getComplitedInfoCompany.fulfilled / state.parts=', state.parts, 'action.payload.parts=', action.payload.parts);
            
            state.isLoading = false;
        })
        builder.addCase(getComplitedInfoCompany.rejected, (state:ComplitedSliceType) => { state.isLoading = false })
    }
})

export const {onRiskAndCommentChange} = complitedSlice.actions;

export default complitedSlice.reducer;
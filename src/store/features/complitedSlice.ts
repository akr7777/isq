import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitQuestionType } from "./questionsSlice";
import { RiskType, SupplierIdType } from "./supplierSlice";

export type OnRiskAndCommentChangeType = {
    risk: RiskType,
    comment: string
}
export type ComplitedSliceType = {
    supplierId: SupplierIdType,
    supplierName: string,
    risk: RiskType;
    creationDate: string,
    complitedDate: string,
    checkedDate: string,
    // isComplite: boolean,
    data: string,
    comment: string,
    questions: Array<InitQuestionType>,
}

const initData:ComplitedSliceType = {
    supplierId: '00001',
    supplierName: 'ПАО "МТС"',
    risk: 'low',
    creationDate: '2023-01-01',
    complitedDate: '2023-01-02',
    checkedDate: '2023-01-03',
    data: 'ПАО МТС Информация',
    comment: 'Текст Комментария Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    questions: [
        {
            question_id: 1,
            question: 'Вопрос №1',
            options: ['вариант 1', 'вариант 2', 'вариант 3'],
            answer: ['вариант 1', 'вариант 2'],
        },
        {
            question_id: 2,
            question: 'Вопрос №2',
            options: [],
            answer: ['tttdkdkd'],
        }
    ]
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
        // removeOptionToAnswerAC: (state: Array<InitQuestionType>, action: PayloadAction<OptionToAnswerType>) => {
        //     const state1 = state.map( (el:InitQuestionType) => {
        //         if (el.question_id === action.payload.question_id) {
        //             const newAnswer = [...el.answer.filter( a => a !== action.payload.option)];
        //             return {...el, answer: newAnswer}
        //         }
        //         return el;
        //     })
        //     return state1;
        // }
    },
    extraReducers: (builder) => {
        // builder.addCase(getDescriptionThunk.pending, (state: InitAuthorContentType) => {
        //     state.isLoading = true;
        // })
        // builder.addCase(getDescriptionThunk.fulfilled, (state: InitAuthorContentType, action: PayloadAction<Omit<InitAuthorContentType, 'isLoading'>>) => {
        //     state.title = action.payload.title;
        //     state.photo = baseDescriptionPhotoUrl;
        //     state.description = action.payload.description;
        //     state.isLoading = false;
        // })
        // builder.addCase(getDescriptionThunk.rejected, (state: InitAuthorContentType) => {
        //     state.isLoading = false;
        // })
    }
})

export const {onRiskAndCommentChange} = complitedSlice.actions;

export default complitedSlice.reducer;
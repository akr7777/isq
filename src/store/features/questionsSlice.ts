import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export type OptionType = string;
export type InitQuestionType = {
    question_id: number,
    question: string,
    options: Array<OptionType>,
    answer: Array<OptionType>;
}
type OptionToAnswerType = {
    question_id: number,
    option: OptionType,
}
const initContent: Array<InitQuestionType> = [
    {
        question_id: 1,
        question: 'Вопрос №1',
        options: ['вариант 1', 'вариант 2', 'вариант 3'],
        answer: [],
    },
    {
        question_id: 2,
        question: 'Вопрос №2',
        options: [],
        answer: [],
    }
]

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: initContent,
    reducers: {
        addOptionToAnswerAC: (state: Array<InitQuestionType>, action: PayloadAction<OptionToAnswerType>) => {
            const state1 = state.map( el => {
                if (el.question_id === action.payload.question_id) {
                    const newAnswer = [...el.answer, action.payload.option];
                    return {...el, answer: newAnswer}
                }
                return el;
            })
            return state1;
        },
        removeOptionToAnswerAC: (state: Array<InitQuestionType>, action: PayloadAction<OptionToAnswerType>) => {
            const state1 = state.map( (el:InitQuestionType) => {
                if (el.question_id === action.payload.question_id) {
                    const newAnswer = [...el.answer.filter( a => a !== action.payload.option)];
                    return {...el, answer: newAnswer}
                }
                return el;
            })
            return state1;
        }
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
export const {addOptionToAnswerAC, removeOptionToAnswerAC} = questionsSlice.actions;

export default questionsSlice.reducer;
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { questionsAPI } from '../../components/api/api';
import { QuestionsTypeRadioMultiTextCheckbox } from './complitedSlice';

export type InitQuestionType = {
    "seq_no": number,
    "type": QuestionsTypeRadioMultiTextCheckbox,
    "is_required": boolean,
    "question": string,
    "options": Array<string>,
    "answer": string | null,
    "answers": Array<string>,
    "created_at": string | null
}

type initContentType = {isLoading: boolean, questions: Array<InitQuestionType>}
const initContent:initContentType = {
    questions: [] as Array<InitQuestionType>,
    isLoading: false
}


export type GetQuestionsPartRequestType = {questionarieId: string, partNumber: string}
export type GetQuestionsPartResponseType = InitQuestionType;
export const getQuestionsPartThunk = createAsyncThunk(
    'questions/getQuestionsPartThunk',
    async (data: GetQuestionsPartRequestType, {rejectWithValue, dispatch}) => {
        const res = await questionsAPI.getQuestionsPart(data.questionarieId, data.partNumber);
        return res.data.data;
    }
);


export type AnswersArrayType = {
    seq_no: number,
    answer: string,
    answers: Array<string>
}
export type SendQuestionsPartType = {
    questionarieId: string,
    partNumber: number,
    answersArray: Array<AnswersArrayType>
}
export const sendQuestionsPartThunk = createAsyncThunk(
    'questions/sendQuestionsPartThunk',
    async (data: SendQuestionsPartType, {rejectWithValue, dispatch}) => {
        const res = await questionsAPI.sendQuestionsPart(data);
        return res.data.data;
    }
);

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: initContent,
    reducers: {
        addOptionToAnswerAC: (state: initContentType, action: PayloadAction<{seq_no: number, newAnswer:string}>):initContentType => {
            const questions1 = state.questions.map( el => {
                if (el.seq_no === action.payload.seq_no) {
                    const newAnswers = [...el.answers, action.payload.newAnswer];
                    return {...el, answers: newAnswers}
                }
                return el;
            })
            return {questions: questions1, isLoading: state.isLoading};
        },
        removeOptionToAnswerAC: (state: initContentType, action: PayloadAction<{seq_no: number, newAnswer:string}>):initContentType => {
            const questions1 = state.questions.map( (el:InitQuestionType) => {
                if (el.seq_no === action.payload.seq_no) {
                    const newAnswers = [...el.answers.filter( a => a !== action.payload.newAnswer)];
                    return {...el, answers: newAnswers}
                }
                return el;
            })
            return {questions: questions1, isLoading: state.isLoading};
        },
        changeOptionToAnswersAC: (state: initContentType, action: PayloadAction<{seq_no: number, newAnswers:Array<string>}>):initContentType => {
            const questions1 = state.questions.map( (el:InitQuestionType) => {
                return (el.seq_no === action.payload.seq_no)
                    ? {...el, answers: action.payload.newAnswers}
                    : el;
            })
            return {questions: questions1, isLoading: state.isLoading};
        },
        changeAnswerAC: (state: initContentType, action: PayloadAction<{seq_no: number, newAnswer:string}>):initContentType => {
            const questions1 = state.questions.map( (el:InitQuestionType) => {
                return (el.seq_no === action.payload.seq_no)
                    ? {...el, answer: action.payload.newAnswer}
                    : el;
            })
            return {questions: questions1, isLoading: state.isLoading};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getQuestionsPartThunk.pending, (state: initContentType) => {
            state.isLoading = true;
        })
        builder.addCase(getQuestionsPartThunk.fulfilled, (
                state: initContentType, 
                action: PayloadAction<Array<InitQuestionType>>) => {
            
            // Если payload = null, то пишем пустой массив
            // Если поле type = checkbox, а answers = null (если нет ответов в БД), то присваимваем answers пустой массив
            const myPayload = action.payload !== null
                                ? [...action.payload].map( el => el.answers === null ? {...el, answers:[]} : el)
                                : []

            state.questions = myPayload;
            state.isLoading = false;
        })
        builder.addCase(getQuestionsPartThunk.rejected, (state: initContentType) => {
            state.isLoading = false;
        })
    }
})
export const {addOptionToAnswerAC, removeOptionToAnswerAC, changeOptionToAnswersAC, changeAnswerAC} = questionsSlice.actions;

export default questionsSlice.reducer;
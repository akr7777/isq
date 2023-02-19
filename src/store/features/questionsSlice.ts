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

type InitContentType = {
    isLoading: boolean, 
    questions: Array<InitQuestionType>, 
    total_parts: number, 
    is_filled: boolean,
    partNumber: number,
    errors: Array<number>
}
const initContent:InitContentType = {
    questions: [] as Array<InitQuestionType>,
    isLoading: false,
    total_parts: 0,
    is_filled: false,
    partNumber: 1,
    errors: [],
}


export type GetQuestionsPartRequestType = {questionarieId: string, partNumber: number}
export type GetQuestionsPartResponseType = {
    questions: Array<InitQuestionType>,
    total_parts: number,
    is_filled: boolean
}
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
export type SendQuestionsPartResponseType = {
    message: string,
    status: string,
    data: {
        questionarieId: string,
        partNumber: number,
        answersArray: Array<AnswersArrayType>
    }
}
export const sendQuestionsPartThunk = createAsyncThunk(
    'questions/sendQuestionsPartThunk',
    async (data: SendQuestionsPartType, {rejectWithValue, dispatch}) => {
        const res = await questionsAPI.sendQuestionsPart(data);
        if (res.data.status === "success") {
            dispatch(changePartNumber(data.partNumber + 1));
        }
        return res.data;
    }
);



export const questionsSlice = createSlice({
    name: 'questions',
    initialState: initContent,
    reducers: {
        addOptionToAnswerAC: (state: InitContentType, action: PayloadAction<{seq_no: number, newAnswer:string}>):InitContentType => {
            const questions1 = state.questions.map( el => {
                if (el.seq_no === action.payload.seq_no) {
                    const newAnswers = [...el.answers, action.payload.newAnswer];
                    return {...el, answers: newAnswers}
                }
                return el;
            })
            return {...state, questions: questions1};
        },
        removeOptionToAnswerAC: (state: InitContentType, action: PayloadAction<{seq_no: number, newAnswer:string}>):InitContentType => {
            const questions1 = state.questions.map( (el:InitQuestionType) => {
                if (el.seq_no === action.payload.seq_no) {
                    const newAnswers = [...el.answers.filter( a => a !== action.payload.newAnswer)];
                    return {...el, answers: newAnswers}
                }
                return el;
            })
            return {...state, questions: questions1};
        },
        changeOptionToAnswersAC: (state: InitContentType, action: PayloadAction<{seq_no: number, newAnswer:string}>):InitContentType => {
            const questions1 = state.questions.map( (el:InitQuestionType) => {
                return (el.seq_no === action.payload.seq_no)
                    ? {...el, answer: action.payload.newAnswer}
                    : el;
            })
            return {...state, questions: questions1};
        },
        changeAnswerAC: (state: InitContentType, action: PayloadAction<{seq_no: number, newAnswer:string}>):InitContentType => {
            const questions1 = state.questions.map( (el:InitQuestionType) => {
                return (el.seq_no === action.payload.seq_no)
                    ? {...el, answer: action.payload.newAnswer}
                    : el;
            })
            return {...state, questions: questions1};
        },
        setErrorsAC: (state: InitContentType, action: PayloadAction<Array<number>>) => {
            state.errors = action.payload;
        },
        changePartNumber: (state: InitContentType, action: PayloadAction<number>) => {
            state.partNumber = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getQuestionsPartThunk.pending, (state: InitContentType) => {
            state.isLoading = true;
        })
        builder.addCase(getQuestionsPartThunk.fulfilled, (
                state: InitContentType, 
                action: PayloadAction<GetQuestionsPartResponseType>) => {
            
            state.total_parts = action.payload.total_parts;
            state.is_filled = action.payload.is_filled;
            // Если payload = null, то пишем пустой массив
            // Если поле type = checkbox, а answers = null (если нет ответов в БД), то присваимваем answers пустой массив
            
            state.questions = action.payload.questions !== null
                                ? [...action.payload.questions].map( el => el.answers === null ? {...el, answers:[]} : el)
                                : []
           
            state.isLoading = false;
        })
        builder.addCase(getQuestionsPartThunk.rejected, (state: InitContentType) => {
            state.isLoading = false;
        })

        builder.addCase(sendQuestionsPartThunk.pending, (state:InitContentType) => {
            console.log(' builder.addCase(sendQuestionsPartThunk.pending');
        })
        builder.addCase(sendQuestionsPartThunk.fulfilled, (state:InitContentType, action:PayloadAction<SendQuestionsPartResponseType>) => {
            console.log(' builder.addCase(sendQuestionsPartThunk.fulfilled / payload=', action.payload, 
                'questionarieId=', 'partNumber=');
        })
        builder.addCase(sendQuestionsPartThunk.rejected, (state:InitContentType) => {
            console.log(' builder.addCase(sendQuestionsPartThunk.rejected');
        })
    }
})
export const {addOptionToAnswerAC, removeOptionToAnswerAC, changeOptionToAnswersAC, changeAnswerAC, setErrorsAC, changePartNumber} = questionsSlice.actions;

export default questionsSlice.reducer;
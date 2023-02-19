import { createAsyncThunk } from "@reduxjs/toolkit";
import { complitedAPI } from "../../components/api/api";
import { ComplitedSliceType, QuestionsComplitedSliceType } from "./complitedSlice";
import { RiskType } from "./supplierSlice";
// export type QuestionsType = {

// }

// export type QuestionaryResponseType = {
//     id: string,
//     company: string,
//     created_at: string,
//     filled_at: string | null,
//     risk_level: RiskType,
//     ticket: string,
// }
export type GetComplitedInfoCompanyResponseType = {
    questionary: {
        id: string,
        company: string,
        created_at: string,
        filled_at: string | null,
        checked_at: string | null,
        risk_level: RiskType,
        ticket: string,
    },
    parts: { [part: number]: Array<QuestionsComplitedSliceType> }
}
export const getComplitedInfoCompany = createAsyncThunk(
    'complited/getComplitedInfoCompany',
    async (questionaryId: string, {rejectWithValue, dispatch}) => {
        const res = await complitedAPI.getInfoCompany(questionaryId);
        // console.log('getComplitedInfoCompany / ');
        return res.data.data;
        
    }
);
// https://toogle.io:5000/api/questionaries/9c492f3b-4f45-44fb-9c9b-9d42bfc1a961
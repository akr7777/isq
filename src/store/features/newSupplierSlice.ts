import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { supplierAPI } from "../../components/api/api";

export type CreateNewSupplierThunkRequestType = {
    company: string,
    ticket?: string
}
export type CreateNewSupplierThunkResponseType = {
    "link": string,
    result: {
        "id": string, 
        "company": string,
        "ticket": string | null, 
        "created_at": string, 
        "filled_at": string | null, 
        "risk_level": string | null
    }
}
export const createNewSupplierThunk = createAsyncThunk(
    'newSupplier/CreateNewSupplierThunk',
    async (data: CreateNewSupplierThunkRequestType, {rejectWithValue, dispatch}) => {
        const res = await supplierAPI.createNewSupplier(data);
        return res.data.data;
    }
);


export type NewSupplierType = {
    link: string,
    id: string,
    company: string,
    ticket: string | null,
    isLoading: boolean,
}
const newSupplierInitData:NewSupplierType = {
    link: '', id: '', company: '', ticket: '', isLoading: false
}

export const newSupplierSlice = createSlice({
    name: 'newSupplier',
    initialState: newSupplierInitData,
    reducers: {
        newSupplierChangeInfo: (state: NewSupplierType, action: PayloadAction<Omit<NewSupplierType, "isLoading">>) => {
            state.id = action.payload.id;
            state.company = action.payload.company;
            state.ticket = action.payload.ticket;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createNewSupplierThunk.pending, (state: NewSupplierType) => {
            state.isLoading = true;
        })
        builder.addCase(createNewSupplierThunk.fulfilled, (state: NewSupplierType, action: PayloadAction<CreateNewSupplierThunkResponseType>) => {
            state.id = action.payload.result.id;
            state.company = action.payload.result.company;
            state.ticket = action.payload.result.ticket;
            state.link = action.payload.link;
            state.isLoading = false;
        })
        builder.addCase(createNewSupplierThunk.rejected, (state: NewSupplierType) => {
            state.isLoading = false;
        })
    }
})

export const {newSupplierChangeInfo} = newSupplierSlice.actions;

export default newSupplierSlice.reducer;
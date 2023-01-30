import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { supplierAPI } from "../../components/api/api";
import { useAppDispatch } from "../store";



export type CreateNewSupplierThunkRequestType = {
    company: string,
    ticket?: string
}
export type CreateNewSupplierThunkResponseType = {
    "id": string, 
    "company": string,
    "ticket": string | null, 
    "created_at": string, 
    "filled_at": string | null, 
    "risk_level": string | null
}
export const createNewSupplierThunk = createAsyncThunk(
    'newSupplier/CreateNewSupplierThunk',
    async (data: CreateNewSupplierThunkRequestType, {rejectWithValue, dispatch}) => {
        const res = await supplierAPI.createNewSupplier(data);
        return res.data.data;
    }
);


export type NewSupplierType = {
    id: string,
    company: string,
    ticket: string | null,
    isLoading: boolean
}
const newSupplierInitData:NewSupplierType = {
    id: '', company: '', ticket: '', isLoading: false
}


// const copyToBuffer = async () => {
//     navigator.clipboard.writeText(newSupplierLink)
//     .then(async () => {
//         setCopyLinkSuccess(true);
//         await delay(3);
//         setCopyLinkSuccess(false);
//     })
//     .catch(err => {
//         console.log('Something went wrong', err);
//     });
// }

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
            // const dispatch = useAppDispatch();
            // const info:Omit<NewSupplierType, "isLoading"> = {
            //     id: action.payload.id,
            //     company: action.payload.company,
            // }
            // dispatch(newSupplierChangeInfo(info));
            state.id = action.payload.id;
            state.company = action.payload.company;
            state.ticket = action.payload.ticket;
            state.isLoading = false;
        })
        builder.addCase(createNewSupplierThunk.rejected, (state: NewSupplierType) => {
            state.isLoading = false;
        })
    }
})

export const {newSupplierChangeInfo} = newSupplierSlice.actions;

export default newSupplierSlice.reducer;
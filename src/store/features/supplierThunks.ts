import {createAsyncThunk} from "@reduxjs/toolkit";
import { supplierAPI } from "../../components/api/api";
import { RiskType, SupplierIdType } from "./supplierSlice";

export type getCompaniesThunkResponseType = {
    // supplierId: SupplierIdType,
    // supplierName: string,
    // risk: RiskType;
    // creationDate: string | undefined,
    // isComplite: boolean,
    // data: string,
    // purchaseTicket?: string
    "id": string, 
    "company": string,
    "ticket": string, 
    "created_at": string,//"YYYY-MM-DDTHH:MM:SS.XXXXXXZ",
    "filled_at": string | undefined, 
    "risk_level": string | null
}
export const getCompaniesThunk = createAsyncThunk(
    'supplier/getCompaniesThunk',
    async (pageNumber: number, {rejectWithValue, dispatch}) => {
        const res = await supplierAPI.getCompanies(pageNumber);
        return res.data.data;
        // if (res.data.data) {
        //     return res.data.data;
        // } else {
        //     return 
        // }
        
    }
);

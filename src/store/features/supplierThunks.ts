import {createAsyncThunk} from "@reduxjs/toolkit";
import { supplierAPI } from "../../components/api/api";
import { RiskType, SupplierIdType } from "./supplierSlice";

export type getCompaniesThunkResponseType = {
    supplierId: SupplierIdType,
    supplierName: string,
    risk: RiskType;
    creationDate: string | undefined,
    isComplite: boolean,
    data: string,
    purchaseTicket?: string
}
export const getCompaniesThunk = createAsyncThunk(
    'supplier/getCompaniesThunk',
    async (pageNumber: number, {rejectWithValue, dispatch}) => {
        const res = await supplierAPI.getCompanies(pageNumber);
        return res.data;
    }
);
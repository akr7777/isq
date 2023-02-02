import {createAsyncThunk} from "@reduxjs/toolkit";
import { supplierAPI } from "../../components/api/api";
import { RootState } from "../store";
import { RiskType, SearchingOptionsType, SupplierSliceType } from "./supplierSlice";

export type GetCompaniesResultType = {
    "id": string, 
    "company": string,
    "ticket": string, 
    "created_at": string,//"YYYY-MM-DDTHH:MM:SS.XXXXXXZ",
    "filled_at": string | undefined, 
    "risk_level": RiskType
}
export type GetCompaniesThunkResponseType = {
    page: number,
    total_pages: number,
    results: Array<GetCompaniesResultType>
}

export type getCompaniesThunkVarType = {
    page?: number,
    fieldForSearch?: string,
    valueForSearch?: string,
    where: string
}

export const getCompaniesThunk = createAsyncThunk(
    'supplier/getCompaniesThunk',
    async (data: getCompaniesThunkVarType, {dispatch,getState}) => {
        const state = getState() as RootState;
        const supplierState:SupplierSliceType = state.supplier;
        
        const searchingOptions:SearchingOptionsType = (data.fieldForSearch && data.valueForSearch) 
                    ? {...supplierState.searchingOptions, [data.fieldForSearch]: data.valueForSearch }
                    : {...supplierState.searchingOptions}

        const pageNumber: number = data.page ? data.page : supplierState.pageOptions.currentPage;

        let paramsLink = '?page=' + String(pageNumber);

        if (searchingOptions.search.length > 0) paramsLink = paramsLink + "&company=" + searchingOptions.search
        // if (searchingOptions.searchByComplited.length > 0) paramsLink = paramsLink + "company=" + searchingOptions.search
        // if (searchingOptions.searchByDateStart.length > 0) paramsLink = paramsLink + "company=" + searchingOptions.search
        // if (searchingOptions.searchByDateEnd.length > 0) paramsLink = paramsLink + "company=" + searchingOptions.search
        // if (searchingOptions.searchByRisk && searchingOptions.searchByRisk.length > 0) paramsLink = paramsLink + "company=" + searchingOptions.search
        if (searchingOptions.searchByPurchaseTicket.length > 0) paramsLink = paramsLink + "&ticket=" + searchingOptions.searchByPurchaseTicket

        // paramsLink = paramsLink + "&where=" + data.where

        const res = await supplierAPI.getCompanies(paramsLink);
        return res.data.data;
    }
);


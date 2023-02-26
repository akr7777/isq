import {createAsyncThunk} from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { supplierAPI } from "../../components/api/api";
import { PATHS } from "../../components/outlet/outlet";
import { RootState } from "../store";
import { deleteErrorOccured } from "./complitedSlice";
import { RiskType, searchByDateFilterAC, SearchingOptionsType, SEARCH_COMPLETED_ALL, SupplierSliceType } from "./supplierSlice";

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
}

export const getCompaniesThunk = createAsyncThunk(
    'supplier/getCompaniesThunk',
    async (data: getCompaniesThunkVarType, {dispatch,getState}) => {
        const state = getState() as RootState;
        const supplierState:SupplierSliceType = state.supplier;

        const searchingOptions:SearchingOptionsType = (data.fieldForSearch) 
                    ? {...supplierState.searchingOptions, [data.fieldForSearch]: data.valueForSearch }
                    : {...supplierState.searchingOptions}


        const pageNumber: number = data.page ? data.page : supplierState.pageOptions.currentPage;

        let paramsLink = '?page=' + String(pageNumber);

        if (searchingOptions.search.length > 0) 
            paramsLink = paramsLink + "&company=" + searchingOptions.search;
        if (searchingOptions.searchByDateStart.length > 0) 
            paramsLink = paramsLink + "&created_after=" + searchingOptions.searchByDateStart;
        if (searchingOptions.searchByDateEnd.length > 0)
            paramsLink = paramsLink + "&created_before=" + searchingOptions.searchByDateEnd;
        if (searchingOptions.searchByRisk && searchingOptions.searchByRisk.length > 0) 
            paramsLink = paramsLink + "&risk_level=" + searchingOptions.searchByRisk;
        if (searchingOptions.searchByComplited && searchingOptions.searchByComplited.length > 0 && 
                searchingOptions.searchByComplited !== SEARCH_COMPLETED_ALL)
            paramsLink = paramsLink + "&is_filled=" + searchingOptions.searchByComplited
        if (searchingOptions.searchByPurchaseTicket.length > 0) 
            paramsLink = paramsLink + "&ticket=" + searchingOptions.searchByPurchaseTicket;

        const res = await supplierAPI.getCompanies(paramsLink);
        return res.data.data;
    }
);

export type DeleteCompanyThunkPropsType = {
    companyId: string,
    navigate: any,
}
export const deleteCompanyThunk = createAsyncThunk(
    'supplier/deleteCompanyThunk',
    async (dataForDelete:DeleteCompanyThunkPropsType, {dispatch}) => {
        const resp = await supplierAPI.deleteCompany(dataForDelete.companyId);
        if (resp.data.status === 'success') {
            dispatch(deleteErrorOccured(''))
            dataForDelete.navigate(PATHS.dashboard);
        } else {
            dispatch(deleteErrorOccured(resp.data.message))
        }
    }
);


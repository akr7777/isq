import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { GetCompaniesResultType, getCompaniesThunk, GetCompaniesThunkResponseType } from './supplierThunks';


export const SEARCH_COMPLETED_ALL = "all";
export const SEARCH_COMPLETED_FINISHED = "yes";
export const SEARCH_COMPLETED_UNFINISHED = "no";
export type SearchByComplitedType = typeof SEARCH_COMPLETED_ALL | typeof SEARCH_COMPLETED_FINISHED | typeof SEARCH_COMPLETED_UNFINISHED;

export const RISK_LOW = 'low';
export const RISK_MEDIUM = 'medium';
export const RISK_HIGH = 'high';
export type RiskType = typeof RISK_LOW | typeof RISK_MEDIUM | typeof RISK_HIGH | null;

export const SORT_ACS = "acsending";
export const SORT_DSC = "descending";
export const NAME_COLUMN_SORT = 'NAME_COLUMN_SORT';
export const CREATION_DATE_COLUMN_SORT = 'CREATION_DATE_COLUMN_SORT';
export const COMPLITED_COLUMN_SORT = 'COMPLITED_COLUMN_SORT';
export const RISK_COLUMN_SORT = 'RISK_COLUMN_SORT';
export type ColumnSortNameType = null | typeof NAME_COLUMN_SORT | typeof CREATION_DATE_COLUMN_SORT | typeof COMPLITED_COLUMN_SORT | typeof RISK_COLUMN_SORT;
export type ColumnSortDirectionType = typeof SORT_ACS | typeof SORT_DSC;

export const SEARCH_TEXT_DELAY = 1000;

export type SupplierIdType = string;
// export type FilterDateType = Date | undefined;

export type SupplerDataType = {
    supplierId: SupplierIdType,
    supplierName: string,
    risk: RiskType;
    creationDate: string | undefined,
    filledDate: string | undefined,
    // data?: string,
    purchaseTicket?: string
}
export type SearchingOptionsType = {
    search: string,
    searchByComplited: SearchByComplitedType,
    searchByRisk: RiskType,
    searchByDateStart: string,//FilterDateType,
    searchByDateEnd: string,//FilterDateType,
    searchByPurchaseTicket: string,
}


export type SupplierSliceType = {
    suppliers: Array<SupplerDataType>,

    // settings: {
    //     view: ViewOptionsType,
    //     riskView: RiskViewType,
    //     pageSizing: number,
    //     userDateFormat: FormatDateType,
    // }
    sortingOptions: {
        columnNameSorting: ColumnSortNameType,
        columnSortDirection: ColumnSortDirectionType,
    }
    searchingOptions: SearchingOptionsType,
    pageOptions: {
        totalPages: number,
        currentPage: number,
        // newPageNumber: number,
    }
    loadingVars: {
        suppliersLoading: boolean,
        newSupplierCreationLoading: boolean,
        supplierCardLoading: boolean,
    }
    
}

const initContent:SupplierSliceType = {
    suppliers: [],
    
    // settings: {
    //     view: TABLE_VIEW,
    //     riskView: RiskViewWORD,
    //     pageSizing: pageSizeOptions[0],
    //     userDateFormat: DATE_EU,
    // },

    sortingOptions: {
        columnNameSorting: null,
        columnSortDirection: SORT_ACS,
    },
    
    searchingOptions: {
        search: '',
        searchByDateStart: '',
        searchByDateEnd: '',
        searchByComplited: SEARCH_COMPLETED_ALL,
        searchByRisk: null,
        searchByPurchaseTicket: '',
    },
    
    pageOptions: {
        totalPages: 0,
        currentPage: 1,
        // newPageNumber: 0,
    },
    loadingVars: {
        suppliersLoading: false,
        newSupplierCreationLoading: false,
        supplierCardLoading: false,
    }
}


export const supplierSlice = createSlice({
    name: 'supplier',
    initialState: initContent,
    reducers: {
        searchFieldChangeAC: (state:SupplierSliceType, action: PayloadAction<string>):SupplierSliceType => {
            return {
                ...state,
                searchingOptions: {
                    ...state.searchingOptions,
                    search: action.payload 
                }
            }
        },
        searchByDateFilterAC: (state:SupplierSliceType, 
                        action: PayloadAction<{dateStart: string, dateEnd: string}>):SupplierSliceType => {
            return {
                ...state,
                searchingOptions: {
                    ...state.searchingOptions,
                    searchByDateStart: action.payload.dateStart, 
                    searchByDateEnd: action.payload.dateEnd
                }
            }   
        },
        searchByComplitedChangeAC: (state:SupplierSliceType, action: PayloadAction<SearchByComplitedType>):SupplierSliceType => {
            return {
                ...state,
                searchingOptions: {
                    ...state.searchingOptions,
                    searchByComplited: action.payload
                }
            }
        },
        searchByRiskAC: (state:SupplierSliceType, action: PayloadAction<RiskType>):SupplierSliceType => {
            return {
                ...state,
                searchingOptions: {
                    ...state.searchingOptions,
                    searchByRisk: action.payload
                }
            }
        },
        changePurchaseTicketSearchAC: (state:SupplierSliceType, action: PayloadAction<string>):SupplierSliceType => {
            return {
                ...state,
                searchingOptions: {
                    ...state.searchingOptions,
                    searchByPurchaseTicket: action.payload
                }
            }
        },

        // TABLE or BRICK
        // changeViewAC: (state:SupplierSliceType, action: PayloadAction<ViewOptionsType>):SupplierSliceType => {
        //     localStorage.setItem(localStorageSuppliersViewVariable, action.payload)
        //     return {
        //         ...state,
        //         settings: {
        //             ...state.settings,
        //             view: action.payload
        //         }
        //     }
        // },
        // WORD or STAR
        // changeRiskInLineAC: (state:SupplierSliceType, action: PayloadAction<RiskViewType>):SupplierSliceType => {
        //     localStorage.setItem(localStorageRiskViewVariable, action.payload)
        //     return {
        //         ...state, 
        //         settings: {
        //             ...state.settings,
        //             riskView: action.payload
        //         }
        //     };
        // },
        // Page SIZE: 20, 50, 100
        // changePageSizingAC: (state:SupplierSliceType, action:PayloadAction<number>):SupplierSliceType => {
        //     localStorage.setItem(localStoragePageSizingVariable, String(action.payload));
        //     return {
        //         ...state,
        //         settings: {
        //             ...state.settings,
        //             pageSizing: action.payload
        //         }
        //     }
        // },
        // DD.MM.YYYY or MM/DD/YYYY
        // userDateFormatChangeAC: (state:SupplierSliceType, action: PayloadAction<FormatDateType>):SupplierSliceType => {
        //     localStorage.setItem(localStorageUserDateFormat, action.payload);
        //     return {
        //         ...state,
        //         settings: {
        //             ...state.settings,
        //             userDateFormat: action.payload
        //         }
        //     }
        // },
        
        changeColumnNameSortingAC: (state: SupplierSliceType, action: PayloadAction<ColumnSortNameType>):SupplierSliceType => {
            return {...state, sortingOptions: {...state.sortingOptions, columnNameSorting: action.payload}}
        },
        changeColumnDirectionSortingAC: (state: SupplierSliceType, action: PayloadAction<ColumnSortDirectionType>):SupplierSliceType => {
            return {...state, sortingOptions: {...state.sortingOptions, columnSortDirection: action.payload}}
        },
        changeCurrentPageAC: (state: SupplierSliceType, action: PayloadAction<number>):SupplierSliceType => {
            return {
                ...state, 
                pageOptions: {
                    ...state.pageOptions,
                    currentPage: action.payload
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCompaniesThunk.pending, (state: SupplierSliceType) => {
            // state.isLoading = true;
            state.loadingVars.suppliersLoading = true;
        })
        builder.addCase(getCompaniesThunk.fulfilled, (state: SupplierSliceType, action: PayloadAction<GetCompaniesThunkResponseType>) => {
            state.pageOptions.currentPage = action.payload.page;
            state.pageOptions.totalPages = action.payload.total_pages;
            state.suppliers = action.payload.results.map( (el:GetCompaniesResultType) => {
                let response:SupplerDataType = {
                    supplierId: el.id,
                    supplierName: el.company,
                    risk: el.risk_level,
                    creationDate: el.created_at,
                    filledDate: el.filled_at,
                    purchaseTicket: el.ticket || undefined,
                }
                return response
            });
            state.loadingVars.suppliersLoading = false;
        })
        builder.addCase(getCompaniesThunk.rejected, (state: SupplierSliceType) => {
            state.loadingVars.suppliersLoading = false;
        })
    }
})
export const {
    searchFieldChangeAC, searchByComplitedChangeAC, searchByRiskAC, searchByDateFilterAC, changePurchaseTicketSearchAC, 
    changeColumnNameSortingAC, changeColumnDirectionSortingAC, changeCurrentPageAC
} = supplierSlice.actions;

export default supplierSlice.reducer;
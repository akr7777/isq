import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { getCompaniesThunk, getCompaniesThunkResponseType } from './supplierThunks';
// import { suppliersInitContent12 } from './supplierInitData';



export const TABLE_VIEW = 'TABLE';
export const BRICK_VIEW = 'BRICK';
export const localStorageSuppliersViewVariable = 'suppliersView';

export const SEARCH_COMPLETED_ALL = "all";
export const SEARCH_COMPLETED_FINISHED = "complited";
export const SEARCH_COMPLETED_UNFINISHED = "unfinished";
export type SearchByComplitedType = typeof SEARCH_COMPLETED_ALL | typeof SEARCH_COMPLETED_FINISHED | typeof SEARCH_COMPLETED_UNFINISHED;

export const RISK_LOW = '1low';
export const RISK_MEDIUM = '2medium';
export const RISK_HIGH = '3high';
export type RiskType = typeof RISK_LOW | typeof RISK_MEDIUM | typeof RISK_HIGH | undefined;

export const localStorageRiskViewVariable = 'riskViewInTable';
export const RiskViewWORD = 'WORD';
export const RiskViewSTAR = 'STAR';
export type RiskViewType = typeof RiskViewWORD | typeof RiskViewSTAR;

export const localStorageUserDateFormat = 'dateFormat';
export const DATE_EU = 'DD.MM.YYYY';
export const DATE_US = 'MM/DD/YYYY';
export type FormatDateType = typeof DATE_EU | typeof DATE_US;
export const COMMON_DATE_FORMAT = "YYYY-MM-DD";

export const SORT_ACS = "acsending";
export const SORT_DSC = "descending";
export const NAME_COLUMN_SORT = 'NAME_COLUMN_SORT';
export const CREATION_DATE_COLUMN_SORT = 'CREATION_DATE_COLUMN_SORT';
export const COMPLITED_COLUMN_SORT = 'COMPLITED_COLUMN_SORT';
export const RISK_COLUMN_SORT = 'RISK_COLUMN_SORT';
export type ColumnSortNameType = null | typeof NAME_COLUMN_SORT | typeof CREATION_DATE_COLUMN_SORT | typeof COMPLITED_COLUMN_SORT | typeof RISK_COLUMN_SORT;
export type ColumnSortDirectionType = typeof SORT_ACS | typeof SORT_DSC;

export const localStoragePageSizingVariable = 'page-size';
export const pageSizeOptions = [20, 50, 100];

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
export type ViewOptionsType = typeof TABLE_VIEW | typeof BRICK_VIEW;

type SupplierSliceType = {
    suppliers: Array<SupplerDataType>,

    settings: {
        view: ViewOptionsType,
        riskView: RiskViewType,
        pageSizing: number,
        userDateFormat: FormatDateType,
    }
    sortingOptions: {
        columnNameSorting: ColumnSortNameType,
        columnSortDirection: ColumnSortDirectionType,
    }
    searchingOptions: {
        search: string,
        searchByComplited: SearchByComplitedType,
        searchByRisk: RiskType,
        searchByDateStart: string,//FilterDateType,
        searchByDateEnd: string,//FilterDateType,
        searchByPurchaseTicket: string,
    }
    pageOptions: {
        companiesCount: number,
        currentPage: number,
    }
    loadingVars: {
        suppliersLoading: boolean,
        newSupplierCreationLoading: boolean,
    }
    
}

const initContent:SupplierSliceType = {
    suppliers: [],
    
    settings: {
        view: TABLE_VIEW,
        riskView: RiskViewWORD,
        pageSizing: pageSizeOptions[0],
        userDateFormat: DATE_EU,
    },

    sortingOptions: {
        columnNameSorting: null,
        columnSortDirection: SORT_ACS,
    },
    
    searchingOptions: {
        search: '',
        searchByDateStart: '',
        searchByDateEnd: '',
        searchByComplited: SEARCH_COMPLETED_ALL,
        searchByRisk: undefined,
        searchByPurchaseTicket: '',
    },
    
    pageOptions: {
        companiesCount: 30653,
        currentPage: 1,
    },
    loadingVars: {
        suppliersLoading: false,
        newSupplierCreationLoading: false,
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
        changeViewAC: (state:SupplierSliceType, action: PayloadAction<ViewOptionsType>):SupplierSliceType => {
            // console.log('supplier / changeViewAC / action=', action.payload);
            localStorage.setItem(localStorageSuppliersViewVariable, action.payload)
            return {
                ...state,
                settings: {
                    ...state.settings,
                    view: action.payload
                }
            }
        },
        // WORD or STAR
        changeRiskInLineAC: (state:SupplierSliceType, action: PayloadAction<RiskViewType>):SupplierSliceType => {
            // console.log('supplier / changeRiskInLineAC / action=', action.payload);
            localStorage.setItem(localStorageRiskViewVariable, action.payload)
            return {
                ...state, 
                settings: {
                    ...state.settings,
                    riskView: action.payload
                }
            };
        },
        // Page SIZE: 20, 50, 100
        changePageSizingAC: (state:SupplierSliceType, action:PayloadAction<number>):SupplierSliceType => {
            // console.log('supplier / changePageSizingAC / action=', action.payload);
            localStorage.setItem(localStoragePageSizingVariable, String(action.payload));
            return {
                ...state,
                settings: {
                    ...state.settings,
                    pageSizing: action.payload
                }
            }
        },
        // DD.MM.YYYY or MM/DD/YYYY
        userDateFormatChangeAC: (state:SupplierSliceType, action: PayloadAction<FormatDateType>):SupplierSliceType => {
            // console.log('supplier / userDateFormatChangeAC / action=', action.payload);
            localStorage.setItem(localStorageUserDateFormat, action.payload);
            return {
                ...state,
                settings: {
                    ...state.settings,
                    userDateFormat: action.payload
                }
            }
        },
        
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
        builder.addCase(getCompaniesThunk.fulfilled, (state: SupplierSliceType, action: PayloadAction<Array<getCompaniesThunkResponseType>>) => {
            // console.log('getCompaniesThunk / fulfilled, action=', action.payload);
            state.suppliers = action.payload.map( (el:getCompaniesThunkResponseType) => {
                const riskLevel:RiskType = el.risk_level === 'low'
                                            ? RISK_LOW
                                            : el.risk_level === 'medium'
                                                ? RISK_MEDIUM
                                                : el.risk_level === 'high'
                                                    ? RISK_HIGH
                                                    : undefined

                let response:SupplerDataType = {
                    supplierId: el.id,
                    supplierName: el.company,
                    risk: riskLevel,
                    creationDate: el.created_at,
                    filledDate: el.filled_at,
                    purchaseTicket: el.ticket || undefined,
                    // data: string,
                }
                if (el.ticket) {
                    return {...response, purchaseTicket: el.ticket}
                } else {
                    return response
                }
            });
            //state.suppliers = action.payload;
            state.loadingVars.suppliersLoading = false;
        })
        builder.addCase(getCompaniesThunk.rejected, (state: SupplierSliceType) => {
            state.loadingVars.suppliersLoading = false;
        })
    }
})
export const {
    changeViewAC, searchFieldChangeAC, searchByComplitedChangeAC, searchByRiskAC, 
    searchByDateFilterAC, changeRiskInLineAC, changePageSizingAC, userDateFormatChangeAC, 
    changePurchaseTicketSearchAC, changeColumnNameSortingAC, changeColumnDirectionSortingAC,
    changeCurrentPageAC
} = supplierSlice.actions;

export default supplierSlice.reducer;
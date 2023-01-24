import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export const TABLE_VIEW = 'table';
export const BRICK_VIEW = 'brick';
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
export const RiskViewSTAR = 'STAR'
export type RiskViewType = typeof RiskViewWORD | typeof RiskViewSTAR;

export const localStorageUserDateFormat = 'dateFormat';
export const DATE_EU = 'DATE_EU';
export const DATE_US = 'DATE_US';
export type FormatDataType = typeof DATE_EU | typeof DATE_US;

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

export type SupplierIdType = string;
export type FilterDateType = Date | undefined;

export type SupplerDataType = {
    supplierId: SupplierIdType,
    supplierName: string,
    risk: RiskType;
    creationDate: Date,
    isComplite: boolean,
    data: string,
    purchaseTicket?: string
}
export type ViewOptionsType = typeof TABLE_VIEW | typeof BRICK_VIEW;

type SupplierSliceType = {
    suppliers: Array<SupplerDataType>,
    search: string,

    settings: {
        view: ViewOptionsType,
        riskView: RiskViewType,
        pageSizing: number,
        userDateFormat: FormatDataType,
    }
    sortingOptions: {
        columnNameSorting: ColumnSortNameType,
        columnSortDirection: ColumnSortDirectionType,
    }

    searchByComplited: SearchByComplitedType,
    searchByRisk: RiskType,
    searchByDateStart: FilterDateType,
    searchByDateEnd: FilterDateType,
    searchByPurchaseTicket: string,

    pageCount: number,
    currentPage: number,
    
}

const initContent:SupplierSliceType = {
    suppliers: [
        {
            supplierId: '00001',
            supplierName: 'ПАО "МТС"',
            risk: RISK_LOW,
            creationDate: new Date(2022,1,11),
            isComplite: true,
            data: 'ПАО МТС Информация',
            purchaseTicket: '1234566789'
        },
        {
            supplierId: '00002',
            supplierName: 'ПАО "Пятерочка"',
            risk: RISK_MEDIUM,
            creationDate: new Date(2022,3,15),
            isComplite: true,
            data: 'Пятерочка Информация',
        },
        {
            supplierId: '00003',
            supplierName: 'ООО "Ромашка"',
            risk: RISK_HIGH,
            creationDate: new Date(2022,5,19),
            isComplite: true,
            data: 'Ромашка Информация',
        },
        {
            supplierId: '00004',
            supplierName: 'ООО "Рога и копыта"',
            risk: undefined,
            creationDate: new Date(2022,7,29),
            isComplite: false,
            data: 'Рога и копыта INFO',
        },
        {
            supplierId: '00005',
            supplierName: 'ООО "Simple company"',
            risk: undefined,
            creationDate: new Date(2022,2,17),
            isComplite: false,
            data: 'Simple company INFO',
        }
        ],
    
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
    
    search: '',
    searchByDateStart: undefined,
    searchByDateEnd: undefined,
    searchByComplited: SEARCH_COMPLETED_ALL,
    searchByRisk: undefined,
    searchByPurchaseTicket: '',

    pageCount: 10653,
    currentPage: 105,
}


export const supplierSlice = createSlice({
    name: 'supplier',
    initialState: initContent,
    reducers: {
        changeViewAC: (state:SupplierSliceType, action: PayloadAction<ViewOptionsType>) => {
            localStorage.setItem(localStorageSuppliersViewVariable, action.payload)
            return {
                ...state,
                view: action.payload
            }
        },
        searchFieldChangeAC: (state:SupplierSliceType, action: PayloadAction<string>) => {
            return {...state, search: action.payload }
        },
        searchByDateFilterAC: (state:SupplierSliceType, action: PayloadAction<{dateStart: FilterDateType, dateEnd: FilterDateType}>) => {
            return {
                ...state, 
                searchByDateStart: action.payload.dateStart, 
                searchByDateEnd: action.payload.dateEnd
            }
        },
        searchByComplitedChangeAC: (state:SupplierSliceType, action: PayloadAction<SearchByComplitedType>) => {
            return {...state, searchByComplited: action.payload}
        },
        searchByRiskAC: (state:SupplierSliceType, action: PayloadAction<RiskType>) => {
            return {...state, searchByRisk: action.payload}
        },
        changeRiskInLineAC: (state:SupplierSliceType, action: PayloadAction<RiskViewType>) => {
            localStorage.setItem(localStorageRiskViewVariable, action.payload)
            return {...state, riskView: action.payload}
        },
        changePageSizingAC: (state:SupplierSliceType, action:PayloadAction<number>) => {
            localStorage.setItem(localStoragePageSizingVariable, String(action.payload));
            return {
                ...state,
                settings: {
                    ...state.settings,
                    pageSizing: action.payload
                }
            }
        },
        userDateFormatChangeAC: (state:SupplierSliceType, action: PayloadAction<FormatDataType>) => {
            localStorage.setItem(localStorageUserDateFormat, action.payload);
            return {
                ...state,
                settings: {
                    ...state.settings,
                    userDateFormat: action.payload
                }
            }
        },
        changePurchaseTicketSearchAC: (state:SupplierSliceType, action: PayloadAction<string>) => {
            return {
                ...state,
                searchByPurchaseTicket: action.payload
            }
        },
        changeColumnNameSortingAC: (state: SupplierSliceType, action: PayloadAction<ColumnSortNameType>) => {
            return {...state, sortingOptions: {...state.sortingOptions, columnNameSorting: action.payload}}
        },
        changeColumnDirectionSortingAC: (state: SupplierSliceType, action: PayloadAction<ColumnSortDirectionType>) => {
            return {...state, sortingOptions: {...state.sortingOptions, columnSortDirection: action.payload}}
        },
        changeCurrentPageAC: (state: SupplierSliceType, action: PayloadAction<number>) => {
            return {...state, currentPage: action.payload}
        }
    },
    extraReducers: (builder) => {
        // builder.addCase(getDescriptionThunk.pending, (state: InitAuthorContentType) => {
        //     state.isLoading = true;
        // })
        // builder.addCase(getDescriptionThunk.fulfilled, (state: InitAuthorContentType, action: PayloadAction<Omit<InitAuthorContentType, 'isLoading'>>) => {
        //     state.title = action.payload.title;
        //     state.photo = baseDescriptionPhotoUrl;
        //     state.description = action.payload.description;
        //     state.isLoading = false;
        // })
        // builder.addCase(getDescriptionThunk.rejected, (state: InitAuthorContentType) => {
        //     state.isLoading = false;
        // })
    }
})
export const {
    changeViewAC, searchFieldChangeAC, searchByComplitedChangeAC, searchByRiskAC, 
    searchByDateFilterAC, changeRiskInLineAC, changePageSizingAC, userDateFormatChangeAC, 
    changePurchaseTicketSearchAC, changeColumnNameSortingAC, changeColumnDirectionSortingAC,
    changeCurrentPageAC
} = supplierSlice.actions;

export default supplierSlice.reducer;
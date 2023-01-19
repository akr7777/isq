import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export const TABLE_VIEW = 'table';
export const BRICK_VIEW = 'brick';

export const SEARCH_COMPLETED_ALL = "all";
export const SEARCH_COMPLETED_FINISHED = "complited";
export const SEARCH_COMPLETED_UNFINISHED = "unfinished";
export type SearchByComplitedType = typeof SEARCH_COMPLETED_ALL | typeof SEARCH_COMPLETED_FINISHED | typeof SEARCH_COMPLETED_UNFINISHED;

export const RISK_LOW = 'low';
export const RISK_MEDIUM = 'medium';
export const RISK_HIGH = 'high';
export type RiskType = typeof RISK_LOW | typeof RISK_MEDIUM | typeof RISK_HIGH | undefined;

export type SupplierIdType = string;

export type SupplerDataType = {
    supplierId: SupplierIdType,
    supplierName: string,
    risk: RiskType;
    creationDate: string,
    isComplite: boolean,
    data: string,
}
export type ViewOptionsType = typeof TABLE_VIEW | typeof BRICK_VIEW;
type SupplierSliceType = {
    suppliers: Array<SupplerDataType>,
    search: string,
    view: ViewOptionsType;
    searchByComplited: SearchByComplitedType,
    searchByRisk: RiskType,
    searchByDateStart: string,
    searchByDateEnd: string,
    
}
const initContent:SupplierSliceType = {
    suppliers: [
        {
            supplierId: '00001',
            supplierName: 'ПАО "МТС"',
            risk: 'low',
            creationDate: '2023-01-01',
            isComplite: true,
            data: 'ПАО МТС Информация',
        },
        {
            supplierId: '00002',
            supplierName: 'ПАО "Пятерочка"',
            risk: 'medium',
            creationDate: '2022-02-02',
            isComplite: true,
            data: 'Пятерочка Информация',
        },
        {
            supplierId: '00003',
            supplierName: 'ООО "Ромашка"',
            risk: 'high',
            creationDate: '2022-05-05',
            isComplite: true,
            data: 'Ромашка Информация',
        },
        {
            supplierId: '00004',
            supplierName: 'ООО "Рога и копыта"',
            risk: undefined,
            creationDate: '2022-04-04',
            isComplite: false,
            data: 'Рога и копыта INFO',
        }
        ],
    search: '',
    view: TABLE_VIEW,

    searchByDateStart: '',
    searchByDateEnd: '',
    searchByComplited: SEARCH_COMPLETED_ALL,
    searchByRisk: undefined,
}


export const supplierSlice = createSlice({
    name: 'auth',
    initialState: initContent,
    reducers: {
        changeViewAC: (state:SupplierSliceType, action: PayloadAction<ViewOptionsType>) => {
            return {
                ...state,
                view: action.payload
            }
        },
        searchFieldChangeAC: (state:SupplierSliceType, action: PayloadAction<string>) => {
            return {...state, search: action.payload }
        },
        searchByDateFilterAC: (state:SupplierSliceType, action: PayloadAction<{dateStart: string, dateEnd: string}>) => {
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
export const {changeViewAC, searchFieldChangeAC, searchByComplitedChangeAC, searchByRiskAC, searchByDateFilterAC} = supplierSlice.actions;

export default supplierSlice.reducer;
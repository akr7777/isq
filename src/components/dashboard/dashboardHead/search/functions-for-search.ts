import dayjs from "dayjs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { COMMON_DATE_FORMAT } from "../../../../store/features/authSlice";
import { 
    SearchByComplitedType, RiskType, SEARCH_COMPLETED_FINISHED, SEARCH_COMPLETED_UNFINISHED, 
    RISK_LOW, RISK_HIGH, RISK_MEDIUM, SEARCH_COMPLETED_ALL, ColumnSortNameType, ColumnSortDirectionType, 
    SORT_ACS, NAME_COLUMN_SORT, CREATION_DATE_COLUMN_SORT, COMPLITED_COLUMN_SORT, RISK_COLUMN_SORT, SupplerDataType 
} from "../../../../store/features/supplierSlice";
import { getCompaniesThunk } from "../../../../store/features/supplierThunks";
import { RootState, useAppDispatch } from "../../../../store/store";


type SortArrayPropsType = {
    arr: Array<SupplerDataType>,
}

export function SortArray(props: SortArrayPropsType):Array<SupplerDataType> {
    let newArr:Array<SupplerDataType> = [...props.arr];
    const columnNameSorting:ColumnSortNameType = useSelector((state:RootState) => state.supplier.sortingOptions.columnNameSorting);
    const columnSortDirection:ColumnSortDirectionType = useSelector((state:RootState) => state.supplier.sortingOptions.columnSortDirection);
    
    if (columnNameSorting) {
            if (columnNameSorting === NAME_COLUMN_SORT)
                newArr = newArr.sort( (a,b) => {
                    if (a.supplierName < b.supplierName) 
                        return columnSortDirection === SORT_ACS ? -1 : 1;
                    else if (a.supplierName > b.supplierName)
                        return columnSortDirection === SORT_ACS ? 1 : -1;
                    else 
                        return 0;
                });
            if (columnNameSorting === CREATION_DATE_COLUMN_SORT) {
                newArr = newArr.sort( (a,b) => {
                    if (a.creationDate && b.creationDate && a.creationDate < b.creationDate) 
                        return columnSortDirection === SORT_ACS ? -1 : 1;
                    else if (a.creationDate && b.creationDate && a.creationDate > b.creationDate)
                        return columnSortDirection === SORT_ACS ? 1 : -1;
                    else 
                        return 0;
                });
            }
            if (columnNameSorting === COMPLITED_COLUMN_SORT) {
                newArr = newArr.sort( (a,b) => {
                    if (a.filledDate && b.filledDate && a.filledDate < b.filledDate)
                        return columnSortDirection === SORT_ACS ? -1 : 1;
                    else if (a.filledDate && b.filledDate && a.filledDate > b.filledDate)
                        return columnSortDirection === SORT_ACS ? 1 : -1;
                    else 
                        return 0;
                });
            }
            if (columnNameSorting === RISK_COLUMN_SORT) {
                newArr = newArr.sort( (a,b) => {
                    if (a.risk && b.risk && a.risk < b.risk)
                        return columnSortDirection === SORT_ACS ? -1 : 1;
                    else if (a.risk && b.risk && a.risk > b.risk)
                        return columnSortDirection === SORT_ACS ? 1 : -1;
                    else 
                        return 0;
                });
            }
    }
    return newArr;
}


export type AddSearchOptionsPropsType = {
    initArray:SupplerDataType[],
    searchField: string,
    searchComplited: SearchByComplitedType,
    searchRisk: RiskType,
    searchByDateStart: string,
    searchByDateEnd: string,
    searchByPurchaseTicket: string,
    columnNameSorting: ColumnSortNameType,
    columnSortDirection: ColumnSortDirectionType
}

export function AddSearchOptions() {
    const searchField:string = useSelector((state:RootState) => state.supplier.searchingOptions.search);
    const searchComplited:SearchByComplitedType = useSelector((state:RootState) => state.supplier.searchingOptions.searchByComplited);
    const searchRisk:RiskType = useSelector((state:RootState) => state.supplier.searchingOptions.searchByRisk);
    const searchByDateStart: string = useSelector((state: RootState) => state.supplier.searchingOptions.searchByDateStart);
    const searchByDateEnd: string = useSelector((state: RootState) => state.supplier.searchingOptions.searchByDateEnd);
    const searchByPurchaseTicket:string = useSelector((state:RootState) => state.supplier.searchingOptions.searchByPurchaseTicket) || "";
    
    const dispatch = useAppDispatch();

    const companies:Array<SupplerDataType> = useSelector((state:RootState) => state.supplier.suppliers);
    useEffect( () => {
        dispatch(getCompaniesThunk(1));
    }, [])

    let newArr:Array<SupplerDataType> = companies.filter( el => el.supplierName.toLowerCase().includes(searchField.toLowerCase()));

    if (searchComplited === SEARCH_COMPLETED_FINISHED)
        newArr = newArr.filter( el => el.filledDate );
    if (searchComplited === SEARCH_COMPLETED_UNFINISHED)
        newArr = newArr.filter( el => el.filledDate );

    if (searchRisk === RISK_LOW)
        newArr = newArr.filter( el => el.risk === RISK_LOW);
    if (searchRisk === RISK_MEDIUM)
        newArr = newArr.filter( el => el.risk === RISK_MEDIUM);
    if (searchRisk === RISK_HIGH)
        newArr = newArr.filter( el => el.risk === RISK_HIGH);

    if (searchByPurchaseTicket.length > 0)
        newArr = newArr.filter( el => el.purchaseTicket?.includes(searchByPurchaseTicket))
    
    if (searchByDateStart) {
        newArr = newArr.filter( el => (el.creationDate && searchByDateStart) 
            ? el.creationDate > dayjs(searchByDateStart).format(COMMON_DATE_FORMAT) : el);
    }
    if (searchByDateEnd) {
        newArr = newArr.filter( el => (el.creationDate && searchByDateEnd) 
            ? el.creationDate < dayjs(searchByDateEnd).format(COMMON_DATE_FORMAT) : el);
    }
    

    // SORTING
    newArr = SortArray({arr: newArr});

    return newArr;
}

export function IsSomeSearchOptionFilled():boolean {
    const searchFieldText:string = useSelector((state:RootState) => state.supplier.searchingOptions.search) || "";
    const searchByComplited: SearchByComplitedType = useSelector((state:RootState) => state.supplier.searchingOptions.searchByComplited);
    const searchByRisk: RiskType = useSelector((state:RootState) => state.supplier.searchingOptions.searchByRisk);
    const searchByDateStart: string = useSelector((state:RootState) => state.supplier.searchingOptions.searchByDateStart) || "";
    const searchByDateEnd: string = useSelector((state:RootState) => state.supplier.searchingOptions.searchByDateEnd) || "";
    const searchByPurchaseTicket: string = useSelector((state: RootState) => state.supplier.searchingOptions.searchByPurchaseTicket) || "";

    const isCircled: boolean = searchFieldText.length > 0 || searchByComplited !== SEARCH_COMPLETED_ALL || 
                        (searchByRisk !== undefined && searchByRisk !== null) ||
                        (searchByDateStart.length > 0) || (searchByDateEnd.length > 0) ||
                        searchByPurchaseTicket.length > 0;

    return isCircled;
}
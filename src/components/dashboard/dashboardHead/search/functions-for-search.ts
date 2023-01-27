import { useSelector } from "react-redux";
import { SearchByComplitedType, RiskType, 
    SEARCH_COMPLETED_FINISHED, SEARCH_COMPLETED_UNFINISHED, 
    RISK_LOW, RISK_HIGH, RISK_MEDIUM, FilterDateType, SEARCH_COMPLETED_ALL, ColumnSortNameType, ColumnSortDirectionType, SORT_ACS, SORT_DSC, NAME_COLUMN_SORT, CREATION_DATE_COLUMN_SORT, COMPLITED_COLUMN_SORT, RISK_COLUMN_SORT, SupplerDataType } 
    from "../../../../store/features/supplierSlice";
import { RootState } from "../../../../store/store";


type SortArrayPropsType = {
    arr: Array<SupplerDataType>,
    // columnNameSorting:ColumnSortNameType,
    // columnSortDirection:ColumnSortDirectionType
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
                    if (a.isComplite < b.isComplite)
                        return columnSortDirection === SORT_ACS ? -1 : 1;
                    else if (a.isComplite > b.isComplite)
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
    searchByDateStart: FilterDateType,
    searchByDateEnd: FilterDateType,
    searchByPurchaseTicket: string,
    columnNameSorting: ColumnSortNameType,
    columnSortDirection: ColumnSortDirectionType
}

export function AddSearchOptions() {
    const searchField:string = useSelector((state:RootState) => state.supplier.search);
    const searchComplited:SearchByComplitedType = useSelector((state:RootState) => state.supplier.searchByComplited);
    const searchRisk:RiskType = useSelector((state:RootState) => state.supplier.searchByRisk);
    const searchByDateStart: FilterDateType = useSelector((state: RootState) => state.supplier.searchByDateStart);
    const searchByDateEnd: FilterDateType = useSelector((state: RootState) => state.supplier.searchByDateEnd);
    const searchByPurchaseTicket:string = useSelector((state:RootState) => state.supplier.searchByPurchaseTicket) || "";
    // const columnNameSorting:ColumnSortNameType = useSelector((state:RootState) => state.supplier.sortingOptions.columnNameSorting);
    // const columnSortDirection:ColumnSortDirectionType = useSelector((state:RootState) => state.supplier.sortingOptions.columnSortDirection);
    
    let newArr:Array<SupplerDataType> = useSelector((state:RootState) => state.supplier.suppliers)
        .filter( el => el.supplierName.toLowerCase().includes(searchField.toLowerCase()));

    if (searchComplited === SEARCH_COMPLETED_FINISHED)
        newArr = newArr.filter( el => el.isComplite === true );
    if (searchComplited === SEARCH_COMPLETED_UNFINISHED)
        newArr = newArr.filter( el => el.isComplite === false );

    if (searchRisk === RISK_LOW)
        newArr = newArr.filter( el => el.risk === RISK_LOW);
    if (searchRisk === RISK_MEDIUM)
        newArr = newArr.filter( el => el.risk === RISK_MEDIUM);
    if (searchRisk === RISK_HIGH)
        newArr = newArr.filter( el => el.risk === RISK_HIGH);

    if (searchByPurchaseTicket.length > 0)
        newArr = newArr.filter( el => el.purchaseTicket?.includes(searchByPurchaseTicket))

    // const dateStartSearchDefault = searchByDateStart || new Date(1800, 1, 1);
    // const dateEndSearchDefault = searchByDateEnd || new Date(2500, 12, 31);

    newArr = newArr.filter( el => (el.creationDate && searchByDateStart) ? el.creationDate > searchByDateStart : el);
    newArr = newArr.filter( el => (el.creationDate && searchByDateEnd) ? el.creationDate < searchByDateEnd : el);

    // SORTING
    newArr = SortArray({
        arr: newArr
        // columnNameSorting: props.columnNameSorting,
        // columnSortDirection: props.columnSortDirection
    });

    return newArr;
}

export function IsSomeSearchOptionFilled():boolean {
    const searchByComplited: SearchByComplitedType = useSelector((state:RootState) => state.supplier.searchByComplited);
    const searchByRisk: RiskType = useSelector((state:RootState) => state.supplier.searchByRisk);
    const searchByDateStart: FilterDateType = useSelector((state:RootState) => state.supplier.searchByDateStart);
    const searchByDateEnd: FilterDateType = useSelector((state:RootState) => state.supplier.searchByDateEnd);
    const searchByPurchaseTicket: string = useSelector((state: RootState) => state.supplier.searchByPurchaseTicket);

    const isCircled: boolean = searchByComplited !== SEARCH_COMPLETED_ALL || (searchByRisk !== undefined) ||
                        (searchByDateStart !== undefined) || (searchByDateEnd !== undefined) ||
                        searchByPurchaseTicket.length > 0;

    return isCircled;
}
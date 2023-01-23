import { useSelector } from "react-redux";
import { SearchByComplitedType, RiskType, 
    SEARCH_COMPLETED_FINISHED, SEARCH_COMPLETED_UNFINISHED, 
    RISK_LOW, RISK_HIGH, RISK_MEDIUM, FilterDateType, SEARCH_COMPLETED_ALL, ColumnSortNameType, ColumnSortDirectionType, SORT_ACS, SORT_DSC, NAME_COLUMN_SORT, CREATION_DATE_COLUMN_SORT } 
    from "../../../../store/features/supplierSlice";
import { RootState } from "../../../../store/store";

// type AddSearchOptionsPropsType = {
//     array:SupplerDataType[],
//     searchField: string,
//     searchComplited: SearchByComplitedType,
//     searchRisk: RiskType,
//     searchByDateStart: FilterDateType,
//     searchByDateEnd: FilterDateType,
//     searchByPurchaseTicket: string,
// }
export function AddSearchOptions() {
    const searchField:string = useSelector((state:RootState) => state.supplier.search);
    const searchComplited:SearchByComplitedType = useSelector((state:RootState) => state.supplier.searchByComplited);
    const searchRisk:RiskType = useSelector((state:RootState) => state.supplier.searchByRisk);
    const searchByDateStart: FilterDateType = useSelector((state: RootState) => state.supplier.searchByDateStart);
    const searchByDateEnd: FilterDateType = useSelector((state: RootState) => state.supplier.searchByDateEnd);
    const searchByPurchaseTicket:string = useSelector((state:RootState) => state.supplier.searchByPurchaseTicket) || "";
    
    let newArr = useSelector((state:RootState) => state.supplier.suppliers)
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

    const dateStartSearchDefault = searchByDateStart || new Date(1900, 1, 1);
    const dateEndSearchDefault = searchByDateEnd || new Date(2500, 12, 31);

    newArr = newArr.filter( el => el.creationDate > dateStartSearchDefault);
    newArr = newArr.filter( el => el.creationDate < dateEndSearchDefault);

    // SORTING
    const columnNameSorting:ColumnSortNameType = useSelector((state:RootState) => state.supplier.sortingOptions.columnNameSorting);
    const columnSortDirection:ColumnSortDirectionType = useSelector((state:RootState) => state.supplier.sortingOptions.columnSortDirection);
    if (columnNameSorting) {
        if (columnSortDirection === SORT_ACS) {
            if (columnNameSorting === NAME_COLUMN_SORT)
                newArr = newArr.sort( (a,b) => {
                    if (a.supplierName < b.supplierName) 
                        return -1;
                    else if (a.supplierName > b.supplierName)
                        return 1;
                    else 
                        return 0;
                });
            if (columnNameSorting === CREATION_DATE_COLUMN_SORT) {
                newArr = newArr.sort( (a,b) => {
                    if (a.creationDate < b.creationDate) 
                        return -1;
                    else if (a.creationDate > b.creationDate)
                        return 1;
                    else 
                        return 0;
                });
            }
            // if ()
        }
        if (columnSortDirection === SORT_DSC) {

        }
    }

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
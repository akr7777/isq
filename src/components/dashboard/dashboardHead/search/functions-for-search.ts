import { useSelector } from "react-redux";
import { SearchByComplitedType, RiskType, 
    SEARCH_COMPLETED_FINISHED, SEARCH_COMPLETED_UNFINISHED, 
    RISK_LOW, SupplerDataType, RISK_HIGH, RISK_MEDIUM, FilterDateType } 
    from "../../../../store/features/supplierSlice";

type AddSearchOptionsPropsType = {
    array:SupplerDataType[],
    searchField: string,
    searchComplited: SearchByComplitedType,
    searchRisk: RiskType,
    searchByDateStart: FilterDateType,
    searchByDateEnd: FilterDateType,
}
export function addSearchOptions(props: AddSearchOptionsPropsType) {
    // console.log('function addSearchOptions (functions-for-dearch.tsx) props=',props);
    
    let newArr = props.array
        .filter( el => el.supplierName.toLowerCase().includes(props.searchField.toLowerCase()));

    if (props.searchComplited === SEARCH_COMPLETED_FINISHED)
        newArr = newArr.filter( el => el.isComplite === true );
    if (props.searchComplited === SEARCH_COMPLETED_UNFINISHED)
        newArr = newArr.filter( el => el.isComplite === false );

    if (props.searchRisk === RISK_LOW)
        newArr = newArr.filter( el => el.risk === RISK_LOW);
    if (props.searchRisk === RISK_MEDIUM)
        newArr = newArr.filter( el => el.risk === RISK_MEDIUM);
    if (props.searchRisk === RISK_HIGH)
        newArr = newArr.filter( el => el.risk === RISK_HIGH);

    const dateStartSearchDefault = props.searchByDateStart || new Date(1900, 1, 1);
    const dateEndSearchDefault = props.searchByDateEnd || new Date(2500, 12, 31);

    // console.log('dateStartSearchDefault=', dateStartSearchDefault.toLocaleDateString(), 'dateEndSearchDefault=',dateEndSearchDefault.toLocaleDateString());
    
    newArr = newArr.filter( el => el.creationDate > dateStartSearchDefault);
    newArr = newArr.filter( el => el.creationDate < dateEndSearchDefault);
        

    return newArr;
}
import { useSelector } from "react-redux";
import { SearchByComplitedType, RiskType, 
    SEARCH_COMPLETED_FINISHED, SEARCH_COMPLETED_UNFINISHED, 
    RISK_LOW, SupplerDataType, RISK_HIGH, RISK_MEDIUM } 
    from "../../../../store/features/supplierSlice";

type AddSearchOptionsPropsType = {
    array:SupplerDataType[],
    searchField: string,
    searchComplited: SearchByComplitedType,
    searchRisk: RiskType,
    searchByDateStart: string,
    searchByDateEnd: string,
}
export function addSearchOptions(props: AddSearchOptionsPropsType) {
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

    if (props.searchByDateStart.length > 0)
        newArr = newArr.filter( el => el.creationDate > props.searchByDateStart);
    if (props.searchByDateEnd.length > 0)
        newArr = newArr.filter( el => el.creationDate > props.searchByDateEnd);

    return newArr;
}
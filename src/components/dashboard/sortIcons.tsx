import iconSortBlack1 from "../../public/icons/sort_black_1.png";
import iconSortGrey1 from "../../public/icons/sort_grey_1.png";
import iconSortBlack2 from "../../public/icons/sort_black_2.png";
import iconSortGrey2 from "../../public/icons/sort_grey_2.png";
import { changeColumnDirectionSortingAC, changeColumnNameSortingAC, ColumnSortDirectionType, ColumnSortNameType, SORT_ACS, SORT_DSC } from "../../store/features/supplierSlice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import s from './dashboard.module.css';

type SortingIconsPropsType = {
    columnName: ColumnSortNameType,
}
const SortingIcons = (props: SortingIconsPropsType) => {
    const dispatch = useAppDispatch();
    const columnNameSorting:ColumnSortNameType = useSelector((state:RootState) => state.supplier.sortingOptions.columnNameSorting);
    const columnSortDirection:ColumnSortDirectionType = useSelector((state:RootState) => state.supplier.sortingOptions.columnSortDirection);

    const onSortClickHandler = (sortDirection: ColumnSortDirectionType) => {
        dispatch(changeColumnNameSortingAC(props.columnName));
        dispatch(changeColumnDirectionSortingAC(columnSortDirection));
    }

    return <>
        <div className={s.sortingIcons}>
            {
                props.columnName === columnNameSorting
                    ? columnSortDirection === SORT_ACS
                        ? <>
                            <img src={iconSortBlack1} onClick={() => onSortClickHandler(SORT_ACS)}/>
                            <img src={iconSortGrey2} onClick={() => onSortClickHandler(SORT_DSC)}/>
                        </>
                        : <>
                            <img src={iconSortGrey1} onClick={() => onSortClickHandler(SORT_ACS)}/>
                            <img src={iconSortBlack2} onClick={() => onSortClickHandler(SORT_DSC)}/>
                        </>
                    : <>
                        <img src={iconSortGrey1} onClick={() => onSortClickHandler(SORT_ACS)}/>
                        <img src={iconSortGrey2} onClick={() => onSortClickHandler(SORT_DSC)}/>
                    </>
            }
        </div>
    </>
}

export default SortingIcons;
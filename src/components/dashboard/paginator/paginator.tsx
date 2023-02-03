import { useSelector } from "react-redux";
import { changeCurrentPageAC } from "../../../store/features/supplierSlice";
import { getCompaniesThunk } from "../../../store/features/supplierThunks";
import { RootState, useAppDispatch } from "../../../store/store";
import s from './paginator.module.css';

const Paginator = () => {
    // const companiesCount:number = useSelector((state:RootState) => state.supplier.pageOptions.companiesCount);
    // const pageSize:number = useSelector((state:RootState) => state.supplier.settings.pageSizing)
    const totalPages:number = useSelector((state:RootState) => state.supplier.pageOptions.totalPages);
    const pageSize:number = useSelector((state:RootState) => state.auth.userSettings.items_per_page);
    // const pageCount: number = Math.ceil( companiesCount / pageSize);
    const currentPage:number = useSelector((state:RootState) => state.supplier.pageOptions.currentPage);

    const startPageNumber:number = currentPage > 6
                                        ? currentPage - 5
                                        : 1
    const endPageNumber:number = totalPages - currentPage > 6 
                                        ? currentPage + 5
                                        : totalPages
    let pagesArr:Array<number> = [];
    for (let i=startPageNumber; i<= endPageNumber; i++)
        pagesArr.push(i);

    const dispatch = useAppDispatch();

    const pageCountClickHandler = (num: number) => {
        dispatch(changeCurrentPageAC(num));
        dispatch(getCompaniesThunk({}))
    }

    return <div className={s.paginatorDiv}>

        {
            startPageNumber > 2 && <div 
                className={s.pageDiv}
                onClick={() => pageCountClickHandler(1)}
            >
                1
            </div>
        }
        

        { startPageNumber > 2 && <div>...</div> }

        {
            pagesArr.map(n => {
                return <div 
                            key={n}
                            className={n === currentPage ? s.pageDiv + " " + s.pageDivChecked : s.pageDiv}
                            onClick={ n === currentPage 
                                        ? () => {}
                                        : () => pageCountClickHandler(n)
                                    }
                        >
                    {n}
                </div>
            })
        }

        { endPageNumber < totalPages - 2 && <div>...</div> }

        { 
            endPageNumber < totalPages - 2 && <div 
                    className={s.pageDiv}
                    onClick={() => pageCountClickHandler(totalPages)}
                >
                    {totalPages}
                </div>
        }

    </div>
}

export default Paginator;
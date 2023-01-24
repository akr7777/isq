import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Paginator = () => {
    const pageCount:number = useSelector((state:RootState) => state.supplier.pageCount);
    const currentPage:number = useSelector((state:RootState) => state.supplier.currentPage);

    const startPageNumber:number = currentPage > 6
                                        ? currentPage - 5
                                        : 1
    const endPageNumber:number = pageCount - currentPage > 6 
                                        ? currentPage + 5
                                        : pageCount

    return <div>

    </div>
}

export default Paginator;
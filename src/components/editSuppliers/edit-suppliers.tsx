import { useState } from "react";
import { useSelector } from "react-redux";
import { SupplerDataType } from "../../store/features/supplierSlice";
import { RootState } from "../../store/store";
import s from "./edit-suppliers.module.css";

const EditSuppliers = () => {

    const companies:Array<SupplerDataType> = useSelector((state:RootState) => state.supplier.suppliers);

    const [showBtns, setShowBtns] = useState<string>('');

    return <div className={s.edit_div_wrapper}>
        <h1>Edit suppliers list</h1>

        <div className={s.table_div}>
            {
                companies.map( ( comp:SupplerDataType, elIndex:number ) => {

                    const currentClass: string = elIndex % 2 === 0 
                        ? s.table_field + " " + s.tableLine_color1
                        : s.table_field + " " + s.tableLine_color2

                    

                    const onHoverMouse = () => {setShowBtns(comp.supplierId)}
                    const onLeaveMouse = () => {setShowBtns('')}

                    return <>
                        <div 
                            className={currentClass} 
                            key={"1_"+ String(elIndex)}
                            onMouseOver={onHoverMouse}
                            onMouseLeave={onLeaveMouse}
                        >
                            {comp.supplierName}
                        </div>
                        <div 
                            className={currentClass} 
                            key={"2_"+ String(elIndex)}
                            onMouseOver={onHoverMouse}
                            onMouseLeave={onLeaveMouse}
                        >
                            {
                                showBtns === comp.supplierId && <label>buttons...</label>
                            }
                        </div>
                    </>
                })
            }
        </div>
            
    </div>
}

export default EditSuppliers;
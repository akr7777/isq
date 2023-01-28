import { useState } from "react";
import { useSelector } from "react-redux";
import { DARK, LIGHT } from "../../hooks/useTheme";
import { UserThemeType } from "../../store/features/authSlice";
import { SupplerDataType } from "../../store/features/supplierSlice";
import { RootState } from "../../store/store";
import s from "./edit-suppliers.module.css";

const EditSuppliers = () => {

    const companies:Array<SupplerDataType> = useSelector((state:RootState) => state.supplier.suppliers);

    const [showBtns, setShowBtns] = useState<string>('');
    const theme:UserThemeType = useSelector((state:RootState) => state.auth.userSettings.theme);

    return <div className={s.edit_div_wrapper}>

        <h1>Edit suppliers list</h1>

        <div className={s.someDiv}>        
            {
                companies.map( ( comp:SupplerDataType, elIndex:number ) => {

                    const currentClass: string = elIndex % 2 === 0 
                        ? theme === LIGHT ? s.table_field + " " + s.tableLine_color1 : s.table_field + " " + s.tableLine_color3
                        : theme === LIGHT ? s.table_field + " " + s.tableLine_color2 : s.table_field + " " + s.tableLine_color4

                    

                    const onHoverMouse = () => {setShowBtns(comp.supplierId)}
                    const onLeaveMouse = () => {setShowBtns('')}

                    return <div className={s.table_line_div} key={"0_"+String(elIndex)}>
                        <div 
                            className={currentClass + " " + s.br_left} 
                            key={"1_"+ String(elIndex)}
                            onMouseOver={onHoverMouse}
                            onMouseLeave={onLeaveMouse}
                        >
                            {comp.supplierName}
                        </div>
                        <div 
                            className={currentClass + " " + s.br_right} 
                            key={"2_"+ String(elIndex)}
                            onMouseOver={onHoverMouse}
                            onMouseLeave={onLeaveMouse}
                        >
                            {
                                showBtns === comp.supplierId && <>
                                    <div className={s.changing_div + " " + s.edit_div}>
                                        editing
                                    </div>
                                    <div className={s.changing_div + " " + s.delete_div}>
                                        deleting
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                })
            }
        </div>
    </div>
}

export default EditSuppliers;
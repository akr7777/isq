import React, {useState} from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { DateRangeType } from "react-tailwindcss-datepicker/dist/types";

const Cal = () => {
    const [value, setValue] = useState<DateRangeType>({
        startDate: new Date(),
        endDate: new Date()
    });
    
    const handleValueChange = (newValue:any) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }
    
    return (
        <div>
            <Datepicker
                value={value}
                onChange={(newValue: any) => handleValueChange(newValue)}
            />
        </div>
    );
};

export default Cal;
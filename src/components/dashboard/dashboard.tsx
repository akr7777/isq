import { useSelector } from "react-redux";
//import { UserIdType } from "../../store/features/authSlice";
import { RootState } from "../../store/store";
import { useTranslation } from 'react-i18next';
import s from './dashboard.module.css';
import DashboardHead from "./dashboardHead/dashboardHead";
import DataTable from "./dataTable/dataTable";
import DataBricks from "./dataBricks/dataBricks";
// import Checker from "../profile/checker";
import { BRICK_VIEW, TABLE_VIEW, ViewOptionsType } from "../../store/features/supplierSlice";
// import { useEffect } from "react";
// import { DARK, LIGHT, useTheme } from "../../hooks/useTheme";

const Dashboard = () => {
    const { t } = useTranslation();

    // const userId:UserIdType = useSelector((state:RootState) => state.auth.userId);
    const currentView:ViewOptionsType = useSelector((state: RootState) => state.supplier.view);

    return <div className={s.profileDiv}>

        {/* <label>{theme}</label> */}

        <DashboardHead />

        { currentView === TABLE_VIEW &&  <DataTable />}
        
        { currentView === BRICK_VIEW && <DataBricks />}

        
    </div>
}

export default Dashboard;
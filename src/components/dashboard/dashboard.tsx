import { lazy } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import s from './dashboard.module.css';
import DashboardHead from "./dashboardHead/dashboardHead";
// import DataTable from "./dataTable/dataTable";
// import DataBricks from "./dataBricks/dataBricks";
import Paginator from "./paginator/paginator";
import { BRICK_VIEW, TABLE_VIEW, LayoutOptionsType } from "../../store/features/authSlice";
import Preloader from "../common/preloader/preloader";

const DataTable = lazy(() => import("./dataTable/dataTable"));
const DataBricks = lazy(() => import("./dataBricks/dataBricks"));

const Dashboard = () => {
    // const currentView:ViewOptionsType = useSelector((state: RootState) => state.supplier.settings.view);
    const currentLayoutView:LayoutOptionsType = useSelector((state: RootState) => state.auth.userSettings.layout);
    const isLoading:boolean = useSelector((state:RootState) => state.supplier.loadingVars.suppliersLoading);
    
    return <div className={s.profileDiv}>

        <DashboardHead />

        {
            isLoading 
                ? <Preloader /> 
                : currentLayoutView === TABLE_VIEW 
                    ? <DataTable />
                    : currentLayoutView === BRICK_VIEW 
                        ? <DataBricks /> 
                        : <div>No Table and No Bricks view</div>
        }
        
        
        {/* { currentLayoutView === BRICK_VIEW && <DataBricks />} */}

        <Paginator />
        
    </div>
}

export default Dashboard;
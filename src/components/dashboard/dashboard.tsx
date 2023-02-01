import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import s from './dashboard.module.css';
import DashboardHead from "./dashboardHead/dashboardHead";
import DataTable from "./dataTable/dataTable";
import DataBricks from "./dataBricks/dataBricks";
import Paginator from "./paginator/paginator";
import { BRICK_VIEW, TABLE_VIEW, LayoutOptionsType } from "../../store/features/authSlice";

const Dashboard = () => {
    // const currentView:ViewOptionsType = useSelector((state: RootState) => state.supplier.settings.view);
    const currentLayoutView:LayoutOptionsType = useSelector((state: RootState) => state.auth.userSettings.layout);
    
    return <div className={s.profileDiv}>

        <DashboardHead />

        { currentLayoutView === TABLE_VIEW &&  <DataTable />}
        
        { currentLayoutView === BRICK_VIEW && <DataBricks />}

        <Paginator />
        
    </div>
}

export default Dashboard;
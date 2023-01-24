import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import s from './dashboard.module.css';
import DashboardHead from "./dashboardHead/dashboardHead";
import DataTable from "./dataTable/dataTable";
import DataBricks from "./dataBricks/dataBricks";
import { BRICK_VIEW, TABLE_VIEW, ViewOptionsType } from "../../store/features/supplierSlice";
import Paginator from "./paginator/paginator";

const Dashboard = () => {
    const currentView:ViewOptionsType = useSelector((state: RootState) => state.supplier.settings.view);

    return <div className={s.profileDiv}>

        <DashboardHead />

        { currentView === TABLE_VIEW &&  <DataTable />}
        
        { currentView === BRICK_VIEW && <DataBricks />}

        <Paginator />
        
    </div>
}

export default Dashboard;
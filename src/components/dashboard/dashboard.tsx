import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import s from './dashboard.module.css';
import DashboardHead from "./dashboardHead/dashboardHead";
import DataTable from "./dataTable/dataTable";
import DataBricks from "./dataBricks/dataBricks";
import { BRICK_VIEW, TABLE_VIEW, ViewOptionsType } from "../../store/features/supplierSlice";

const Dashboard = () => {
    const currentView:ViewOptionsType = useSelector((state: RootState) => state.supplier.view);

    return <div className={s.profileDiv}>

        <DashboardHead />


        Dashboard.tsx Фильтрация по звершенности: All
        <br/>
        Также сделать возможность сравнения компаний
        <br/>
        Урорядочивание таблицы по разным признакам
        <br />
        Действующий ли поставщик или новый
        <br/>
        Поиск по тикету закупки (номеру закупки)
        <br/>
        Сделать красивый Profile
        <br/>
        Header: либо уже, либо убрать Логотип

        { currentView === TABLE_VIEW &&  <DataTable />}
        
        { currentView === BRICK_VIEW && <DataBricks />}

        
    </div>
}

export default Dashboard;
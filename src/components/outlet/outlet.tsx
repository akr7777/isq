import { Navigate, Route, Routes } from "react-router-dom"
import { RequireAuth } from "../../hooks/RequireAuth";
import Login from "../login/login";
import Dashboard from "../dashboard/dashboard";
import Description from './../../components/description/description';
import Questions from './../../components/questions/question';
import ErrorPage from '../NotFoundPage/error404';
import SupplierCard from "../supplierCard/supplierCard";
import Profile from "../profile/profile";
import s from "./outlet.module.css";

export const PATHS = {
    dashboard: "/dashboard",
    questions: "/questions",
    login: "/login",
    notFoundPage: "/404",
    supplierCard: '/supplierCard',
    profile: '/profile',
}

const Outlet = () => {
    // return <div className={s.outlet}>
    return <div className={s.outlet}>
        <Routes>

            <Route path="/" element={
                <RequireAuth>
                    <Description />
                </RequireAuth>
            } />

            <Route path={PATHS.dashboard} element={
                <RequireAuth>
                    <Dashboard />
                </RequireAuth>
            } />

            <Route path={PATHS.questions} element={
                <RequireAuth>
                    <Questions />
                </RequireAuth>
            } />

            <Route path={PATHS.profile} element={
                <RequireAuth>
                    <Profile />
                </RequireAuth>
            } />

            {/* <Route path={PATHS.supplierCard} element={
                <RequireAuth>
                    <SupplierCard />
                </RequireAuth>
            }> */}
            <Route path={PATHS.supplierCard}>
                <Route path=":supplierId" element={
                    <RequireAuth>
                        <SupplierCard />
                    </RequireAuth>
                } />
            </Route>

            <Route path={PATHS.login} element={<Login />} />

            <Route path='*' element={<ErrorPage />} />

            <Route path={PATHS.notFoundPage} element={<ErrorPage />} />
            <Route path='*' element={ <Navigate to={PATHS.notFoundPage} replace />} />

        </Routes>
    </div>
}



export default Outlet;
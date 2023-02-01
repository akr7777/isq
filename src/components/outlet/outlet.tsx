import { lazy } from 'react';
import { Navigate, Route, Routes } from "react-router-dom"
import { RequireAuth } from "../../hooks/RequireAuth";
import Questions from './../../components/questions/question';
import ErrorPage from '../NotFoundPage/error404';
import { ADMIN_USER_ROLE, MANAGER_USER_ROLE } from "../../store/features/authSlice";

import s from "./outlet.module.css";
// import Login from "../login/login";
const Login = lazy( () => import("../login/login"));
// import Dashboard from "../dashboard/dashboard";
const Dashboard = lazy(() => import("../dashboard/dashboard"));
// import Description from './../../components/description/description';
const Description = lazy(() => import('./../../components/description/description'));
// import SupplierCard from "../supplierCard/supplierCard";
const SupplierCard = lazy(() => import("../supplierCard/supplierCard"));
// import Profile from "../profile/profile";
const Profile = lazy(() => import("../profile/profile"));
// import NewSupplier from "../newSupplier/newSupplier";
const NewSupplier = lazy(() => import("../newSupplier/newSupplier"));
// import EditSuppliers from "../editSuppliers/edit-suppliers";
const EditSuppliers = lazy(() => import("../editSuppliers/edit-suppliers"));

export const PATHS = {
    mainPage: '/',
    dashboard: "/dashboard",
    questions: "/questions",
    login: "/login",
    notFoundPage: "/404",
    supplierCard: '/supplierCard',
    profile: '/profile',
    newSupplier: '/new',
    editSuppliers: '/editSuppliers'
}

const Outlet = () => {
    // return <div className={s.outlet}>
    return <div className={s.outlet}>
        <Routes>

            <Route path="/" element={
                // <RequireAuth>
                    <Description />
                // </RequireAuth>
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

            <Route path={PATHS.newSupplier} element={
                <RequireAuth>
                    <NewSupplier />
                </RequireAuth>
            } />

            <Route path={PATHS.editSuppliers} element={
                <RequireAuth requiredUserRoles={[ADMIN_USER_ROLE, MANAGER_USER_ROLE]}>
                    <EditSuppliers />
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
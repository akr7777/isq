import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { RoleType } from "../store/features/authSlice";
import { RootState } from "../store/store";
//import { useAuth } from "../hooks/Auth";


export type RequireAuthPropsType = {
    children: JSX.Element,
    requiredUserRoles?: Array<RoleType>
}

export function RequireAuth(props: RequireAuthPropsType) {
// export function RequireAuth({ children }: { children: JSX.Element }) {

  //let { user } = useAuth();
  // const navigate = useNavigate();
  const isAuth:boolean = useSelector((state: RootState) => state.auth.userId)
                         ? true : false;
  const userRole:RoleType = useSelector((state:RootState) => state.auth.role);
  // let location = useLocation();

//   useEffect(() => {
//     if (!isAuth){
//         return navigate("/login");
//     }
//     },[isAuth]);

  if (isAuth) {
    if (props.requiredUserRoles) {
        if (props.requiredUserRoles.some( role => role === userRole)) {
            return props.children;
        } else {
            return <Navigate to="/login" />;
        }
    } else {
        return props.children;
    }
    
  } else {
    //return <Navigate to="/login" state={{ from: location }} replace />;
    return <Navigate to="/login" />;
  }
}
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
//import { useAuth } from "../hooks/Auth";

export function RequireAuth({ children }: { children: JSX.Element }) {
  //let { user } = useAuth();
  const navigate = useNavigate();
  const isAuth:boolean = useSelector((state: RootState) => state.auth.userId)
                         ? true : false;
  let location = useLocation();

//   useEffect(() => {
//     if (!isAuth){
//         return navigate("/login");
//     }
//     },[isAuth]);

  if (isAuth) {
    return children;
  } else {
    //return <Navigate to="/login" state={{ from: location }} replace />;
    return <Navigate to="/login" />;
  }
}
import { Navigate, useLocation } from "react-router-dom";
import { FC } from "react";
import { useSelector } from "../../utils/hook";
import { ReactElement } from "react";

interface IProtectedRoute {
  anonymous: boolean;
  children: ReactElement
}

export const ProtectedRoute: FC<IProtectedRoute> = ({ children, anonymous = false }) => {
  const isLoggedIn = useSelector((store) => store.user.name);
  const location: any = useLocation();
  const from = location.state?.from || '/';

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

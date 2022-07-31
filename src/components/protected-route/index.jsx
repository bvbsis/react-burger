import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, anonymous = false }) {
  const isLoggedIn = useSelector((store) => store.user.name);
  const location = useLocation();
  const from = location.state?.from || '/';

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

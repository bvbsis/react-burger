import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useAuth from "../../services/useAuth";
import { GET_USER_DATA_SUCCESS } from "../../services/actions/user";

export function ProtectedRoute({ children, navigateTo }) {
  const { name } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUserData() {
      try {
        const data = await auth.getUser();
        const { email, name } = data.user;
        dispatch({
          type: GET_USER_DATA_SUCCESS,
          payload: { email, name },
        });
      } catch (err) {
        navigate("/login");
      }
    }
    getUserData();
  }, []);

  return name ? children : null;
}

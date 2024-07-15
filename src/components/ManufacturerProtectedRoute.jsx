import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ManufacturerProtectedRoute = ({ children }) => {
  const { token, accountType } = useSelector((state) => state.auth);
  if (token) {
    if (accountType === "manufacturer") {
      return children;
    } else {
      return <Navigate to="/sign-in" />;
    }
  } else {
    return <Navigate to="/sign-in" />;
  }
};

export default ManufacturerProtectedRoute;

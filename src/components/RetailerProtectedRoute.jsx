import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RetailerProtectedRoute = ({ children }) => {
  const { token, accountType } = useSelector((state) => state.auth);
  if (token) {
    if (accountType === "retailer") {
      return children;
    } else {
      return <Navigate to="/sign-in" />;
    }
  } else {
    return <Navigate to="/sign-in" />;
  }
};

export default RetailerProtectedRoute;

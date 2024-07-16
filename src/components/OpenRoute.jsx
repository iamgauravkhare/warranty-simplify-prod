import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const OpenRoute = ({ children }) => {
  const { token, accountType } = useSelector((state) => state.auth);
  if (token) {
    if (accountType === "consumer") {
      return <Navigate to="/consumer-dashboard" />;
    } else if (accountType === "retailer") {
      return <Navigate to="/retailer-dashboard" />;
    } else if (accountType === "manufacturer") {
      return <Navigate to="/manufacturer-dashboard" />;
    } else {
      return children;
    }
  } else {
    return children;
  }
};

export default OpenRoute;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ConsumerProtectedRoute = ({ children }) => {
  const { token, accountType } = useSelector((state) => state.auth);
  if (token) {
    if (accountType === "consumer") {
      return children;
    } else {
      return <Navigate to="/sign-in" />;
    }
  } else {
    return <Navigate to="/sign-in" />;
  }
};

export default ConsumerProtectedRoute;

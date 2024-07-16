import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import RegisterWarranty from "./pages/RegisterWarranty";
import ClaimWarranty from "./pages/ClaimWarranty";
import ConsumerDashboard from "./pages/ConsumerDashboard";
import RetailerDashboard from "./pages/RetailerDashboard";
import ManufacturerDashboard from "./pages/ManufacturerDashboard";
import ConsumerClaimView from "./pages/ConsumerClaimView";
import RetailerClaimView from "./pages/RetailerClaimView";
import ManufacturerClaimView from "./pages/ManufacturerClaimView";
import OpenRoute from "./components/OpenRoute";
import ConsumerProtectedRoute from "./components/ConsumerProtectedRoute";
import RetailerProtectedRoute from "./components/RetailerProtectedRoute";
import ManufacturerProtectedRoute from "./components/ManufacturerProtectedRoute";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { alreadySignedInAPIHandler } from "./services/auth/authAPIHandler";
import ConsClaimedWarranties from "./components/ConsClaimedWarranties";
import ConsRegisteredWarranties from "./components/ConsRegisteredWarranties";
import ConAccSettings from "./pages/ConAccSettings";
import RetAccSettings from "./pages/RetAccSettings";
import ManAccSettings from "./pages/ManAccSettings";
import ForgetPassword from "./pages/ForgetPassword";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const data = {
        token: localStorage.getItem("token"),
      };
      dispatch(alreadySignedInAPIHandler(data, navigate));
    }
  }, []);

  return (
    <div className="w-full min-h-screen relative">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoute>
              <Home />
            </OpenRoute>
          }
        />
        <Route
          path="/sign-in"
          element={
            <OpenRoute>
              <SignIn />
            </OpenRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          }
        />
        <Route
          path="/forget-password"
          element={
            <OpenRoute>
              <ForgetPassword />
            </OpenRoute>
          }
        />
        <Route
          path="/register-warranty"
          element={
            <ConsumerProtectedRoute>
              <RegisterWarranty />
            </ConsumerProtectedRoute>
          }
        />
        <Route
          path="/claim-warranty"
          element={
            <ConsumerProtectedRoute>
              <ClaimWarranty />
            </ConsumerProtectedRoute>
          }
        />
        <Route
          path="/consumer-dashboard"
          element={
            <ConsumerProtectedRoute>
              <ConsumerDashboard />
            </ConsumerProtectedRoute>
          }
        >
          <Route
            index
            element={
              <Navigate
                to="/consumer-dashboard/consumer-claimed-warranties"
                replace
              />
            }
          />
          <Route
            path="consumer-claimed-warranties"
            element={<ConsClaimedWarranties />}
          />
          <Route
            path="consumer-registered-warranties"
            element={<ConsRegisteredWarranties />}
          />
        </Route>
        <Route
          path="/retailer-dashboard"
          element={
            <RetailerProtectedRoute>
              <RetailerDashboard />
            </RetailerProtectedRoute>
          }
        />
        <Route
          path="/manufacturer-dashboard"
          element={
            <ManufacturerProtectedRoute>
              <ManufacturerDashboard />
            </ManufacturerProtectedRoute>
          }
        />
        <Route
          path="manufacturer/view-claim/:claimId"
          element={
            <ManufacturerProtectedRoute>
              <ManufacturerClaimView />
            </ManufacturerProtectedRoute>
          }
        />
        <Route
          path="retailer/view-claim/:claimId"
          element={
            <RetailerProtectedRoute>
              <RetailerClaimView />
            </RetailerProtectedRoute>
          }
        />
        <Route
          path="consumer/view-claim/:claimId"
          element={
            <ConsumerProtectedRoute>
              <ConsumerClaimView />
            </ConsumerProtectedRoute>
          }
        />
        <Route
          path="consumer/account-settings"
          element={
            <ConsumerProtectedRoute>
              <ConAccSettings />
            </ConsumerProtectedRoute>
          }
        />
        <Route
          path="retailer/account-settings"
          element={
            <RetailerProtectedRoute>
              <RetAccSettings />
            </RetailerProtectedRoute>
          }
        />
        <Route
          path="manufacturer/account-settings"
          element={
            <ManufacturerProtectedRoute>
              <ManAccSettings />
            </ManufacturerProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

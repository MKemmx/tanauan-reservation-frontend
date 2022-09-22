import React, { useEffect } from "react";
import "./App.css";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// React Router DOM
import { Routes, Route } from "react-router-dom";
// Layout
import AdminLayout from "./AdminScreen/layout/AdminLayout";
// Component Helper
import Page404 from "./components/Page404/Page404";

//Admin Components
import Dashboard from "./AdminScreen/Dashboard/Dashboard";
import UserTable from "./AdminScreen/User/UserTable";
import Reservation from "./AdminScreen/Reservation/Reservation";
import Rating from "./AdminScreen/Rating/RatingTable";
import EquipmentTable from "./AdminScreen/Equipment/EquipmentTable";
import AdminDetails from "./AdminScreen/AdminDetails/AdminDetails";
import LogsTable from "./AdminScreen/AdminLogs/LogsTable";

// User Components
import UserDashboard from "./UserScreen/Dashboard/UserDashboard";
import UserAccountDetails from "./UserScreen/AccountDetails/UserAccountDetails";
import AccountVerifer from "./UserScreen/AccountVerifier/AccountVerifier";
import ResetPassword from "./UserScreen/ResetPassword/ResetPassword";
import ChangePassword from "./UserScreen/ChangePassword/ChangePassword";

// User Layout
import UserLayout from "./UserScreen/Layout/UserLayout";

// Global State
import useLoginState from "./store/loginState";
// AOS Library
import AOS from "aos";

// Home
import LoginPage from "./HomeScreen/Login";
import RegisterPage from "./HomeScreen/Register";
import TermsAndConditions from "./HomeScreen/TermsAndConditions";

function App() {
  const { isAuthenticated, loginAs } = useLoginState((state) => state);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {/* Toast Alert */}
      <ToastContainer />
      <>
        {/* Admin */}
        {isAuthenticated && loginAs === "admin" && (
          <AdminLayout>
            <Routes>
              <Route path="*" element={<Page404 />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/user" element={<UserTable />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/rating" element={<Rating />} />
              <Route path="/equipment" element={<EquipmentTable />} />
              <Route path="/logs" element={<LogsTable />} />
              <Route path="/admin-details" element={<AdminDetails />} />
            </Routes>
          </AdminLayout>
        )}

        {/* User */}
        {isAuthenticated && loginAs === "user" && (
          <UserLayout>
            <Routes>
              <Route path="*" element={<Page404 />} />
              <Route path="/" element={<UserDashboard />} />
              <Route path="/account-details" element={<UserAccountDetails />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Routes>
          </UserLayout>
        )}

        {/* Home and Login */}
        {!isAuthenticated && (
          <Routes>
            <Route path="*" element={<Page404 />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/terms-conditions" element={<TermsAndConditions />} />
            <Route
              path="/reset-password/:_id/:emailToken"
              element={<ResetPassword />}
            />
          </Routes>
        )}

        <Routes>
          <Route path="/verify/:_id/:emailToken" element={<AccountVerifer />} />
        </Routes>
      </>
    </>
  );
}

export default App;

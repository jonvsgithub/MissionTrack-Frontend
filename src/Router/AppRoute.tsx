import { Route, Routes } from "react-router-dom";
import LoginForm from "../pages/LoginForm"; 
import Dashboard from "../pages/EmployeeDashboard";
import LandingPage from "../pages/LandingPage";
import Profile from "../Components/Settings/Profile";
import Password from "../Components/Settings/Password";
import Notification from "../Components/Settings/Notification";
import Details from "../Components/Request/Details";
import RecoverPassword from "../Components/forgetPassword/RecoverPassword";
import NotificationPage from "../Components/Dashboard/NotificationPage";
import MissionList from "../Components/Dashboard/MissionList";
import Report from "../Components/Dashboard/Report";
import MissionExpenses from "../Components/expenseLogging/MissionExpenses";
import UpdatePassword from "../Components/forgetPassword/UpdatePassword";
import ManagerDashboard from "../pages/ManagerDashboard";
import ApplicationForm from "../Components/ApplicationForm";
import TeamManagement from "../manager/TeamManagement";
import RequestManager from "../manager/RequestManager";
import ReportManager from "../manager/ReportManager";
import ReportDetails from "../manager/ReportDetails";
import Pending from "../Components/Pending";
import AllCompanies from "../pages/AllCompanies";
import AdminDashboard from "../pages/AdminDashboard";
import Rejected from "../Components/Rejected";
import Subscriptions from "../Components/Subscriptions";
import FinanceDashboard from "../pages/FinanceDashboard";
import AdminHome from "../pages/AdminHome";
import ManagerHome from "../pages/ManagerHome";
import EmployeeHome from "../pages/EmployeeHome";
import AllMission from "../pages/AllMission";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginForm />} />

      {/* Employee */}
      <Route path="/employee" element={<Dashboard />}>
        <Route index element={<EmployeeHome />} />
        <Route path="notifications" element={<NotificationPage />} />
        <Route path="request" element={<Details />} />
        <Route path="requestList" element={<MissionList />} />
        <Route path="expenses" element={<MissionExpenses />} />
        <Route path="report" element={<Report />} />
      </Route>

      {/* Global settings */}
      <Route path="/password" element={<Password />} />
      <Route path="/preferences" element={<Notification />} />

      {/* Password recovery */}
      <Route path="/forgot-password" element={<RecoverPassword />} />
      <Route path="/reset-password/:token" element={<UpdatePassword />} />

      {/* Manager */}
      <Route path="/manager" element={<ManagerDashboard />}>
        <Route index element={<ManagerHome />} />
        <Route path="team" element={<TeamManagement />} />
        <Route path="all" element={<AllMission />} />
        <Route path="requested" element={<RequestManager />} />
        <Route path="reported" element={<ReportManager />} />
      </Route>
      <Route path="/missions/:id" element={<ReportDetails />} />

      {/* Apply form */}
      <Route path="/apply" element={<ApplicationForm />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<AdminHome />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="companies" element={<AllCompanies />} />
        <Route path="profileA" element={<Profile />} />
        <Route path="preferencea" element={<Notification />} />
        <Route path="passwordA" element={<Password />} />
        <Route path="subscriptions" element={<Subscriptions />} />
      </Route>

      {/* Finance */}
      <Route path="/finance" element={<FinanceDashboard />} />

      {/* Shared */}
      <Route path="/pending" element={<Pending />} />
      <Route path="/rejected" element={<Rejected />} />
    </Routes>
  );
};

export default AppRoute;

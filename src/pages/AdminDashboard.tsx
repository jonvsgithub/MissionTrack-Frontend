import React, { useState } from "react";

import AdminSidebar from "../Components/Admin/AdminSidebar";
import TopCard from "../Components/Admin/TopCard";
import RegistrationChart from "../Components/Admin/RegistrationChart";
import ActivityChart from "../Components/Admin/ActivityChart";
import PendingActions from "../Components/Admin/PendingAction";
import RecentActivity from "../Components/RecentActivity";
import Summary from "../Components/Admin/Summary";
import HeaderAdmin from "../Components/Admin/HeaderAdmin";
import { Outlet } from "react-router-dom";


const twTheme = (light: string, dark: string) => `${light} dark:${dark}`;

const AdminDashboard: React.FC = () => {


    return (
        <>
            <HeaderAdmin />
            <div className={`flex gap-70 mt-20 ${twTheme("bg-[#E6EAF5]", "bg-gray-900")}`}>
                <AdminSidebar />
                <Outlet />

                
            </div>
        </>
    );
};

export default AdminDashboard;

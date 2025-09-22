import React, { useState } from "react";
import Header from "../Components/HeaderDash";
import AdminSidebar from "../Components/AdminSidebar";
import TopCard from "../Components/TopCard";
import RegistrationChart from "../Components/RegistrationChart";
import ActivityChart from "../Components/ActivityChart";

const twTheme = (light: string, dark: string) => `${light} dark:${dark}`;

const AdminDashboard: React.FC = () => {


    return (
        <>
            <Header />
            <div className={`flex gap-70 mt-20 ${twTheme("bg-[#E6EAF5]", "bg-gray-900")}`}>
                <AdminSidebar />

                <main className={`min-h-screen ${twTheme("", "bg-gray-900")}`}>
                    <TopCard />
                    <div className="flex gap-10">
                        <div>
                            <RegistrationChart />
                        </div>
                        <div  className="w-[400px]">
                            <ActivityChart />
                        </div>

                    </div>

                </main>
            </div>
        </>
    );
};

export default AdminDashboard;

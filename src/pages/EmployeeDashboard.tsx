import React from "react";
import Header from "../Components/HeaderDash";
import Sidebar from "../Components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const twTheme = (light: string, dark: string) => {
  return `${light} dark:${dark}`;
};

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <div className={`flex mt-20 ${twTheme("bg-[#E6EAF5]", "bg-gray-900")}`}>
        <Sidebar />
        <main className="flex-1 ml-64 p-5">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;

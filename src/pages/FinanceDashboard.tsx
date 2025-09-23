import React, { useState } from "react";
import Header from "../Components/HeaderDash";
import FinanceSidebar from "../Components/Finance/FinanceSidebar";
import Budget from "../Components/Finance/Budget";
import SpendingsChart from "../Components/Finance/Spendings";
import MissionTrends from "../Components/Finance/MissionTrends";
import BudgetAlerts from "../Components/Finance/BudgetAlerts";



const twTheme = (light: string, dark: string) => `${light} dark:${dark}`;

const FinanceDashboard: React.FC = () => {


    return (
        <>
            <Header />
            <div className={`flex gap-70 mt-20 ${twTheme("bg-[#E6EAF5]", "bg-gray-900")}`}>
                <FinanceSidebar />

                <main className={`min-h-screen ${twTheme("", "bg-gray-900")}`}>
                    <div className="">
                    <Budget />
                    </div>
                    <div className="flex ">
                        <div className="grid grid-cols-2 w-[850px]  ">
                            <div className="w-[400px]">
                                <SpendingsChart />
                            </div>
                            <div className="w-[350px]">
                                <MissionTrends />
                            </div>
                        </div>
                        <div className="w-[300px]">
                            <BudgetAlerts />
                        </div>

                    </div>


                </main>
            </div>
        </>
    );
};

export default FinanceDashboard;

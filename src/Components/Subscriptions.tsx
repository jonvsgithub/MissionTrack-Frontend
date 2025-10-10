import React from "react";
import Revenue from "./Revenue";
import Plans from "./Plans";
import FinanceSidebar from "./Finance/FinanceSidebar";
import HeaderFin from "./Finance/HeaderFin";

const Subscriptions: React.FC = () => {
  return (
    <>
    <div  className="flex min-h-screen  w-full bg-[#E6EAF5]">
      <HeaderFin/>
      <FinanceSidebar/>
      
 <main className="  space-y-6 mt-23 ml-70">
      <Revenue />
      <Plans />
    </main>

    </div>
   </>
  );
};

export default Subscriptions;

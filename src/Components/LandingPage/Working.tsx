import React from "react";
import { IoDocumentText } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsGraphUp } from "react-icons/bs";



const Working: React.FC = () => {
    return (
        <div className="flex mt-20 justify-center">
            <div className="w-full p-[120px] h-[500px]">
                {/* Header */}
                <div className="flex justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">How it works</h1>
                        <p className="text-2xl text-gray-600 p-5">
                            A simple four-step process from mission request to expense tracking
                        </p>
                    </div>
                </div>

                {/* Cards */}


                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    <div className="p-6 rounded-lg bg-white shadow-sm flex flex-col items-center gap-4 w-[250px] mx-auto">
                        <div className=" ">
                            <IoDocumentText size={50} className=" text-primaryColor-500" />
                        </div>
                        <div>
                            <h1 className="text-xl text-center font-semibold"> Request</h1>
                            <p className="text-sm text-center mt-5 text-gray-800">
                                Employee submits a mission request with all necessary details through the digital form.
                            </p>
                        </div>
                    </div>


                    <div className="p-6 rounded-lg bg-white shadow-sm flex flex-col items-center gap-4 w-[250px] mx-auto">
                        <div className=" ">
                            <FaCheck size={50} className="text-accent-500" />
                        </div>
                        <div>
                            <h1 className="text-xl text-center font-semibold">Approval</h1>
                            <p className="text-sm mt-5 text-center text-gray-800">
                                Manager reviews the request and approves or denies with optional feedback. 
                            </p>
                        </div>
                    </div>


                    <div className="p-6 rounded-lg bg-white shadow-sm flex flex-col items-center gap-4 w-[250px] mx-auto">
                        <div className="">
                             <RiMoneyDollarCircleLine  size={50} className="" />
                        </div>
                        <div>
                            <h1 className="text-xl text-center font-semibold">Finance</h1>
                            <p className="text-sm mt-5 text-center text-gray-800">
                                Finance department processes approved requests and allocates necessary funds 
                            </p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="p-6 rounded-lg bg-white shadow-sm flex flex-col items-center gap-4 w-[250px] mx-auto">
                        <div className=" ">
                             <BsGraphUp size={50} className="text-[#FFB361]" />
                        </div>
                        <div>
                            <h1 className="text-xl text-center font-semibold">Tracking</h1>
                            <p className="text-sm mt-5 text-center text-gray-600">
                               Expenses are tracked in real-time as the employee completes their mission
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Working;

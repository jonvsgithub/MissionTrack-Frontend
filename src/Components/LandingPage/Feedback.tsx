
import React from "react";
import { FaStar } from "react-icons/fa6";



const Feedback: React.FC = () => {
    return (
        <div className="flex  justify-center">
            <div className=" w-full  bg-primaryColor-600  p-[120px] h-[600px]">
                {/* Header */}
                <div className="flex justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-3xl font-bold">What Our Users Say</h1>
                        <p className="  mt-5">
                           Trusted by companies of all sizes to streamline their mission management
                        </p>
                    </div>
                </div>

                {/* Cards */}


                <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <div className="p-6  bg-white rounded-lg shadow-sm flex flex-col items-start gap-4 w-[320px] mx-auto">
                       
                        <div className="flex flex-col items-start">
                            {/* Stars Row */}
                            <div className="flex space-x-1">
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-sm mt-5 text-start text-gray-800">
                                MissionFlow has transformed how we handle business trips. What used to take days now takes minutes, and the expense tracking is phenomenal.
                            </p>
                        </div>
                          <div className="flex justify-between gap-5 mt-7">
                                <img src="src/assets/Ellipse 41.png" alt="" />
                                <div className="mt-2">
                                <h1 className="text-sm">Kimberly Mast</h1>
                                <p className="text-xs">CEO , Cute RITE</p>
                                </div>
                            </div>

                    </div>


                    <div className="p-6  bg-white rounded-lg shadow-sm flex flex-col items-start gap-4 w-[320px] mx-auto">
                      
                        <div className="flex flex-col items-start">
                            {/* Stars Row */}
                            <div className="flex space-x-1">
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-sm mt-5 text-start text-gray-800">
                                MissionFlow has transformed how we handle business trips. What used to take days now takes minutes, and the expense tracking is phenomenal.
                            </p>
                            <div className="flex justify-between gap-5 mt-7">
                                <img src="src/assets/Ellipse 41.png" alt="" />
                                <div className="mt-2">
                                <h1 className="text-sm">Kimberly Mast</h1>
                                <p className="text-xs">CEO , Cute RITE</p>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="p-6 bg-white rounded-lg shadow-sm flex flex-col items-start gap-4 w-[320px] mx-auto">
                        
                        <div className="flex flex-col items-start">
                            {/* Stars Row */}
                            <div className="flex space-x-1">
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-sm mt-5 text-start text-gray-800">
                                MissionFlow has transformed how we handle business trips. What used to take days now takes minutes, and the expense tracking is phenomenal.
                            </p>
                        </div>
                          <div className="flex justify-between gap-5 mt-7">
                                <img src="src/assets/Ellipse 41.png" alt="" />
                                <div className="mt-2">
                                <h1 className="text-sm">Kimberly Mast</h1>
                                <p className="text-xs">CEO , Cute RITE</p>
                                </div>
                            </div>

                    </div>


                </div>
            </div>
        </div>
    );
};

export default Feedback;

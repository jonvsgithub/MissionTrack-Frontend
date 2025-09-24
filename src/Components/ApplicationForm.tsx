
import React from "react";
import ApplicationFormRight from "./ApplicationFormRight";

const ApplicationForm: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-primaryColor-10 via-primaryColor-10 to-accent-10 flex justify-center gap-20 w-full">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-10">
        <h1 className="text-accent-800 text-3xl text-center font-bold mb-10">
          Enter Your Contacts and <br /> Organization Info for Registration
        </h1>
        <img
          src="bro.png"
          alt="illustration"
          className="w-60 sm:w-80 md:w-96 mt-20"
        />
      </div>

      {/* Right Side (separate component) */}
      <ApplicationFormRight />
    </div>
  );
};

export default ApplicationForm;

import React from "react";
import { FaCheck } from "react-icons/fa";

const Pricing: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full p-[120px]">
        {/* Header */}
        <div className="flex justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Simple, Transparent Pricing</h1>
            <p className="text-2xl text-gray-600 mt-5">
              Choose the plan that fits your organization's needs.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Basic Plan */}
          <div className="p-6 rounded-lg bg-white shadow-sm flex flex-col items-center gap-6 w-[300px] mx-auto">
            <div className="flex flex-col gap-5 items-start w-full">
              <h1 className="text-2xl font-bold">Basic</h1>
              <p className="text-sm text-gray-800">
                Perfect for small teams and startups
              </p>
              <h1 className="text-2xl font-bold text-gray-800">
                RF <span className="text-3xl">40,000</span>
              </h1>
              <div className="flex gap-2">
                <FaCheck size={20} className="text-accent-500" />
                <p className="text-sm text-gray-800">
                  Up to 15 mission request per month
                </p>
              </div>
              <div className="flex gap-2">
                <FaCheck size={20} className="text-accent-500" />
                <p className="text-sm text-gray-800">Basic approval workflow</p>
              </div>
              <div className="flex gap-2">
                <FaCheck size={20} className="text-accent-500" />
                <p className="text-sm text-gray-800">Standard reporting</p>
              </div>
              <div className="flex gap-2">
                <FaCheck size={20} className="text-accent-500" />
                <p className="text-sm text-gray-800">Email support</p>
              </div>
            </div>
            <button className="bg-white text-accent-700 mt-20 border border-accent-700 rounded-lg px-20 py-1">
              Get Started
            </button>
          </div>

          {/* Standard Plan - Most Popular */}
          <div className="relative p-6 rounded-lg bg-white shadow-md flex flex-col items-center gap-6 h-[520px] w-[320px] mx-auto transform scale-105 ">
            {/* Most Popular Badge */}
            <div className="absolute top-4 right-4">
              <h1 className="bg-accent-500 text-sm px-2 py-1 rounded-lg text-white">
                Most Popular
              </h1>
            </div>

            <div className="flex flex-col gap-5 items-start w-full mt-8">
              <h1 className="text-2xl font-bold">Standard</h1>
              <p className="text-sm text-gray-800">
                Ideal for growing organization
              </p>
              <h1 className="text-2xl font-bold text-gray-800">
                RF <span className="text-3xl">80,000</span>
              </h1>
              <div className="flex gap-2">
                <FaCheck size={20} className="text-accent-500" />
                <p className="text-sm text-gray-800">
                  Up to 40 mission request per month
                </p>
              </div>
              <div className="flex gap-2">
                <FaCheck size={20} className="text-accent-500" />
                <p className="text-sm text-gray-800">
                  Advanced reporting & analytics
                </p>
              </div>
              <div className="flex gap-2">
                <FaCheck size={20} className="text-accent-500" />
                <p className="text-sm text-gray-800">
                  Custom approval workflows
                </p>
              </div>
              <div className="flex gap-2">
                <FaCheck size={20} className="text-accent-500" />
                <p className="text-sm text-gray-800">Priority support</p>
              </div>
            </div>
            <button className="bg-primaryColor-800 text-white border border-accent-700 mt-20  rounded-lg px-20 py-1">
              Get Started
            </button>
          </div>

          {/* Premium Plan */}
          <div className="p-6 rounded-lg bg-white shadow-sm flex flex-col items-center gap-6 w-[300px] mx-auto">
            <div className="flex flex-col gap-5 items-start w-full">
              <h1 className="text-2xl font-bold">Premium</h1>
              <p className="text-sm text-gray-800">
                Best for large organizations
              </p>
              <h1 className="text-2xl font-bold text-gray-800">
                RF <span className="text-3xl">120,000</span>
              </h1>
              <div className="flex gap-2">
                <FaCheck size={20} className="text-accent-500" />
                <p className="text-sm text-gray-800">
                  Unlimited mission requests
                </p>
              </div>
              <div className="flex gap-2">
                <FaCheck size={20} className="text-accent-500" />
                <p className="text-sm text-gray-800">
                  Dedicated account manager
                </p>
              </div>
              <div className="flex gap-2">
                <FaCheck size={20} className="text-accent-500" />
                <p className="text-sm text-gray-800">Custom integrations</p>
              </div>
              <div className="flex gap-2">
                <FaCheck size={20} className="text-accent-500" />
                <p className="text-sm text-gray-800">24/7 premium support</p>
              </div>
            </div>
            <button className="bg-white text-accent-700 border border-accent-700 rounded-lg px-20 mt-20 py-1">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

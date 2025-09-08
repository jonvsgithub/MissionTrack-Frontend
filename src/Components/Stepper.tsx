
import React from "react";
import { FaCheck } from "react-icons/fa";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-8 mt-6">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={index} className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300
                ${isCompleted ? "bg-accent-500 text-white border-accent-500" : ""}
                ${isActive ? "border-accent-500 text-accent-600" : "border-gray-300 text-gray-400"}
              `}
            >
              {isCompleted ? <FaCheck size={14} /> : index + 1}
            </div>
            <span
              className={`text-sm ${isActive ? "text-accent-600 font-semibold" : "text-gray-500"}`}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <div className="w-12 h-[2px] bg-gray-300 mx-2"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;

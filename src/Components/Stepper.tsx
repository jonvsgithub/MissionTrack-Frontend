import React from "react";
import { FaCheck } from "react-icons/fa";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center my-6">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <React.Fragment key={index}>
            {/* Step Container */}
            <div className="flex flex-col items-center gap-2">
              {/* Circle Indicator */}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 font-semibold
                  ${isCompleted ? "bg-green-600 text-white border-green-600" : ""}
                  ${isActive ? "border-green-600 bg-green-50 text-green-600" : ""}
                  ${!isActive && !isCompleted ? "border-gray-300 bg-white text-gray-400" : ""}
                `}
              >
                {isCompleted ? <FaCheck size={16} /> : index + 1}
              </div>

              {/* Label */}
              <span
                className={`text-xs font-medium whitespace-nowrap
                  ${isActive ? "text-green-600" : "text-gray-500"}
                `}
              >
                {step}
              </span>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="flex items-center mb-6">
                <div
                  className={`h-0.5 w-16 sm:w-24 transition-all duration-300
                    ${index < currentStep ? "bg-green-600" : "bg-gray-300"}
                  `}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;

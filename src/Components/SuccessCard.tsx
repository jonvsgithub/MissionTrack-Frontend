import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";

interface SuccessCardProps {
  onClose: () => void;
}

const SuccessCard: React.FC<SuccessCardProps> = ({ onClose }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white text-center">
      <h2 className="text-3xl font-bold text-gray-900">Success!</h2>
      <div className="mt-6">
        <BsCheckCircleFill className="h-20 w-20 text-green-500" />
      </div>
      <p className="mt-6 text-sm text-gray-600">
        Application submitted successfully, we'll contact you soon.
      </p>
      <button
        onClick={onClose}
        className="mt-8 rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-green-600"
      >
        Back to Home
      </button>
    </div>
  );
};

export default SuccessCard;

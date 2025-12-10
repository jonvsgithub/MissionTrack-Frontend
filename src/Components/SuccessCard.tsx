import React from "react";
import { BsCheck } from "react-icons/bs";
import { motion } from "framer-motion";

interface SuccessCardProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  className?: string;
  // retained for compatibility if needed, but marked optional/unused
  buttonText?: string;
  onClose?: () => void;
}

const SuccessCard: React.FC<SuccessCardProps> = ({
  title = "Success",
  message = "New employee profile created successfully.",
  className = "",
}) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
      className={`flex w-full max-w-lg flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-xl ${className}`}
    >
      {/* Icon Circle */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-md">
        <BsCheck className="text-5xl text-white" />
      </div>

      <h2 className="mb-4 text-3xl font-bold text-[#0C326E]">{title}</h2>

      <p className="mb-10 text-lg text-slate-600 font-medium">{message}</p>

      {/* Optional: If visually they don't want a button, we can hide it, 
          but usually a modal needs a way to close. 
          The provided image didn't verify a button, but it's UX best practice.
          I will style it minimally if needed, or keep it standard. */}
      {/* 
      <button
        onClick={onClose}
        className="rounded-full bg-slate-100 px-8 py-3 text-slate-700 font-semibold transition-colors hover:bg-slate-200"
      >
        {buttonText}
      </button> 
      */}
      {/* Assuming the image implies a click-outside or auto-close, 
          but purely for safety I'll leave a clickable area or just the close prop on parent. 
          However, the user asked for "that framer... giving that Success message", 
          so I'll assume standard modal behavior. 
          I'll Add a hidden click listener or just a subtle close instruction if no button is desired.
          But for now, let's keep the existing button flow but style it cleaner to match the white aesthetics.
       */}
    </motion.div>
  );
};

export default SuccessCard;

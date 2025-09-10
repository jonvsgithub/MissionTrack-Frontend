// src/components/Input.tsx
import React, { forwardRef, type ReactNode } from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  icon?: ReactNode; // 👈 support for an icon
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, error, icon, className, ...props }, ref) => {
    const errorId = `${name}-error`;

    return (
      <div className="mb-4 w-full">
        <label
          htmlFor={name}
          className="block font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
        <div className="relative">
          {icon && (
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              {icon}
            </span>
          )}
          <input
            id={name}
            name={name}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error
                ? "border-red-500 ring-red-200"
                : "border-gray-300 ring-blue-200"
            } ${icon ? "pl-10" : ""} ${className || ""}`}
            {...props}
          />
        </div>
        {error && (
          <p id={errorId} className="text-red-500 text-sm mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

import React from "react";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
    return (
        <label className="flex text-gray-700 items-center gap-2">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="form-checkbox  accent-primaryColor-500"
            />
            <span>{label}</span>
        </label>
    );
};

export default Checkbox;
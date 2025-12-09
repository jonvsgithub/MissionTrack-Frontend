import React, { useState } from "react";
import Input from "./Input";
import { FiUser } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { FaBell, FaCalendar } from "react-icons/fa";

const Password: React.FC = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = () => {
    const newErrors: typeof errors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (formData.confirmNewPassword !== formData.newPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Password updated:", formData);
      // 🔑 Submit to backend here
    }
  };

  return (
    <div className="h-[500px] w-[1300px] mt-10 flex bg-[rgba(236,244,241,0.9)] rounded-md shadow">
      <div className="flex flex-col w-full">
        {/* Top navigation */}
        <div className="border-b border-gray-300 w-full">
          <div className="h-15 py-5">
            <div className="flex gap-15">
              <a className="flex items-center gap-1 border-b-2 p-2 border-transparent hover:border-blue-600 transition-all duration-300 -mb-[2px]">
                <FiUser size={20} />
                <span>Personal Information</span>
              </a>

              <a className="flex items-center gap-1 border-b-2 p-2 border-transparent hover:border-blue-600 transition-all duration-300 -mb-[2px]">
                <MdLockOutline size={20} />
                <span>Password</span>
              </a>

              <a className="flex items-center gap-1 border-b-2 p-2 border-transparent hover:border-blue-600 transition-all duration-300 -mb-[2px]">
                <FaBell size={20} />
                <span>Notifications</span>
              </a>

              <a className="flex items-center gap-1 border-b-2 p-2 border-transparent hover:border-blue-600 transition-all duration-300 -mb-[2px]">
                <FaCalendar size={20} />
                <span>Calendar</span>
              </a>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="p-4 flex justify-between">
          <h1 className="text-xl font-semibold">Change Password</h1>
         
        </div>

        {/* Password fields */}
        <div className="p-5 w-1/2 flex flex-col gap-3">
          <Input
            label="Current Password"
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Enter current password"
            error={errors.currentPassword}
          />

          <Input
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            error={errors.newPassword}
          />
        
          <Input
            label="Confirm New Password"
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            error={errors.confirmNewPassword}
          />
           <button
            onClick={handleSubmit}
            className="mt-3 px-4 py-2 rounded bg-blue-600 text-white"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Password;

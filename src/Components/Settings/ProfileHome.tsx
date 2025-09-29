import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import Input from "../Input";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

interface DecodedToken {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  role?: string;
  exp: number;
}

const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    role?: string;
  }>({});

  // 👇 decode token and set user info
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setFormData({
          fullName: decoded.fullName || "",
          email: decoded.email || "",
          phoneNumber: decoded.phoneNumber || "",
          role: decoded.role || "",
        });
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = () => {
    const newErrors: typeof errors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Updated profile:", formData);
      // dispatch(updateProfile(formData)) or API call here
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="p-4 flex justify-between">
        <h1 className="text-xl font-semibold">Personal Information</h1>
       
      </div>

      <div className="p-5 grid grid-cols-2 gap-6">
        <Input
          label="Full Names"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your name"
          error={errors.fullName}
          icon={<FiUser />}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          error={errors.email}
          icon={<FaEnvelope />}
        />
      </div>

      <div className="p-5 grid grid-cols-2 gap-6">
        <Input
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="0788888888"
          error={errors.phoneNumber}
          icon={<FaPhoneAlt />}
        />
      </div>
       <button
          onClick={handleSubmit}
          className="px-4 py-2 flex justify-center rounded w-[200px] bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { FiUser } from "react-icons/fi";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { RootState, AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { clearActionState, updatedProfile } from "../../redux/profileSlice";
import { useAuth } from "../../context/AuthContext";

interface DecodedToken {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  role?: string;
  profilePhoto?: string;
  exp: number;
}

const ProfileHome: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, setUser } = useAuth();
  const { loading, error } = useSelector((state: RootState) => state.profile);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "",
    department: "",
    position: "",
    bankAccount: "",
  });

  const [originalData, setOriginalData] = useState(formData);
  const [isEditing, setIsEditing] = useState(false);

  // Load user info from token or context
  useEffect(() => {
    if (user) {
      const userData = {
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        role: user.role || "",
        department: "Sales", // Mock data
        position: "Sales Manager", // Mock data
        bankAccount: "",
      };
      setFormData(userData);
      setOriginalData(userData);
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode<DecodedToken>(token);
          const userData = {
            fullName: decoded.fullName || "",
            email: decoded.email || "",
            phoneNumber: decoded.phoneNumber || "",
            role: decoded.role || "",
            department: "Sales",
            position: "Sales Manager",
            bankAccount: "",
          };
          setFormData(userData);
          setOriginalData(userData);
        } catch (err) {
          console.error("Invalid token:", err);
        }
      }
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("bankAccount", formData.bankAccount);

      const updatedUser = await dispatch(updatedProfile(formDataToSend)).unwrap();
      setOriginalData(formData);
      setIsEditing(false);
      setUser((prev) => ({ ...prev, ...updatedUser }));
      localStorage.setItem("user", JSON.stringify({ ...user, ...updatedUser }));
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
    dispatch(clearActionState());
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div>
      {/* Header with Edit Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
        <button
          onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
          className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-medium transition-all"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Avatar */}
      <div className="flex justify-start mb-8">
        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
          {getInitials(formData.fullName || "FN")}
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-6">
        {/* Full Names */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Names
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Label Lorem ipsum"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
            />
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            disabled
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <FaPhoneAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="+250 788 888 888"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
            />
          </div>
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department
          </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            disabled
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="employee@gmail.com"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
            />
          </div>
        </div>

        {/* Position */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Position
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            disabled
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
          />
        </div>

        {/* Bank Account - Full Width */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bank Account
          </label>
          <input
            type="text"
            name="bankAccount"
            value={formData.bankAccount}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="1234 456 678 890"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
          />
        </div>
      </div>

      {/* Save Button - Only show when editing */}
      {isEditing && (
        <div className="mt-6">
          {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
          <button
            onClick={handleSave}
            disabled={loading}
            className={`px-8 py-2.5 rounded-lg font-medium transition-all ${loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileHome;

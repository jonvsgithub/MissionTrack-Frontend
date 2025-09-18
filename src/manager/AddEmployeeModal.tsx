import React, { useState } from "react";
import Input from "../Components/Input";
import SuccessCard from "../Components/SuccessCard";

interface AddEmployeeModalProps {
  onClose: () => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullNames: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    position: "",
    password: "",
    bankAccount: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Basic validation
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullNames.trim()) newErrors.fullNames = "Full names are required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    if (!formData.department.trim()) newErrors.department = "Department is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    if (!formData.password.trim() || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.bankAccount.trim()) newErrors.bankAccount = "Bank account is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("✅ Employee data:", formData);
      setSuccess(true); // ✅ Show success card instead of closing immediately
    }
  };

  return (
    <div className="fixed mt-20 inset-0 bg-gray-600/70 bg-opacity-50 overflow-y-auto w-full flex items-center justify-center">
      <div className="relative p-8 bg-white w-96 md:w-[600px] mx-auto rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-2xl font-semibold text-[#0C326E]">
            Add a new employee
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        {/* Success State */}
        {success ? (
          <SuccessCard
            title="Employee Added!"
            message="The new employee has been successfully registered."
            buttonText="Back"
            onClose={onClose}
          />
        ) : (
          /* Form */
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Full Names"
              type="text"
              name="fullNames"
              value={formData.fullNames}
              onChange={handleChange}
              error={errors.fullNames}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Role"
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                error={errors.role}
              />
              <Input
                label="Department"
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                error={errors.department}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Position"
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                error={errors.position}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
            </div>

            <Input
              label="Bank Account"
              type="text"
              name="bankAccount"
              value={formData.bankAccount}
              onChange={handleChange}
              error={errors.bankAccount}
            />

            {/* Actions */}
            <div className="pt-4 flex justify-center space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center px-8 py-2 border border-red-300 rounded-2xl shadow-sm text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-8 py-2 rounded-2xl text-sm font-medium text-white bg-accent-600 hover:bg-accent-700"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddEmployeeModal;

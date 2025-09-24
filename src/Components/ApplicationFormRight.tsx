import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../redux/store";
import { registerCompany } from "../redux/companySlice";

import Input from "./Input";
import Select from "./Select";
import Stepper from "./Stepper";
import DragDrop from "./DragDrop";
import Checkbox from "./Checkbox";

// ------------------- Constants -------------------
const provinces = ["Kigali", "Northern", "Southern", "Eastern", "Western"];

const districts: Record<string, string[]> = {
  Kigali: ["Gasabo", "Kicukiro", "Nyarugenge"],
  Northern: ["Musanze", "Gicumbi", "Burera"],
  Southern: ["Huye", "Nyanza", "Muhanga"],
  Eastern: ["Rwamagana", "Nyagatare", "Kayonza"],
  Western: ["Rusizi", "Rubavu", "Nyamasheke"],
};

const sectors: Record<string, string[]> = {
  Gasabo: ["Gikomero", "Kacyiru", "Kimironko"],
  Kicukiro: ["Nyarutarama", "Kanombe", "Gahanga"],
  Nyarugenge: ["Nyamirambo", "Kimisagara", "Muhima"],
  Musanze: ["Musanze", "Muhoza", "Kinigi"],
};

const ApplicationFormRight: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, success, error, message } = useSelector(
    (state: RootState) => state.company
  );

  const [formData, setFormData] = useState<any>({
    organizationName: "",
    companyEmail: "",
    companyPhoneNumber: "",
    province: "",
    district: "",
    sector: "",
    person: "",
    phone: "",
    email: "",
    password: "",
    agree: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [step, setStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // ------------------- Handlers -------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleFileRemove = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (step === 0) {
      if (!formData.organizationName)
        newErrors.organizationName = "Organization name is required";
      if (!formData.province) newErrors.province = "Province is required";
      if (!formData.district) newErrors.district = "District is required";
      if (!formData.sector) newErrors.sector = "Sector is required";
      if (!formData.companyEmail)
        newErrors.companyEmail = "Company email is required";
      if (!formData.companyPhoneNumber)
        newErrors.companyPhoneNumber = "Company phone number is required";
    }

    if (step === 1) {
      if (!formData.person) newErrors.person = "Contact Person is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
      if (uploadedFiles.length === 0)
        newErrors.files = "Please upload at least one file";
      if (!formData.agree) newErrors.agree = "You must agree to continue";
    }

    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validateStep();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setStep(step + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep(step - 1);
  };

  // ------------------- Submit -------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateStep();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      ...formData,
      files: uploadedFiles,
    };

    dispatch(registerCompany(payload));
  };

  return (
    <div className="flex flex-col items-center justify-start pt-10">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[600px] min-h-screen flex flex-col">
        {/* Success / Error */}
        {success && (
          <div className="bg-green-100 text-green-800 p-4 rounded mb-4 text-center">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {/* Stepper */}
        <div className="max-w-md mx-auto mb-4">
          <Stepper
            steps={["Company Info", "Representative", "Confirmation"]}
            currentStep={step}
          />
        </div>

        {/* Multi-Step Form */}
        <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
          {/* --- Step 0: Company Info --- */}
          {step === 0 && (
            <>
              <h2 className="text-xl mb-4">Company/Organization’s Information</h2>
              <Input
                label="Organization Name"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                error={errors.organizationName}
              />
              <Input
                label="Company Email"
                name="companyEmail"
                type="email"
                value={formData.companyEmail}
                onChange={handleChange}
                error={errors.companyEmail}
              />
              <Input
                label="Company Phone Number"
                name="companyPhoneNumber"
                value={formData.companyPhoneNumber}
                onChange={handleChange}
                error={errors.companyPhoneNumber}
              />
              <Select
                label="Province"
                name="province"
                value={formData.province}
                options={provinces}
                onChange={handleChange}
                error={errors.province}
              />
              <Select
                label="District"
                name="district"
                value={formData.district}
                options={districts[formData.province] || []}
                onChange={handleChange}
                error={errors.district}
              />
              <Select
                label="Sector"
                name="sector"
                value={formData.sector}
                options={sectors[formData.district] || []}
                onChange={handleChange}
                error={errors.sector}
              />
            </>
          )}

          {/* --- Step 1: Representative --- */}
           {step === 1 && (
              <>
                <Input
                  label="Contact Person"
                  name="person"
                  value={formData.person}
                  onChange={handleChange}
                  placeholder="Enter contact person name"
                  error={errors.person}
                />

                <Input
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  type="tel"
                  error={errors.phone}
                />

                <Input
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  type="email"
                  error={errors.email}
                />

                <Input
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  type="password"
                  error={errors.password}
                />

                <Checkbox
                  label="I agree to the Terms & Conditions"
                  checked={formData.agree}
                  onChange={(e) =>
                    setFormData({ ...formData, agree: e.target.checked })
                  }
                />
                {errors.agree && (
                  <p className="text-red-500 text-sm">{errors.agree}</p>
                )}
              </>
            )}

          {/* --- Step 2: Confirmation --- */}
          {step === 2 && (
            <>
              <h2 className="text-xl mb-4">Confirm Your Details</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Organization Name:</strong> {formData.organizationName}</p>
                <p><strong>Company Email:</strong> {formData.companyEmail}</p>
                <p><strong>Company Phone:</strong> {formData.companyPhoneNumber}</p>
                <p><strong>Province:</strong> {formData.province}</p>
                <p><strong>District:</strong> {formData.district}</p>
                <p><strong>Sector:</strong> {formData.sector}</p>
                <p><strong>Contact Person:</strong> {formData.person}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Files Uploaded:</strong> {uploadedFiles.length}</p>
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            {step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Back
              </button>
            )}
            {step < 2 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-primaryColor-700 text-white rounded-lg hover:bg-primaryColor-800"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-primaryColor-700 text-white rounded-lg hover:bg-primaryColor-800"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationFormRight;


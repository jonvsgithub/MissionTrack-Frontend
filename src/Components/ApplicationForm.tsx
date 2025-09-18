// src/components/ApplicationForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "./Input";
import Select from "./Select";
import Checkbox from "./Checkbox";
import SuccessCard from "./SuccessCard";
import Stepper from "./Stepper";
import { useCreateCompanyMutation } from "../app/api/company";

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

const orgTypes = ["Non-profit", "Startup", "Corporate", "Governmental"];

// ------------------- Component -------------------
const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // ------------------- State -------------------
  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    phone: "",
    person: "",
    province: "",
    district: "",
    sector: "",
    organizationType: "",
    companyEmail: "",
    companyPhoneNumber: "",
    agree: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(0);

  const [createCompany, { isLoading }] = useCreateCompanyMutation();

  // ------------------- Handlers -------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (step === 0) {
      if (!formData.organizationName)
        newErrors.organizationName = "Organization name is required";
      if (!formData.province) newErrors.province = "Province is required";
      if (!formData.district) newErrors.district = "District is required";
      if (!formData.sector) newErrors.sector = "Sector is required";
      if (!formData.organizationType)
        newErrors.organizationType = "Organization type is required";
      if (!formData.companyEmail)
        newErrors.companyEmail = "Company email is required";
      if (!formData.companyPhoneNumber)
        newErrors.companyPhoneNumber = "Company phone number is required";
    }

    if (step === 1) {
      if (!formData.person) newErrors.person = "Contact Person is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (!formData.email) newErrors.email = "Email is required";
    }

    if (step === 2) {
      if (!formData.agree)
        newErrors.agree = "You must agree to the terms & conditions";
    }

    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validateStep();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateStep();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await createCompany(formData).unwrap();
      setSuccess(true);
    } catch (err) {
      console.error("Submission error:", err);
      setErrors({ api: "Failed to submit form. Please try again." });
    }
  };

  // ------------------- Render -------------------
  return (
    <div className="min-h-screen bg-gradient-to-r from-primaryColor-10 via-primaryColor-10 to-accent-10 flex justify-center gap-20 w-full">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-10">
        <h1 className="text-accent-800 text-3xl text-center font-bold mb-10">
          Enter Your Contacts and <br /> Organization Info for Registration
        </h1>
        <img src="bro.png" alt="illustration" className="w-96" />
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-center justify-start pt-10">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
          {success ? (
            <SuccessCard
              title="Success!"
              message="Application submitted successfully, we'll contact you soon."
              buttonText="Back to Home"
              onClose={() => navigate("/")}
            />
          ) : (
            <>
              {/* Stepper */}
              <div className="max-w-md mx-auto">
                <Stepper
                  steps={["Company Info", "Representative", "Confirmation"]}
                  currentStep={step}
                />
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4 mt-6">
                {/* Step 0 */}
                {step === 0 && (
                  <div className="rounded-2xl border p-6 space-y-4">
                    <Input
                      label="Organization Name"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleChange}
                      placeholder="Enter organization name"
                      error={errors.organizationName}
                    />

                    {/* Location */}
                    <div className="grid grid-cols-3 gap-4">
                      <Select
                        label="Province"
                        name="province"
                        value={formData.province}
                        options={provinces}
                        placeholder="Province"
                        onChange={handleChange}
                        error={errors.province}
                      />

                      <Select
                        label="District"
                        name="district"
                        value={formData.district}
                        placeholder="District"
                        options={
                          formData.province ? districts[formData.province] : []
                        }
                        onChange={handleChange}
                        error={errors.district}
                      />

                      <Select
                        label="Sector"
                        name="sector"
                        value={formData.sector}
                        placeholder="Sector"
                        options={
                          formData.district && sectors[formData.district]
                            ? sectors[formData.district]
                            : []
                        }
                        onChange={handleChange}
                        error={errors.sector}
                      />
                    </div>

                    {/* Company Contact */}
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Company Email"
                        name="companyEmail"
                        type="email"
                        value={formData.companyEmail}
                        onChange={handleChange}
                        placeholder="Enter company email"
                        error={errors.companyEmail}
                      />
                      <Input
                        label="Phone Number"
                        name="companyPhoneNumber"
                        value={formData.companyPhoneNumber}
                        onChange={handleChange}
                        placeholder="Enter company phone number"
                        error={errors.companyPhoneNumber}
                      />
                    </div>

                    <div>
                      
                    </div>
                  </div>
                )}

                {/* Step 1 */}
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
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
                    </div>

                    <Input
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      type="email"
                      error={errors.email}
                    />
                  </>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-bold mb-2">Review your details:</h3>
                      <ul className="text-sm space-y-1">
                        <li>
                          <strong>Organization:</strong>{" "}
                          {formData.organizationName}
                        </li>
                        <li>
                          <strong>Location:</strong> {formData.province},{" "}
                          {formData.district}, {formData.sector}
                        </li>
                        <li>
                          <strong>Type:</strong> {formData.organizationType}
                        </li>
                        <li>
                          <strong>Representative:</strong> {formData.person}
                        </li>
                        <li>
                          <strong>Phone:</strong> {formData.phone}
                        </li>
                        <li>
                          <strong>Email:</strong> {formData.email}
                        </li>
                      </ul>
                    </div>

                    <div>
                      <Checkbox
                        label="I agree to the Terms & conditions"
                        checked={formData.agree}
                        onChange={(e) =>
                          setFormData({ ...formData, agree: e.target.checked })
                        }
                      />
                      {errors.agree && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.agree}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* API Error */}
                {errors.api && (
                  <p className="text-red-500 text-sm mt-2 text-center">
                    {errors.api}
                  </p>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-4">
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
                      className="ml-auto px-4 py-2 bg-primaryColor-700 text-white rounded-lg hover:bg-primaryColor-800"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="ml-auto px-4 py-2 bg-primaryColor-700 text-white rounded-lg hover:bg-primaryColor-800 disabled:opacity-50"
                    >
                      {isLoading ? "Submitting..." : "Submit"}
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;

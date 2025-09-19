// src/components/ApplicationForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "./Input";
import Select from "./Select";
import Stepper from "./Stepper";
import DragDrop from "./DragDrop";

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
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [step, setStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [submitMessage, setSubmitMessage] = useState(""); // Message after Submit

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
      if (!formData.organizationName) newErrors.organizationName = "Organization name is required";
      if (!formData.province) newErrors.province = "Province is required";
      if (!formData.district) newErrors.district = "District is required";
      if (!formData.sector) newErrors.sector = "Sector is required";
      if (!formData.companyEmail) newErrors.companyEmail = "Company email is required";
      if (!formData.companyPhoneNumber) newErrors.companyPhoneNumber = "Company phone number is required";
    }

    if (step === 1) {
      if (!formData.person) newErrors.person = "Contact Person is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
      if (uploadedFiles.length === 0) newErrors.files = "Please upload at least one file";
    }

    // Step 2 is review only → no validation
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

    // Instead of success card, show message at top
    setSubmitMessage("Application submitted successfully! We'll contact you soon.");
  };

  // ------------------- Render -------------------
  return (
    <div className="min-h-screen bg-gradient-to-r from-primaryColor-10 via-primaryColor-10 to-accent-10 flex justify-center gap-20 w-full">
      {/* ------------------- Left Side ------------------- */}
      <div className="flex flex-col justify-center items-center p-10">
        <h1 className="text-accent-800 text-3xl text-center font-bold mb-10">
          Enter Your Contacts and <br /> Organization Info for Registration
        </h1>
        <img src="bro.png" alt="illustration" className="w-96" />
      </div>

      {/* ------------------- Right Side ------------------- */}
      <div className="flex flex-col items-center justify-start pt-10">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-[600px] min-h-screen flex flex-col">

          {/* ------------------- Submit Message ------------------- */}
          {submitMessage && (
            <div className="bg-green-100 text-green-800 p-4 rounded mb-4 text-center">
              {submitMessage}
            </div>
          )}

          {/* ------------------- Stepper ------------------- */}
          <div className="max-w-md mx-auto mb-4">
            <Stepper
              steps={["Company Info", "Representative", "Confirmation"]}
              currentStep={step}
            />
          </div>

          {/* ------------------- Multi-Step Form ------------------- */}
          <form onSubmit={handleSubmit} className="grid gap-4">
            
            {/* ------------------- Step 0 ------------------- */}
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
                    options={formData.province ? districts[formData.province] : []}
                    placeholder="District"
                    onChange={handleChange}
                    error={errors.district}
                  />
                  <Select
                    label="Sector"
                    name="sector"
                    value={formData.sector}
                    options={formData.district && sectors[formData.district] ? sectors[formData.district] : []}
                    placeholder="Sector"
                    onChange={handleChange}
                    error={errors.sector}
                  />
                </div>

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
                    label="Company Phone"
                    name="companyPhoneNumber"
                    value={formData.companyPhoneNumber}
                    onChange={handleChange}
                    placeholder="Enter company phone number"
                    error={errors.companyPhoneNumber}
                  />
                </div>

                {/* DragDrop */}
                <div className="border mt-5 rounded-2xl p-6">
                  <div className="resize-y overflow-auto min-h-[150px] border-2 border-dashed border-gray-400 rounded-md">
                    <DragDrop onFileSelect={(files) => setUploadedFiles([...uploadedFiles, ...files])} />
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <h4 className="font-medium text-sm text-gray-700">Uploaded Files:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {uploadedFiles.map((file, idx) => (
                          <li key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span>{file.name}</span>
                            <button type="button" onClick={() => handleFileRemove(idx)} className="text-red-500 text-xs hover:underline">Remove</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {errors.files && <p className="text-red-500 text-sm">{errors.files}</p>}
                </div>
              </div>
            )}

            {/* ------------------- Step 1 ------------------- */}
            {step === 1 && (
              <div className="gap-4">
                <Input label="Contact Person" name="person" value={formData.person} onChange={handleChange} placeholder="Enter contact person" error={errors.person} />
                <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" type="tel" error={errors.phone} />
                <Input label="Email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" type="email" error={errors.email} />
                <Input label="Password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" type="password" error={errors.password} />
              </div>
            )}

            {/* ------------------- Step 2 - Review ------------------- */}
            {step === 2 && (
              <div className="bg-gray-50 rounded-lg p-4 overflow-auto max-h-[600px]">
                <h3 className="font-bold mb-2">Review your details:</h3>
                <ul className="text-sm space-y-1">
                  <li><strong>Organization Name:</strong> {formData.organizationName}</li>
                  <li><strong>Location:</strong> {formData.province}, {formData.district}, {formData.sector}</li>
                  <li><strong>Representative Name:</strong> {formData.person}</li>
                  <li><strong>Representative Phone:</strong> {formData.phone}</li>
                  <li><strong>Representative Email:</strong> {formData.email}</li>
                  <li><strong>Company Email:</strong> {formData.companyEmail}</li>
                  <li><strong>Company Phone:</strong> {formData.companyPhoneNumber}</li>
                  <li><strong>Password:</strong> {formData.password ? "********" : ""}</li>
                  <li>
                    <strong>Uploaded Files:</strong>
                    <ul className="ml-4 list-disc">
                      {uploadedFiles.map((file, idx) => <li key={idx}>{file.name}</li>)}
                    </ul>
                  </li>
                </ul>

                <div className="text-center mt-10 text-gray-700">
                  <h2 className="text-lg font-semibold mb-4">
                    All Set? Click Submit to send it for approval.
                  </h2>
                </div>
              </div>
            )}

            {/* ------------------- Navigation Buttons ------------------- */}
            <div className="flex justify-center gap-4 mt-4">
              {step > 0 && <button type="button" onClick={handleBack} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Back</button>}
              {step < 2 && <button type="button" onClick={handleNext} className="px-4 py-2 bg-primaryColor-700 text-white rounded-lg hover:bg-primaryColor-800">Next</button>}
              {step === 2 && <button type="submit" className="px-4 py-2 bg-primaryColor-700 text-white rounded-lg hover:bg-primaryColor-800">Submit</button>}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;

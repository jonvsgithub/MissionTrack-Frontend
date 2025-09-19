// src/components/ApplicationForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "./Input";
import Select from "./Select";
import Checkbox from "./Checkbox";
import SuccessCard from "./SuccessCard";
import Stepper from "./Stepper";
import DragDrop from "./DragDrop";

const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    email: "",
    companyContact: "",
    fullName: "",
    province: "",
    district: "",
    sector: "",
    organizationType: "",
    companyEmail: "",
    companyPhoneNumber: "",
    password: "",
    agree: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

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
    }

    if (step === 2) {
      if (!formData.agree)
        newErrors.agree = "You must agree to the terms and conditions";
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
  const departments = ["Management", "Finance", "HR", "IT", "Operations"];

  const handleFileRemove = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    const newErrors = validateStep();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;


    setSuccess(true);
  };


  // ------------------- Render -------------------
  return (
    <div className="min-h-screen bg-gradient-to-r from-primaryColor-10 via-primaryColor-10 to-accent-10 flex justify-center p-6 lg:p-12 gap-10 w-full">
      {/* Left Side */}
      <div className="">
        <h1 className="text-accent-800 text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Enter Your Contacts and <br /> Company Info for Registration
        </h1>
        <img src="bro.png" alt="illustration" className="w-60 sm:w-80 md:w-96 mt-20" />
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-center justify-start pt-10">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-[600px] min-h-screen flex flex-col">
          {success ? (
            <SuccessCard
              title="Success!"
              message="Application submitted successfully, we'll contact you soon."
              buttonText="Back to Home"
              onClose={() => navigate("/")}
            />

<<<<<<< HEAD
            <Input
              label="Company Email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
              placeholder="Enter company email"
              type="email"
              error={errors.companyEmail}
            />

            <Input
              label="Manager Email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter manager email"
              type="email"
              error={errors.email}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select
                label="Province"
                name="province"
                value={formData.province}
                options={provinces}
                placeholder="Province"
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              />
              <Select
                label="District"
                name="district"
                value={formData.district}
                placeholder="District"
                options={formData.province ? districts[formData.province] : []}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              />
              <Select
                label="Sector"
                name="sector"
                value={formData.sector}
                placeholder="Sector"
                options={formData.district && sectors[formData.district] ? sectors[formData.district] : []}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              />
            </div>

            <Input
              label="Contact Person (Full Name)"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Enter contact person name"
              type="text"
              error={errors.fullName}
            />

            <Input
              label="Company Contact"
              name="companyContact"
              value={formData.companyContact}
              onChange={(e) => setFormData({ ...formData, companyContact: e.target.value })}
              placeholder="Enter company contact"
              type="tel"
              error={errors.companyContact}
            />

            <Select
              label="Department"
              name="department"
              value={formData.department}
              options={departments}
              placeholder="Select department"
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />

            <Input
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="Enter manager phone number"
              type="tel"
              error={errors.phoneNumber}
            />

            <Input
              label="Password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter password"
              type="password"
              error={errors.password}
            />

            <div>
              <label className="block text-sm font-medium mb-1">Proof Document</label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setFormData({ ...formData, proofDocument: e.target.files?.[0] || null })}
                className="block w-full text-sm border rounded-lg p-2"
              />
              {errors.proofDocument && <p className="text-red-500 text-sm mt-1">{errors.proofDocument}</p>}
            </div>

            <div>
              <Checkbox
                label="I agree to the Terms & conditions"
                checked={formData.agree}
                onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
              />
              {errors.agree && <p className="text-red-500 text-sm mt-1">{errors.agree}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-primaryColor-700 text-white py-2 rounded-2xl hover:bg-primaryColor-800 mt-4 w-full"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
=======
              <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
                {/* Step 0 */}
                {step === 0 && (
                  <div>
                    <div className="mb-4 text-xl">
                      <h1>Company/Organization’s Information</h1>
                    </div>
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
                    </div>

                    {/* DragDrop uploader */}
                    <div className="border mt-5 rounded-2xl p-6">
                      <div className="resize-y overflow-auto min-h-[150px] border-2 border-dashed border-gray-400 rounded-md">
                        <DragDrop
                          onFileSelect={(files) =>
                            setUploadedFiles([...uploadedFiles, ...files])
                          }
                        />
                      </div>

                      {/* Preview uploaded files */}
                      {uploadedFiles.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <h4 className="font-medium text-sm text-gray-700">
                            Uploaded Files:
                          </h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            {uploadedFiles.map((file, idx) => (
                              <li
                                key={idx}
                                className="flex items-center justify-between bg-gray-50 p-2 rounded"
                              >
                                <span>{file.name}</span>
                                <button
                                  type="button"
                                  onClick={() => handleFileRemove(idx)}
                                  className="text-red-500 text-xs hover:underline"
                                >
                                  Remove
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {errors.files && (
                        <p className="text-red-500 text-sm">{errors.files}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 1 */}
                {step === 1 && (
                  <>
                    <div className="gap-4">
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
                    </div>
                  </>
                )}
                {/* Step 2 */}
                {/* Step 2 */}
                {step === 2 && (
                  <div className="bg-gray-50 rounded-lg p-4 overflow-auto max-h-[600px]">
                    <h3 className="font-bold mb-2">Review your details:</h3>
                    <ul className="text-sm space-y-1">
                      <li><strong>Organization:</strong> {formData.organizationName}</li>
                      <li><strong>Location:</strong> {formData.province}, {formData.district}, {formData.sector}</li>
                      <li><strong>Representative:</strong> {formData.person}</li>
                      <li><strong>Phone:</strong> {formData.phone}</li>
                      <li><strong>Email:</strong> {formData.email}</li>
                      <li>
                        <strong>Files:</strong>
                        <ul className="ml-4 list-disc">
                          {uploadedFiles.map((file, idx) => <li key={idx}>{file.name}</li>)}
                        </ul>
                      </li>
                    </ul>

                    <div className="text-center mt-20 text-gray-700">
                      <h2 className="text-lg font-semibold mb-4">
                        All Set? Click Submit to send it for approval.
                      </h2>
                    </div>
                  </div>
                )}


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
                      type="button"
                      onClick={handleSubmit} 
                      className="px-4 py-2 bg-primaryColor-700 text-white rounded-lg hover:bg-primaryColor-800"
                    >
                      Submit
                    </button>
                  )}
                </div>





              </form>
            </>
          )}
>>>>>>> 1ef33375d6d63e4894157e564428dc8ae172d1af
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;

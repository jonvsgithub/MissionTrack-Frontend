import React, { useState } from "react";
import Input from "../Input";
import Stepper from "../Stepper";
import DragDrop from "../DragDrop";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFileAlt,
  FaFile,
} from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { GrFormNextLink } from "react-icons/gr";

// 🔹 file type icon helper
const getFileIcon = (fileName: string) => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return <FaFilePdf className="text-red-500 text-xl" />;
    case "doc":
    case "docx":
      return <FaFileWord className="text-blue-500 text-xl" />;
    case "xls":
    case "xlsx":
      return <FaFileExcel className="text-green-600 text-xl" />;
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
      return <FaFileImage className="text-yellow-500 text-xl" />;
    case "txt":
      return <FaFileAlt className="text-gray-600 text-xl" />;
    default:
      return <FaFile className="text-gray-500 text-xl" />;
  }
};

const Details: React.FC = () => {
  // ✅ Form state
  const [formData, setFormData] = useState({
    missionTitle: "",
    names: "",
    position: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
    documentDescription: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = ["Mission Details", "Attachments", "Submission"];
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Validation logic per step
  const validateStep = () => {
    let newErrors: { [key: string]: string } = {};
    if (currentStep === 0) {
      if (!formData.missionTitle) newErrors.missionTitle = "Mission title is required";
      if (!formData.names) newErrors.names = "Names are required";
      if (!formData.position) newErrors.position = "Position is required";
      if (!formData.destination) newErrors.destination = "Destination is required";
      if (!formData.startDate) newErrors.startDate = "Start date is required";
      if (!formData.endDate) newErrors.endDate = "End date is required";
      if (formData.startDate && formData.endDate) {
        if (new Date(formData.endDate) < new Date(formData.startDate)) {
          newErrors.endDate = "End date cannot be earlier than start date";
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No token found. Please log in.");
        return;
      }

      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("No userId found. Please log in.");
        return;
      }

      const form = new FormData();
      form.append("userId", userId);
      form.append("missionTitle", formData.missionTitle);
      form.append("fullName", formData.names);
      form.append("jobPosition", formData.position);
      form.append("location", formData.destination);
      form.append("startDate", formData.startDate);
      form.append("endDate", formData.endDate);
      form.append("missionDescription", formData.description);
      form.append("missionDocument", "Primary mission");

      uploadedFiles.forEach((file) => {
        form.append("documents", file);
      });

      const response = await fetch(
        "https://missiontrack-backend.onrender.com/api/missions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit mission");
      }

      console.log("✅ Backend response:", data);
      setIsSubmitted(true);
    } catch (error: any) {
      console.error("❌ Submission error:", error.message);
      alert(error.message);
    }
    finally {
      setIsLoading(false);
    }
  };


  return (
    <>

      <div className="min-h-[600px] w-full bg-[#E6EAF5] max-w-5xl flex flex-col">
        <div className="flex flex-col p-6 bg-white rounded-lg shadow-md">
          {/* Title */}
          <div className="w-full py-4 bg-gradient-to-r from-blue-400 to-teal-400 rounded-lg">
            <h1 className="font-bold text-2xl text-center text-gray-800">Request a work mission</h1>
          </div>
          <p className="text-gray-600 text-center mt-3 text-sm">
            Provide mission details, and supporting documents for approval.
          </p>

          {/* Stepper */}
          <Stepper steps={steps} currentStep={currentStep} />

          {/* Step content */}
          <div className="min-h-[450px] w-full bg-white rounded-lg shadow-sm mt-5 border border-gray-100">
            <div className="flex flex-col p-6">
              {/* Step 1 */}
              {currentStep === 0 && (
                <div className="flex flex-col w-full space-y-4">
                  <Input 
                    label="Mission Title" 
                    type="text" 
                    className="bg-gray-50" 
                    name="missionTitle" 
                    value={formData.missionTitle} 
                    onChange={handleChange} 
                  />
                  {errors.missionTitle && <span className="text-red-500 text-sm -mt-2">{errors.missionTitle}</span>}
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Input 
                        label="Names" 
                        className="bg-gray-50" 
                        type="text" 
                        name="names" 
                        value={formData.names} 
                        onChange={handleChange} 
                      />
                      {errors.names && <span className="text-red-500 text-sm -mt-2">{errors.names}</span>}
                    </div>
                    <div>
                      <Input 
                        label="Title/Position"
                        className="bg-gray-50" 
                        type="text" 
                        name="position" 
                        value={formData.position} 
                        onChange={handleChange} 
                      />
                      {errors.position && <span className="text-red-500 text-sm -mt-2">{errors.position}</span>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <Input 
                        label="Destination" 
                        type="text" 
                        className="bg-gray-50" 
                        name="destination" 
                        value={formData.destination} 
                        onChange={handleChange} 
                      />
                      {errors.destination && <span className="text-red-500 text-sm -mt-2">{errors.destination}</span>}
                    </div>
                    <div>
                      <Input 
                        label="Start Date" 
                        type="date" 
                        className="bg-gray-50" 
                        name="startDate" 
                        value={formData.startDate} 
                        onChange={handleChange} 
                      />
                      {errors.startDate && <span className="text-red-500 text-sm -mt-2">{errors.startDate}</span>}
                    </div>
                    <div>
                      <Input 
                        label="End Date" 
                        type="date" 
                        className="bg-gray-50" 
                        name="endDate" 
                        value={formData.endDate} 
                        onChange={handleChange} 
                      />
                      {errors.endDate && <span className="text-red-500 text-sm -mt-2">{errors.endDate}</span>}
                    </div>
                  </div>

                  {/* Mission Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Mission Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 transition-all resize-none"
                      placeholder="Describe the purpose and objectives of this mission..."
                    />
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {currentStep === 1 && (
                <div className="grid grid-cols-2 gap-6 text-gray-700">
                  <div className="flex flex-col space-y-4">
                    <div>
                      <label htmlFor="documentDescription" className="block text-sm font-medium text-gray-700 mb-2">
                        What document is this?
                      </label>
                      <input
                        type="text"
                        id="documentDescription"
                        name="documentDescription"
                        value={formData.documentDescription}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 transition-all"
                        placeholder="Ex: travel invitation/ Medical clearance..."
                      />
                    </div>
                    <div className="resize-y overflow-auto min-h-[200px] max-h-[400px] border-2 border-dashed border-gray-300 rounded-lg">
                      <DragDrop onFileSelect={(files) => setUploadedFiles([...uploadedFiles, ...files])} />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Uploaded
                    </label>
                    <div className="border rounded-lg border-gray-300 space-y-2 p-3 h-[300px] overflow-y-auto bg-gray-50">
                      {uploadedFiles.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center mt-10">No files uploaded yet</p>
                      ) : (
                        uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200 hover:border-gray-300 transition-all">
                            <div className="flex items-center gap-3">
                              {getFileIcon(file.name)}
                              <div>
                                <span className="text-sm font-medium text-gray-700">{file.name}</span>
                                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                              </div>
                            </div>
                            <button 
                              onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))} 
                              className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {currentStep === 2 && (
                <div className="text-center mt-32 text-gray-700">
                  <h2 className="text-lg font-semibold mb-2">
                    All Set? Click Submit Request to send it for approval.
                  </h2>
                  <p className="text-sm text-gray-500">
                    Your request will be reviewed by your manager
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-6 justify-center mt-8">
                {currentStep > 0 && (
                  <button 
                    onClick={handleBack} 
                    className="px-6 py-2.5 rounded-lg text-gray-700 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 w-[200px] font-medium transition-all"
                  >
                    Back
                  </button>
                )}
                {currentStep < steps.length - 1 ? (
                  <button 
                    onClick={handleNext} 
                    className="px-6 flex py-2.5 items-center justify-center rounded-lg text-white bg-green-600 hover:bg-green-700 w-[200px] font-medium transition-all shadow-sm"
                  >
                    Next <GrFormNextLink size="25"/>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`px-6 py-2.5 rounded-lg w-[200px] font-medium transition-all shadow-sm ${isLoading
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "text-white bg-green-600 hover:bg-green-700"
                      }`}
                  >
                    {isLoading ? "Submitting..." : "Submit request"}
                  </button>

                )}
              </div>
            </div>
          </div>

          {/* ✅ Success Modal */}
          {isSubmitted && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center relative">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✕
                </button>
                <div className="flex flex-col justify-center items-center space-y-4">
                  <div className="bg-green-600 p-4 flex justify-center rounded-full">
                    <FaCheck size={40} className="text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800">Success</h1>
                  <p className="text-gray-600">
                    Your mission request has been successfully submitted
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-8 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  );
};

export default Details;
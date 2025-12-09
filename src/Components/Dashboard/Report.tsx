import React, { useState } from "react";
import ReportsList from "./ReportsList";
import DragDrop from "../DragDrop";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFileAlt,
  FaFile,
} from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";

// File type icon helper
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

const ReportMain: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    dailyActivities: "",
    documentDescription: "",
    notes: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.dailyActivities.trim())
      newErrors.dailyActivities = "Daily activities are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // TODO: Submit to API
    console.log("Form submitted:", formData, uploadedFiles);
    alert("Report saved successfully!");

    // Reset and go back to list
    handleCancel();
  };

  const handleCancel = () => {
    setFormData({
      date: "",
      dailyActivities: "",
      documentDescription: "",
      notes: "",
    });
    setUploadedFiles([]);
    setErrors({});
    setShowForm(false);
  };

  // If showing form, render the form
  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header with Back Button */}
          <div className="mb-6">
            <button
              onClick={() => setShowForm(false)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
            >
              <BiArrowBack size={20} />
              <span>Back to Reports</span>
            </button>
            <div className="bg-gradient-to-r from-blue-400 to-teal-400 p-4 rounded-lg shadow-sm">
              <h1 className="font-bold text-2xl text-center text-gray-800">
                Daily Mission Report Form
              </h1>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Today's Activities Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Today's Activities
                </h2>

                {/* Date Field */}
                <div className="mb-4">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                  {errors.date && (
                    <span className="text-red-500 text-sm">{errors.date}</span>
                  )}
                </div>

                {/* Daily Activities Field */}
                <div>
                  <label
                    htmlFor="dailyActivities"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Daily Activities
                  </label>
                  <textarea
                    id="dailyActivities"
                    name="dailyActivities"
                    value={formData.dailyActivities}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Briefly describe what you accomplished today (e.g., client meeting, site inspection, training session)"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Briefly describe what you accomplished today (e.g., client meeting, site inspection, training session)
                  </p>
                  {errors.dailyActivities && (
                    <span className="text-red-500 text-sm">
                      {errors.dailyActivities}
                    </span>
                  )}
                </div>
              </div>

              {/* Attachments Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Attachments
                </h2>

                <div className="grid grid-cols-2 gap-6">
                  {/* Left Column - Upload */}
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="documentDescription"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        What document is this?
                      </label>
                      <input
                        type="text"
                        id="documentDescription"
                        name="documentDescription"
                        value={formData.documentDescription}
                        onChange={handleChange}
                        placeholder="Eg: meeting notes, signed forms, or photos."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Eg: meeting notes, signed forms, or photos.
                      </p>
                    </div>

                    {/* Drag & Drop Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg min-h-[200px]">
                      <DragDrop
                        onFileSelect={(files) =>
                          setUploadedFiles([...uploadedFiles, ...files])
                        }
                      />
                    </div>
                  </div>

                  {/* Right Column - Uploaded Files */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Uploaded
                    </label>
                    <div className="border rounded-lg border-gray-300 p-3 min-h-[280px] max-h-[280px] overflow-y-auto bg-gray-50">
                      {uploadedFiles.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center mt-10">
                          No files uploaded yet
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200 hover:border-gray-300 transition-all"
                            >
                              <div className="flex items-center gap-3">
                                {getFileIcon(file.name)}
                                <div>
                                  <span className="text-sm font-medium text-gray-700">
                                    {file.name}
                                  </span>
                                  <p className="text-xs text-gray-500">
                                    {(file.size / 1024).toFixed(2)} KB
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  setUploadedFiles(
                                    uploadedFiles.filter((_, i) => i !== index)
                                  )
                                }
                                className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Note/Remark Section */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Note/Remark
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Any comment"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">Any comment</p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-8 py-2.5 rounded-lg text-red-500 border-2 border-red-500 hover:bg-red-50 font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 rounded-lg text-white bg-green-600 hover:bg-green-700 font-medium transition-all shadow-sm"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, show the reports list
  return <ReportsList onNewReport={() => setShowForm(true)} />;
};

export default ReportMain;
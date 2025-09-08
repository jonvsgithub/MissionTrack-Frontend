import React, { useState } from "react";

interface DragDropProps {
  onFileSelect: (files: File[]) => void;
}

const DragDrop: React.FC<DragDropProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      onFileSelect(files);
      e.dataTransfer.clearData();
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      onFileSelect(files);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={` p-6 text-center cursor-pointer transition ${
        isDragging ? "border-accent-500 bg-accent-50" : "border-gray-400"
      }`}
    >
      <input
        type="file"
        id="fileUpload"
        multiple
        className="hidden"
        onChange={handleFileInput}
      />
      <label htmlFor="fileUpload" className="cursor-pointer">
        <p className="text-gray-600">
          Drag & drop files here, or{" "}
          <span className="text-accent-500 font-semibold">browse</span>
        </p>
      </label>
    </div>
  );
};

export default DragDrop;

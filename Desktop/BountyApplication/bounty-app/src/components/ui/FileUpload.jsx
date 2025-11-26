import React, { useRef, useState } from "react";

export const FileUpload = ({
  onFileSelect,
  accept = "image/*",
  maxSize = 2 * 1024 * 1024, // 2MB
  error,
  ...props
}) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file) => {
    if (file.size > maxSize) {
      alert("File size exceeds the 2MB limit.");
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && validateFile(file)) {
      onFileSelect(file);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div
        className={`
          border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all
          ${isDragging ? "border-primary bg-primary/10" : "border-muted-foreground/40 hover:border-primary/60"}
        `}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        {...props}
      >
        {/* Icon */}
        <div className="text-3xl font-bold text-muted-foreground select-none">
          +
        </div>

        {/* Title */}
        <p className="text-sm text-foreground mt-2 font-medium">
          Click to upload or drag & drop
        </p>

        {/* Subtext */}
        <p className="text-xs text-muted-foreground mt-1">
          Max size: 2MB • Ideal dimensions: 20×20 px
        </p>

        {/* Hidden File Input */}
        <input
          type="file"
          accept={accept}
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

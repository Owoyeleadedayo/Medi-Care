"use client"
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type FileUploaderProps = {
  files: File[];
  onChange: (files: File[]) => void;
};

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center border border-dashed border-[#363A3D] bg-[#1A1D21] p-6 rounded-md cursor-pointer"
    >
      <input {...getInputProps()} />

      {files.length > 0 ? (
         <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />
      ) : isDragActive ? (
        <p className="text-white">Drop the file here...</p>
      ) : (
        <p className="text-gray-400">
          Drag & drop or <span className="text-green-500">click to upload</span>
        </p>
      )}
    </div>
  );
};

export default FileUploader;

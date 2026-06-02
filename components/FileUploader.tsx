"use client"
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { convertFileToUrl } from "../lib/utils";

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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center border border-dashed border-[#363A3D] bg-[#1A1D21] p-6 rounded-md cursor-pointer hover:border-green-500 transition-colors duration-200"
    >
      <input {...getInputProps()} />

      {files && files.length > 0 ? (
        <div className="flex flex-col items-center gap-3 w-full">
          <Image
            src={convertFileToUrl(files[0])}
            width={1000}
            height={1000}
            alt="uploaded image"
            className="max-h-[300px] w-full overflow-hidden object-cover rounded-md"
          />
          <div className="flex flex-col items-center">
            <p className="text-sm font-semibold text-white truncate max-w-[250px]">
              {files[0].name}
            </p>
            <p className="text-xs text-gray-400">
              {(files[0].size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 py-4">
          <UploadCloud className="h-10 w-10 text-green-500 mb-2" />
          <p className="text-gray-200 text-sm">
            Drag & drop or <span className="text-green-500 font-medium">click to upload</span>
          </p>
          <p className="text-xs text-gray-400">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;

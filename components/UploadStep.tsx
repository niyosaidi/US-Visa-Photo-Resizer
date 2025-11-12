
import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon, ShieldCheckIcon } from './icons';

interface UploadStepProps {
  onPhotoUploaded: (file: File) => void;
}

const UploadStep: React.FC<UploadStepProps> = ({ onPhotoUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onPhotoUploaded(file);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onPhotoUploaded(file);
    }
  }, [onPhotoUploaded]);
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-lg text-center">
        <div 
            className={`p-10 border-2 border-dashed rounded-lg transition-colors duration-300 ${isDragging ? 'border-blue-500 bg-gray-700' : 'border-gray-600 hover:border-blue-500'}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
            />
            <div className="flex flex-col items-center pointer-events-none">
                 <UploadIcon className="w-12 h-12 text-gray-500 mb-4" />
                <p className="text-lg font-semibold text-gray-300">Drag & Drop your photo here</p>
                <p className="text-gray-400">or</p>
                <button
                    type="button"
                    className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 pointer-events-auto"
                >
                    Browse Files
                </button>
            </div>
        </div>
        <div className="mt-6 flex items-center justify-center space-x-3 text-gray-400">
            <ShieldCheckIcon className="w-6 h-6 text-green-500" />
            <div>
                <p className="font-semibold">Privacy-Focused</p>
                <p className="text-sm">Your photos are processed and never stored on our servers.</p>
            </div>
        </div>
    </div>
  );
};

export default UploadStep;

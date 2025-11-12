
import React from 'react';
import { AlertTriangleIcon, RefreshIcon } from './icons';

interface ErrorDisplayProps {
  message: string | null;
  onReset: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-red-900/20 border border-red-800 rounded-lg">
      <AlertTriangleIcon className="w-12 h-12 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold text-white">An Error Occurred</h2>
      <p className="text-red-300 mt-2 max-w-md">
        {message || "Something went wrong. Please try again."}
      </p>
      <button
        onClick={onReset}
        className="mt-6 flex items-center justify-center px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-colors"
      >
        <RefreshIcon className="w-5 h-5 mr-2" />
        Try Again
      </button>
    </div>
  );
};


import React from 'react';
import { CameraIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-4">
        <div className="bg-blue-600 p-3 rounded-full">
            <CameraIcon className="w-8 h-8 text-white" />
        </div>
        <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                US Visa Photo Resizer
            </h1>
            <p className="mt-2 text-lg text-gray-400">
                AI-powered tool to get your visa photo right, the first time.
            </p>
        </div>
      </div>
    </header>
  );
};

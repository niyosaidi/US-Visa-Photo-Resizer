
import React from 'react';

const ProcessingStep: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      <h2 className="text-2xl font-bold text-white mt-6">Analyzing your photo...</h2>
      <p className="text-gray-400 mt-2 max-w-sm">
        Our AI is cropping, resizing, and adjusting the background to meet official requirements. This might take a moment.
      </p>
    </div>
  );
};

export default ProcessingStep;

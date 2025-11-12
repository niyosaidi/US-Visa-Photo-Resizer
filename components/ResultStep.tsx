
import React from 'react';
import { DownloadIcon, RefreshIcon, CheckCircleIcon } from './icons';

interface ResultStepProps {
  imageUrl: string;
  onReset: () => void;
}

const checklistItems = [
    "Square aspect ratio (1:1)",
    "Centered head (50-70% of frame height)",
    "Plain white or off-white background",
    "Neutral facial expression, eyes open",
    "No glasses or headwear (unless for religious/medical reasons)",
    "Proper lighting with no shadows on face or background"
];

const ResultStep: React.FC<ResultStepProps> = ({ imageUrl, onReset }) => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
        <div className="lg:w-1/2 w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white mb-4">Your Photo is Ready!</h2>
            <div className="relative group w-full max-w-sm">
                <img 
                    src={imageUrl} 
                    alt="Processed visa photo" 
                    className="rounded-lg shadow-2xl w-full aspect-square object-cover border-4 border-gray-600"
                />
                <a 
                    href={imageUrl} 
                    download="us_visa_photo.jpg" 
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                >
                    <DownloadIcon className="w-12 h-12 text-white" />
                </a>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                <a
                    href={imageUrl}
                    download="us_visa_photo.jpg"
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-colors"
                >
                    <DownloadIcon className="w-5 h-5 mr-2" />
                    Download Photo
                </a>
                <button
                    onClick={onReset}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-600 text-white font-bold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-colors"
                >
                    <RefreshIcon className="w-5 h-5 mr-2" />
                    Try Another
                </button>
            </div>
        </div>
        <div className="lg:w-1/2 w-full bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">U.S. Visa Photo Checklist</h3>
            <ul className="space-y-3">
                {checklistItems.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mr-3 mt-0.5" />
                        <span className="text-gray-300">{item}</span>
                    </li>
                ))}
            </ul>
             <div className="mt-6 p-4 bg-yellow-900/50 border border-yellow-700 text-yellow-300 rounded-lg text-sm">
                <strong>Disclaimer:</strong> This tool uses AI to help meet requirements, but it does not guarantee approval. Always double-check your photo against the official guidelines from the U.S. Department of State.
            </div>
        </div>
    </div>
  );
};

export default ResultStep;

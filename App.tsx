
import React, { useState, useCallback } from 'react';
import { AppState } from './types';
import { fileToBase64 } from './utils/fileUtils';
import { processVisaPhoto } from './services/geminiService';
import UploadStep from './components/UploadStep';
import ProcessingStep from './components/ProcessingStep';
import ResultStep from './components/ResultStep';
import { Header } from './components/Header';
import { ErrorDisplay } from './components/ErrorDisplay';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePhotoUpload = useCallback(async (file: File) => {
    setAppState(AppState.PROCESSING);
    setError(null);
    try {
      const { base64, mimeType } = await fileToBase64(file);
      
      const processedImageBase64 = await processVisaPhoto(base64, mimeType);

      if (processedImageBase64) {
        const imageUrl = `data:image/jpeg;base64,${processedImageBase64}`;
        setProcessedImageUrl(imageUrl);
        setAppState(AppState.RESULT);
      } else {
        throw new Error("The AI model did not return an image. Please try again.");
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to process photo. ${errorMessage}`);
      setAppState(AppState.ERROR);
    }
  }, []);

  const handleReset = useCallback(() => {
    setAppState(AppState.IDLE);
    setProcessedImageUrl(null);
    setError(null);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.IDLE:
        return <UploadStep onPhotoUploaded={handlePhotoUpload} />;
      case AppState.PROCESSING:
        return <ProcessingStep />;
      case AppState.RESULT:
        return processedImageUrl && <ResultStep imageUrl={processedImageUrl} onReset={handleReset} />;
      case AppState.ERROR:
        return <ErrorDisplay message={error} onReset={handleReset} />;
      default:
        return <UploadStep onPhotoUploaded={handlePhotoUpload} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="mt-8 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-6 sm:p-8 min-h-[400px] flex items-center justify-center">
          {renderContent()}
        </main>
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} US Visa Photo Resizer. All Rights Reserved.</p>
          <p className="mt-2">This tool is for assistance only. Always verify photo compliance with official sources.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;

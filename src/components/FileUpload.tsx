'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { parseExcelToJson } from '@/utils/excelParser';

interface FileUploadProps {
  onFileProcessed: (jsonData: Record<string, string>) => void;
}

export default function FileUpload({ onFileProcessed }: FileUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Reset states
    setError(null);
    
    if (acceptedFiles.length === 0) {
      return;
    }

    const file = acceptedFiles[0];
    
    // Check if the file is an Excel file
    const isExcel = 
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || // .xlsx
      file.type === 'application/vnd.ms-excel'; // .xls
    
    if (!isExcel) {
      setError('Please upload an Excel file (.xlsx or .xls)');
      return;
    }

    try {
      setIsProcessing(true);
      const jsonData = await parseExcelToJson(file);
      onFileProcessed(jsonData);
    } catch (err) {
      setError('Error processing the file. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  }, [onFileProcessed]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    maxFiles: 1
  });

  return (
    <div className="w-full max-w-xl mx-auto">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600'
          }`}
      >
        <input {...getInputProps()} />
        
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
            <p>Processing file...</p>
          </div>
        ) : (
          <>
            <svg 
              className="mx-auto h-12 w-12 text-gray-400" 
              stroke="currentColor" 
              fill="none" 
              viewBox="0 0 48 48" 
              aria-hidden="true"
            >
              <path 
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                strokeWidth={2} 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {isDragActive 
                ? 'Drop the Excel file here...' 
                : 'Drag and drop an Excel file here, or click to select a file'}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
              Only Excel files (.xlsx, .xls) are supported
            </p>
          </>
        )}
      </div>
      
      {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
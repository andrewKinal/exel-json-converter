'use client';

import { useState } from 'react';

interface JsonPreviewProps {
  jsonData: Record<string, string> | null;
}

export default function JsonPreview({ jsonData }: JsonPreviewProps) {
  const [copied, setCopied] = useState(false);
  
  if (!jsonData || Object.keys(jsonData).length === 0) {
    return null;
  }

  const jsonString = JSON.stringify(jsonData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // Create a blob with the JSON data
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted-data.json';
    
    // Trigger the download
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">JSON Preview</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
          >
            Download JSON
          </button>
        </div>
      </div>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto max-h-96 text-sm">
        {jsonString}
      </pre>
    </div>
  );
}
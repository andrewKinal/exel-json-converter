'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import JsonPreview from '@/components/JsonPreview';

export default function Home() {
  const [jsonData, setJsonData] = useState<Record<string, string> | null>(null);

  const handleFileProcessed = (data: Record<string, string>) => {
    setJsonData(data);
  };

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-12">
      <header className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold mb-2">Excel to JSON Converter</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload an Excel file to convert it to JSON format. Multi-sentence values will be split into separate entries.
        </p>
      </header>

      <main className="max-w-4xl mx-auto">
        <FileUpload onFileProcessed={handleFileProcessed} />

        {jsonData && <JsonPreview jsonData={jsonData} />}

        {!jsonData && (
          <div className="mt-12 text-center text-gray-500 dark:text-gray-400">
            <p>Upload an Excel file to see the JSON preview here</p>
          </div>
        )}
      </main>

      <footer className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Excel to JSON Converter - Built with Next.js and TypeScript</p>
      </footer>
    </div>
  );
}

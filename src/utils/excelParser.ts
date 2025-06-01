import * as XLSX from 'xlsx';

/**
 * Splits a text into sentences
 * @param text The text to split into sentences
 * @returns An array of sentences
 */
export function splitIntoSentences(text: string): string[] {
  // Split by period, exclamation mark, or question mark followed by a space or end of string
  const sentences = text.split(/(?<=[.!?])\s+|(?<=[.!?])$/);
  // Filter out empty sentences
  return sentences.filter(sentence => sentence.trim().length > 0);
}

/**
 * Parses an Excel file and converts it to JSON
 * @param file The Excel file to parse
 * @returns A Promise that resolves to the parsed JSON
 */
export async function parseExcelToJson(file: File): Promise<Record<string, string>> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        // Process the data
        const result: Record<string, string> = {};
        const usedValues = new Set<string>(); // Track used values to prevent duplicates

        // Process all sheets in the workbook
        workbook.SheetNames.forEach(sheetName => {
          const worksheet = workbook.Sheets[sheetName];

          // Convert to JSON
          const jsonData = XLSX.utils.sheet_to_json<[string, string]>(worksheet, { header: 1 });

          jsonData.forEach(row => {
            if (Array.isArray(row) && row.length >= 2) {
              const key = String(row[0]).trim();
              const value = String(row[1]).trim();

              if (key && value) {
                // Check if the value contains multiple sentences
                const sentences = splitIntoSentences(value);

                if (sentences.length <= 1) {
                  // Single sentence, just add it if not a duplicate
                  if (!usedValues.has(value)) {
                    result[key] = value;
                    usedValues.add(value);
                  }
                } else {
                  // Multiple sentences, add each with a suffix if not a duplicate
                  sentences.forEach((sentence, index) => {
                    if (!usedValues.has(sentence)) {
                      const sentenceKey = `${key}_${index + 1}`;
                      result[sentenceKey] = sentence;
                      usedValues.add(sentence);
                    }
                  });
                }
              }
            }
          });
        });

        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
}

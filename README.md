# Excel to JSON Converter

A Next.js application that converts Excel files to JSON format with special handling for multi-sentence values.

## Features

- Upload Excel files via drag-and-drop or file selection
- Parse Excel files with two columns (key-value format)
- Split multi-sentence values into separate entries with suffixed keys
- Preview the generated JSON
- Copy JSON to clipboard
- Download the generated JSON file

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- xlsx (for Excel parsing)
- react-dropzone (for drag-and-drop functionality)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. Drag and drop an Excel file onto the upload area, or click to select a file.
2. The application will process the Excel file and display the JSON preview.
3. You can copy the JSON to your clipboard or download it as a file.

## Excel File Format

The Excel file should have a table with two columns:
- The first column contains the keys
- The second column contains the values

If a value contains multiple sentences (separated by periods, exclamation marks, or question marks), the application will split it into separate entries with suffixed keys (e.g., `key_1`, `key_2`, etc.).

### Example

#### Input Excel:

| Key | Value |
|-----|-------|
| greeting | Hello! How are you? I'm fine. |
| name | John Doe |

#### Output JSON:

```json
{
  "greeting_1": "Hello!",
  "greeting_2": "How are you?",
  "greeting_3": "I'm fine.",
  "name": "John Doe"
}
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment Options

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Deploy on Firebase Hosting

This project is configured for deployment to Firebase Hosting. To deploy:

1. Make sure you have Firebase CLI installed:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Deploy the application:
   ```bash
   npm run deploy
   ```

This will build the application and deploy it to Firebase Hosting. You can also use GitHub Actions for continuous deployment - the workflow files are already set up in the `.github/workflows` directory.

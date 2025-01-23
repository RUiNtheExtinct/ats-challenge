# AI-Powered CV

AI-Powered CV is a cutting-edge application designed to transform your resume with the power of AI. Our platform allows you to upload your resume, anonymize personal information, reformat it into a professional layout, and enhance it with AI-driven suggestions.

## Features

- **Upload**: Easily upload your existing resume in PDF, DOCX, Markdown, ODT, or Plain Text formats.
- **Edit**: Enhance your content with our Rich Text Editor.
- **Download**: Export your polished resume in professional PDF format.

## Getting Started

### Prerequisites

- Node.js (version 20 or later)
- pnpm (version 9 or later)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/RUiNtheExtinct/ats-challenge.git
    cd ats-challenge
    ```

2. Install the dependencies:

    ```bash
    pnpm install
    ```

3. Start the development server:

    ```bash
    pnpm dev
    ```

    The application will be available at `http://localhost:3000`.

## Testing

To run the unit tests, use:

```bash
pnpm test
```

To run the end-to-end tests, use:

```bash
pnpm e2e:headless
```

### Building for Production

To build the application for production, run:

```bash
pnpm build
```

This will create an optimized build in the `.next` directory.

You can start the application by running:

```bash
pnpm start
```

## License

This project is licensed under the MIT License.

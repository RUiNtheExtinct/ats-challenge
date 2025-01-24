"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import mammoth from "mammoth";
import { marked } from "marked";
import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.mjs`;

interface FileRendererProps {
    file: File;
    className?: string;
}

interface FileViewerState {
    content: string;
    numPages?: number;
    currentPage: number;
    uri: string;
    loading: boolean;
    error?: string;
    fileName: string;
    fileType: string;
    fileData?: string | ArrayBuffer;
}

const FileRenderer: React.FC<FileRendererProps> = ({ file, className }) => {
    const [state, setState] = useState<FileViewerState>({
        content: "",
        currentPage: 1,
        loading: true,
        uri: URL.createObjectURL(file),
        fileName: file.name,
        fileType: file.type,
    });
    const [numPages, setNumPages] = useState<number>(1);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadFile();
        return () => {
            URL.revokeObjectURL(state.uri);
        };
    }, [file]);

    const loadFile = async () => {
        setState((prev) => ({ ...prev, loading: true, error: undefined }));

        try {
            switch (file.type) {
                case "application/pdf":
                    await loadPDFFile();
                    break;

                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                case "application/msword":
                    await loadWordDocument();
                    break;

                case "text/markdown":
                case "text/md":
                    await loadMarkdownFile();
                    break;

                case "application/vnd.oasis.opendocument.text":
                    await loadODTFile();
                    break;

                case "text/plain":
                    await loadTextFile();
                    break;

                default:
                    throw new Error(`Unsupported file type: ${file.type}`);
            }
        } catch (error) {
            setState((prev) => ({
                ...prev,
                loading: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "An error occurred while loading the file",
            }));
        }
    };

    const loadPDFFile = async () => {
        const arrayBuffer = await file.arrayBuffer();
        setState((prev) => ({
            ...prev,
            fileData: arrayBuffer,
            loading: false,
        }));
    };

    const loadWordDocument = async () => {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setState((prev) => ({
            ...prev,
            content: result.value,
            loading: false,
            fileData: arrayBuffer,
        }));
    };

    const loadMarkdownFile = async () => {
        const arrayBuffer = await file.arrayBuffer();
        const text = await file.text();
        const html = await marked(text);
        setState((prev) => ({
            ...prev,
            content: html,
            loading: false,
            fileData: arrayBuffer,
        }));
    };

    const loadODTFile = async () => {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.convertToHtml({ arrayBuffer });
            const odtFallback =
                result.value || (await fallbackODTDisplay(file));
            setState((prev) => ({
                ...prev,
                content: odtFallback,
                loading: false,
                fileData: arrayBuffer,
            }));
        } catch (error) {
            const content = await fallbackODTDisplay(file);
            setState((prev) => ({
                ...prev,
                content,
                loading: false,
            }));
        }
    };

    const fallbackODTDisplay = async (file: File) => {
        const text = await file.text();
        const formattedText = text
            .replace(/\n/g, "<br>")
            .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
        return `<div class="font-mono whitespace-pre-wrap">${formattedText}</div>`;
    };

    const loadTextFile = async () => {
        const text = await file.text();
        const arrayBuffer = await file.arrayBuffer();
        setState((prev) => ({
            ...prev,
            content: `<div class="whitespace-pre-wrap">${text}</div>`,
            loading: false,
            fileData: arrayBuffer,
        }));
    };

    if (state.loading) {
        return (
            <Card className={cn("flex items-center justify-center", className)}>
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </Card>
        );
    }

    if (state.error) {
        return (
            <Card className={className}>
                <Alert variant="destructive" className="m-4">
                    <AlertTitle>Error Loading File</AlertTitle>
                    <AlertDescription>{state.error}</AlertDescription>
                </Alert>
            </Card>
        );
    }

    if (file.type === "application/pdf") {
        return (
            <Card
                className={cn(
                    "h-full w-full overflow-y-auto rounded-lg",
                    className,
                )}
                ref={contentRef}
            >
                <Document
                    file={state.uri}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    onLoadError={(error) =>
                        setState((prev) => ({
                            ...prev,
                            error: "Failed to load PDF file",
                        }))
                    }
                    loading={
                        <div className="flex items-center justify-center p-4">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    }
                    className={
                        "flex flex-col w-full h-fit overflow-y-auto justify-center items-center bg-gray-500 dark:bg-gray-800 rounded-lg"
                    }
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            width={contentRef.current?.clientWidth || 612}
                            className="mb-4"
                        />
                    ))}
                </Document>
            </Card>
        );
    }

    // Handle DOCX, ODT, MD, and TXT files
    return (
        <Card className={cn("h-full w-full overflow-y-auto", className)}>
            <div ref={contentRef} className="flex-1 overflow-y-auto p-4">
                {file.type.includes("wordprocessingml.document") ||
                file.type === "application/msword" ||
                file.type === "application/vnd.oasis.opendocument.text" ? (
                    <div
                        className="prose prose-sm max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: state.content }}
                    />
                ) : file.type.includes("markdown") ||
                  file.type === "text/md" ? (
                    <div
                        className="prose prose-sm max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: state.content }}
                    />
                ) : (
                    <div
                        className="font-mono whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: state.content }}
                    />
                )}
            </div>
        </Card>
    );
};

export default FileRenderer;

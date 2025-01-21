import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { Loader2 } from "lucide-react";
import mammoth from "mammoth";
import { marked } from "marked";
import React, { useEffect, useRef, useState } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import DocxRenderer from "./docx-renderer";
import MarkdownRenderer from "./markdown-renderer";

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
    const [pdfDoc, setPdfDoc] = useState<any>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadFile();
        return () => {
            if (pdfDoc) {
                pdfDoc.destroy();
            }
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
            <Card className={className}>
                <DocViewer
                    documents={[
                        {
                            ...state,
                        },
                    ]}
                    initialActiveDocument={{ ...state }}
                    pluginRenderers={[
                        ...DocViewerRenderers,
                        MarkdownRenderer,
                        DocxRenderer,
                    ]}
                    config={{
                        header: {
                            disableHeader: true,
                            disableFileName: false,
                            retainURLParams: false,
                        },
                    }}
                    className="h-full w-full overflow-y-auto rounded-lg"
                />
            </Card>
        );
    }

    return (
        <Card className="h-full max-h-[45%] flex flex-col">
            <div ref={contentRef} className="flex-1 overflow-y-scroll p-4">
                <div
                    className="max-w-none"
                    dangerouslySetInnerHTML={{ __html: state.content }}
                />
            </div>
        </Card>
    );
};

export default FileRenderer;

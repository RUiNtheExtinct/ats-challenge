"use client";

import { Button } from "@/components/ui/button";
import FileViewer from "@/components/views/file-viewer";
import RichTextEditor from "@/components/views/rich-text-editor";
import UploadZone from "@/components/views/upload-zone";
import { Editor } from "@hugerte/hugerte-react";
import { X } from "lucide-react";
import { useRef, useState } from "react";

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [richText, setRichText] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState(false);

    const editorRef = useRef<Editor>(null);

    const handleExport = async () => {
        if (!editorRef.current) return;
        editorRef.current.editor.editorCommands.execCommand("mceprint");
    };

    return (
        <div className="min-h-screen h-full p-4 md:p-8 bg-light-surface dark:bg-dark-surface text-gray-900 dark:text-gray-100 transition-colors">
            {!file ? (
                <UploadZone
                    setFile={setFile}
                    setRichText={setRichText}
                    setIsProcessing={setIsProcessing}
                />
            ) : (
                <div className="grid grid-cols-1 h-full max-h-svh lg:grid-cols-2 gap-6 py-2">
                    <div className="h-full w-full max-h-[80%] flex flex-col relative">
                        <FileViewer
                            file={file}
                            className="h-full w-full flex flex-col"
                        />
                        <Button
                            onClick={() => setFile(null)}
                            className="absolute z-20 top-2 left-2 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center"
                        >
                            <X className="mr-2 size-4" />
                            Reset File
                        </Button>
                    </div>
                    <div className="h-full w-full max-h-[80%] flex flex-col gap-4">
                        <RichTextEditor
                            initialValue={richText}
                            editorRef={editorRef}
                            isLoading={isProcessing}
                            onChange={setRichText}
                            height="h-full"
                        />
                        <Button
                            onClick={handleExport}
                            disabled={isProcessing}
                            className="h-fit py-2 w-full"
                        >
                            Export as PDF
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

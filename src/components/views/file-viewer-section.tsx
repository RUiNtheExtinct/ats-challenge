import { Button } from "@/components/ui/button";
import { CloudDownload, CloudUpload, X } from "lucide-react";
import dynamic from "next/dynamic";

const FileViewer = dynamic(() => import("@/components/views/file-viewer"), {
    ssr: false,
});

interface FileViewerSectionProps {
    file: File;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFileRemove: () => void;
    onDownload: () => void;
}

export function FileViewerSection({
    file,
    onFileChange,
    onFileRemove,
    onDownload,
}: FileViewerSectionProps) {
    return (
        <div className="h-full w-full flex flex-col relative overflow-y-auto">
            <FileViewer file={file} className="h-full w-full flex flex-1" />
            <Button
                onClick={onFileRemove}
                variant="default"
                className="absolute w-8 h-8 rounded-full inline-flex items-center justify-center z-20 top-2 right-2 transition"
            >
                <X className="size-6" strokeWidth={3} />
            </Button>
            <Button
                variant="default"
                className="absolute w-8 h-8 rounded-full inline-flex items-center justify-center z-20 top-2 right-12 transition"
            >
                <input
                    type="file"
                    accept=".pdf,.docx,.md,.odt,.txt"
                    onChange={onFileChange}
                    className="hidden"
                    id="file-upload-1"
                />
                <label htmlFor="file-upload-1" className="cursor-pointer">
                    <CloudUpload className="size-6" strokeWidth={3} />
                </label>
            </Button>
            <Button
                onClick={onDownload}
                variant="default"
                className="absolute w-8 h-8 rounded-full inline-flex items-center justify-center z-20 top-2 right-[5.5rem] transition"
            >
                <CloudDownload className="size-6" strokeWidth={3} />
            </Button>
        </div>
    );
}

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function UploadZone({
    handleFileUpload,
}: {
    handleFileUpload: (file: File) => void;
}) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div className="flex items-center justify-center">
            <Card
                className="w-full max-w-2xl p-8 bg-gray-100 transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <div className="flex flex-col items-center gap-6">
                    <div className="p-8 border-2 border-dashed rounded-lg border-gray-300 w-full flex flex-col items-center gap-4 hover:border-gray-400 transition-colors">
                        <Upload size={48} className="text-gray-400" />
                        <div className="text-center text-gray-500">
                            <h3 className="text-lg font-bold">
                                Upload your resume
                            </h3>
                            <p className="text-sm  mt-1">
                                Accepted file types: .pdf, .docx, .md, .odt,
                                .txt
                            </p>
                        </div>
                        <input
                            type="file"
                            accept=".pdf,.docx,.md,.odt,.txt"
                            onChange={handleInputChange}
                            className="hidden"
                            id="file-upload-2"
                        />
                        <Button asChild>
                            <label
                                htmlFor="file-upload-2"
                                className="cursor-pointer"
                            >
                                Select File
                            </label>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

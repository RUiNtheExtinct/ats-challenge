import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ACCEPTED_FILE_TYPES } from "@/lib/constants";
import { pipeline } from "@/lib/pipeline";
import { AcceptedFileType } from "@/lib/types/file";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";

export default function UploadZone({
    setFile,
    setRichText,
    setIsProcessing,
}: {
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    setRichText: React.Dispatch<React.SetStateAction<string>>;
    setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const handleFileUpload = async (file: File) => {
        try {
            if (!ACCEPTED_FILE_TYPES.includes(file.type as AcceptedFileType))
                return;
            setFile(file);
            setIsProcessing(true);
            const richText = await pipeline(file, [
                { action: "anonymize", options: { chainOfThought: false } },
                { action: "summarize", options: { chainOfThought: false } },
                { action: "reformat", options: { chainOfThought: false } },
            ]);
            setRichText(richText);
            setIsProcessing(false);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    };

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
        <div className="flex items-center justify-center h-[80vh]">
            <Card
                className="w-full max-w-2xl p-8 bg-gray-100 transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <div className="flex flex-col items-center gap-6">
                    <div className="p-8 border-2 border-dashed rounded-lg border-gray-300 w-full flex flex-col items-center gap-4 hover:border-gray-400 transition-colors">
                        <Upload size={48} className="text-gray-400" />
                        <div className="text-center">
                            <h3 className="text-lg font-semib">
                                Upload your resume
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Accepted file types: .pdf, .docx, .md, .odt,
                                .txt
                            </p>
                        </div>
                        <input
                            type="file"
                            accept=".pdf,.docx,.md,.odt,.txt"
                            onChange={handleInputChange}
                            className="hidden"
                            id="file-upload"
                        />
                        <Button asChild>
                            <label
                                htmlFor="file-upload"
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

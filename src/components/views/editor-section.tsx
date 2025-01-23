import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/views/rich-text-editor";
import { Editor } from "@hugerte/hugerte-react";
import { RefObject } from "react";

interface EditorSectionProps {
    richText: string;
    editorRef: RefObject<Editor>;
    isProcessing: boolean;
    onTextChange: (text: string) => void;
    onExport: () => void;
}

export function EditorSection({
    richText,
    editorRef,
    isProcessing,
    onTextChange,
    onExport,
}: EditorSectionProps) {
    return (
        <div className="h-full w-full flex flex-col gap-4">
            <RichTextEditor
                initialValue={richText}
                editorRef={editorRef}
                isLoading={isProcessing}
                onChange={onTextChange}
                className="h-full w-full flex"
            />
            <Button
                onClick={onExport}
                disabled={isProcessing}
                className={`h-fit py-2 w-full ${isProcessing ? "hidden" : ""}`}
            >
                Export as PDF
            </Button>
        </div>
    );
}

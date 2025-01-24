"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditorSection } from "@/components/views/editor-section";
import { FileViewerSection } from "@/components/views/file-viewer-section";
import StateViewer from "@/components/views/state-viewer";
import UploadZone from "@/components/views/upload-zone";
import { getPollingState, parseDocument, startPolling } from "@/lib/api";
import { ACCEPTED_FILE_TYPES, RESUME_HEADER } from "@/lib/constants";
import { AcceptedFileType, PipelineAction, PipelineRequest } from "@/lib/types";
import { Editor } from "@hugerte/hugerte-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [currentState, setCurrentState] = useState<
        "idle" | "parsing" | PipelineAction
    >("idle");
    const [activeTab, setActiveTab] = useState<"preview" | "editor">("preview");
    const [richText, setRichText] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState(false);
    const editorRef = useRef<Editor>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files?.[0];
        if (newFile) {
            handleFileUpload(newFile);
        }
    };

    const handleExport = async () => {
        if (!editorRef.current) return;
        console.log(editorRef.current.editor.getContent());
        editorRef.current.editor.editorCommands.execCommand("mceprint");
    };

    const handleDownload = () => {
        const downloadUrl = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = file.name;
        link.click();
        URL.revokeObjectURL(downloadUrl);
        link.remove();
    };

    const handleFileUpload = async (file: File) => {
        try {
            if (!ACCEPTED_FILE_TYPES.includes(file.type as AcceptedFileType))
                return;
            setFile(file);
            setIsProcessing(true);
            setCurrentState("parsing");
            // await new Promise((resolve) => setTimeout(resolve, 3000));
            let resultText = await parseDocument(file);
            setRichText(`${RESUME_HEADER}${resultText}`);
            const pipelineActions: PipelineRequest = [
                { action: "anonymize", options: { chainOfThought: false } },
                { action: "summarize", options: { chainOfThought: false } },
                { action: "reformat", options: { chainOfThought: false } },
            ];
            for (const action of pipelineActions) {
                setCurrentState(action.action);
                console.log(`Executing ${action.action} pipeline...`);
                const runId = await startPolling(resultText, action);
                console.log(action.action, runId);
                let pollingState = await getPollingState(runId);
                while (pollingState.status === "in-progress") {
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    pollingState = await getPollingState(runId);
                    console.log(pollingState);
                }
                if (pollingState.status === "error") {
                    throw new Error(pollingState.error);
                }
                resultText = pollingState.result;
                setRichText(`${RESUME_HEADER}${resultText}`);
            }
            setRichText(`${RESUME_HEADER}${resultText}`);
            // setRichText(`${RESUME_HEADER}Hello World!!!`);
            setCurrentState("idle");
            setIsProcessing(false);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
            setCurrentState("idle");
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex flex-col justify-center self-center h-[calc(100vh-4rem)] w-full p-4 md:p-6 bg-light-surface dark:bg-dark-surface text-gray-900 dark:text-gray-100 transition-colors">
            <StateViewer state={currentState} />
            {!file ? (
                <UploadZone handleFileUpload={handleFileUpload} />
            ) : (
                <>
                    {/* Mobile View with Tabs */}
                    <div className="block lg:hidden h-full">
                        <Tabs
                            defaultValue="preview"
                            value={activeTab}
                            onValueChange={(value) =>
                                setActiveTab(value as "preview" | "editor")
                            }
                            className="w-full h-full"
                        >
                            <TabsList className="grid w-full grid-cols-2 mb-4">
                                <TabsTrigger value="preview">
                                    Preview
                                </TabsTrigger>
                                <TabsTrigger value="editor">Editor</TabsTrigger>
                            </TabsList>
                            <TabsContent
                                value="preview"
                                className="h-[calc(100vh-12rem)]"
                            >
                                <FileViewerSection
                                    file={file}
                                    onFileChange={handleInputChange}
                                    onFileRemove={() => setFile(null)}
                                    onDownload={handleDownload}
                                />
                            </TabsContent>
                            <TabsContent
                                value="editor"
                                className="h-[calc(100vh-12rem)]"
                            >
                                <EditorSection
                                    richText={richText}
                                    editorRef={editorRef}
                                    isProcessing={isProcessing}
                                    onTextChange={setRichText}
                                    onExport={handleExport}
                                />
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Desktop View with Grid */}
                    <div className="hidden lg:grid lg:grid-cols-2 h-full gap-6 py-2 overflow-y-hidden">
                        <FileViewerSection
                            file={file}
                            onFileChange={handleInputChange}
                            onFileRemove={() => setFile(null)}
                            onDownload={handleDownload}
                        />
                        <EditorSection
                            richText={richText}
                            editorRef={editorRef}
                            isProcessing={isProcessing}
                            onTextChange={setRichText}
                            onExport={handleExport}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

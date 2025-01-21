"use client";
import { Editor } from "@hugerte/hugerte-react";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

interface Props {
    initialValue: string;
    editorRef: React.RefObject<Editor>;
    onChange: any;
    isLoading: boolean;
    className?: string;
    height?: string;
    placeholder?: string;
}

export default function RichTextEditor({
    initialValue,
    editorRef,
    onChange,
    isLoading,
    className = "",
    height = "h-full",
    placeholder = "Start typing...",
}: Props) {
    useEffect(() => {
        const handler = (e: FocusEvent) => {
            if (
                e.target instanceof Element &&
                e.target.closest(
                    ".tox-hugerte-aux, .moxman-window, .tam-assetmanager-root",
                ) !== null
            ) {
                e.stopImmediatePropagation();
            }
        };
        document.addEventListener("focusin", handler);
        return () => document.removeEventListener("focusin", handler);
    }, []);

    // Editor configuration
    const editorConfig = {
        min_height: 400,
        height: "100%",
        menubar: true,
        plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
        ],
        toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
        content_style:
            "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px }",
        placeholder: placeholder,
        branding: false,
        statusbar: true,
        resize: true,
        autoresize_bottom_margin: 20,
    };

    if (isLoading) {
        return (
            <div
                className={`flex items-center justify-center ${height} ${className} bg-background border rounded-md`}
            >
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className={`relative ${height} ${className}`}>
            <Editor
                initialValue={initialValue}
                ref={editorRef}
                init={editorConfig}
                onInit={(evt, editor) => {
                    // Ensure editor takes full height of container
                    editor.getContainer().style.height = "100%";
                    editor.getContainer().style.display = "flex";
                    editor.getContainer().style.flexDirection = "column";
                }}
                onChange={(value) => {
                    console.log(value.target);
                    onChange(value.target.level.content);
                }}
            />
        </div>
    );
}

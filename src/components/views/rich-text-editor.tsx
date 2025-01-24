"use client";
import { cn } from "@/lib/utils";
import { useUserState } from "@/store";
import { Editor } from "@hugerte/hugerte-react";
import { InitOptions } from "@hugerte/hugerte-react/lib/cjs/main/ts/components/Editor";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

interface Props {
    initialValue: string;
    editorRef: React.RefObject<Editor>;
    onChange: any;
    isLoading: boolean;
    className?: string;
    placeholder?: string;
}

export default function RichTextEditor({
    initialValue,
    editorRef,
    onChange,
    isLoading,
    className = "",
    placeholder = "Start typing...",
}: Props) {
    const { theme } = useUserState();

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
    const editorConfig: InitOptions = {
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
            "fontfamily fontsize | " +
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
        // skin: theme === "dark" ? "oxide-dark" : "oxide",
        // content_css: theme === "dark" ? "dark" : "default",
    };

    if (isLoading) {
        return (
            <div
                className={cn(
                    "flex h-full w-full items-center justify-center bg-background border rounded-lg",
                    className,
                )}
            >
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className={cn("rounded-lg", className)}>
            <Editor
                initialValue={initialValue}
                ref={editorRef}
                init={editorConfig}
                onInit={(evt, editor) => {
                    // Ensure editor takes full height of container
                    editor.getContainer().style.width = "100%";
                    editor.getContainer().style.height = "100%";
                    editor.getContainer().style.minHeight = "80svh";
                    editor.getContainer().style.display = "flex";
                    editor.getContainer().style.flexDirection = "column";
                }}
            />
        </div>
    );
}

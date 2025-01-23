export const APP_NAME = "ResumeAI";
export const APP_TAGLINE = "Anonymize your Resume";
export const APP_DESCRIPTION =
    "Anonymize your resume in seconds. No data is sent to our servers.";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export const ACCEPTED_FILE_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/markdown",
    "application/vnd.oasis.opendocument.text",
    "text/plain",
] as const;

export const AVAILABLE_PIPELINE_ACTIONS = [
    "anonymize",
    "summarize",
    "reformat",
] as const;

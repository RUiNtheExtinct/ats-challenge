export const APP_NAME = "ResumeAI";
export const APP_TAGLINE = "Anonymize your Resume";
export const APP_DESCRIPTION =
    "Anonymize your resume in seconds. No data is sent to our servers.";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
export const RESUME_HEADER = `
    <header style="background-color: rgb(0, 0, 0); height: 75px; width: 100%; margin: 0; padding: 0; display: flex; align-items: center;">
        <img src="logo.jpeg" alt="" style="height: 70px; width: auto; margin-left: 0;">
    </header>
`;

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

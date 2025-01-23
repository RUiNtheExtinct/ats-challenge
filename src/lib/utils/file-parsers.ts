"use server";

import { load } from "cheerio";
import yaml from "js-yaml";
import JSZip from "jszip";
import mammoth from "mammoth";
import { marked } from "marked";
import PDFParser from "pdf2json";

/**
 * Utility function to determine file type and parse accordingly
 * @param file - File object to parse
 * @returns Promise with extracted text and metadata
 */
export async function parseDocument(file: File): Promise<string> {
    const fileName = file.name.toLowerCase();
    const mimeType = file.type;

    switch (mimeType) {
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return parseDocx(file);
        case "application/vnd.oasis.opendocument.text":
            return parseOdt(file);
        case "application/pdf":
            return parsePdf(file);
        case "text/markdown":
            return parseMarkdown(file);
        case "text/plain":
            return parseTextFile(file);
        default:
            throw new Error(
                "Unsupported file type. Please provide .docx, .odt, .pdf, .md, or .txt files.",
            );
    }
}

/**
 * Parses .docx files using mammoth
 * @param file - File object containing the .docx document
 * @returns Promise with extracted text and metadata
 */
async function parseDocx(file: File): Promise<string> {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await mammoth.extractRawText({ buffer });

        return result.value.trim();
    } catch (error) {
        console.error("Error parsing docx file:", error);
        throw new Error("Failed to parse .docx file");
    }
}

/**
 * Parses .odt files by extracting content.xml and meta.xml
 * @param file - File object containing the .odt document
 * @returns Promise with extracted text and metadata
 */
async function parseOdt(file: File): Promise<string> {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const zip = new JSZip();
        const zipContent = await zip.loadAsync(buffer);

        const contentXml = await zipContent.file("content.xml").async("text");
        const $content = load(contentXml, { xmlMode: true });

        const metaXml = await zipContent.file("meta.xml").async("text");
        const $meta = load(metaXml, { xmlMode: true });

        const textContent = $content("text\\:p, text\\:h")
            .map((_, element) => $content(element).text().trim())
            .get()
            .join("\n")
            .trim();

        const metadata = {
            title: $meta("dc\\:title").text(),
            creator: $meta("dc\\:creator").text(),
            createdAt: new Date($meta("meta\\:creation-date").text()),
            modifiedAt: new Date($meta("dc\\:date").text()),
            language: $meta("dc\\:language").text(),
            keywords: $meta("meta\\:keyword")
                .text()
                .split(",")
                .map((k) => k.trim())
                .filter(Boolean),
            pageCount: parseInt($meta("meta\\:page-count").text()) || undefined,
        };

        return textContent;
    } catch (error) {
        console.error("Error parsing odt file:", error);
        throw new Error("Failed to parse .odt file");
    }
}

/**
 * Parses PDF files using pdf2json
 * @param file - File object containing the PDF document
 * @returns Promise with extracted text and metadata
 */
async function parsePdf(file: File): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const pdfParser = new PDFParser(this, true);

            pdfParser.on("pdfParser_dataReady", (pdfData) => {
                try {
                    const text = pdfData.Pages.map((page) => {
                        return page.Texts.map((text) => {
                            return decodeURIComponent(text.R[0].T);
                        }).join(" ");
                    }).join("\n");

                    const title = pdfData.Meta?.Title?.toString() || file.name;
                    const author =
                        pdfData.Meta?.Author?.toString() || "Anonymous";
                    const subject =
                        pdfData.Meta?.Subject?.toString() || "Resume";
                    const keywords =
                        pdfData.Meta?.Keywords?.toString()
                            ?.split(",")
                            .map((k) => k.trim())
                            .filter(Boolean) || [];
                    const creator =
                        pdfData.Meta?.Creator?.toString() || "Anonymous";
                    const createdAt = pdfData.Meta?.CreationDate
                        ? new Date(pdfData.Meta?.CreationDate as Date)
                        : undefined;
                    const modifiedAt = pdfData.Meta?.ModDate
                        ? new Date(pdfData.Meta?.ModDate as Date)
                        : undefined;
                    const pageCount = pdfData.Pages.length;
                    const metadata = {
                        title: title,
                        author: author,
                        subject: subject,
                        keywords: keywords,
                        creator: creator,
                        createdAt: createdAt,
                        modifiedAt: modifiedAt,
                        pageCount: pageCount,
                    };

                    resolve(text.trim());
                } catch (error) {
                    reject(new Error("Failed to process PDF data"));
                }
            });

            pdfParser.on("pdfParser_dataError", (error) => {
                reject(new Error(`PDF parsing error: ${error}`));
            });

            pdfParser.parseBuffer(buffer);
        } catch (error) {
            reject(new Error("Failed to parse PDF file"));
        }
    });
}

/**
 * Parses Markdown files
 * @param file - File object containing the Markdown document
 * @returns Promise with extracted text and basic metadata
 */
async function parseMarkdown(
    file: File,
    stripHtml: boolean = false,
): Promise<string> {
    try {
        const text = await file.text();
        let extractedText: string;
        let metadata: any = {
            format: "markdown",
            createdAt: new Date(file.lastModified),
        };

        const frontmatterMatch = text.match(/^---\n([\s\S]*?)\n---/);
        if (frontmatterMatch) {
            const frontmatter = yaml.load(frontmatterMatch[1]);
            metadata = { ...metadata, ...frontmatter };
            extractedText = text.slice(frontmatterMatch[0].length).trim();
        } else {
            extractedText = text;
        }

        if (stripHtml) {
            const html = await marked(extractedText);
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;
            extractedText = tempDiv.textContent || tempDiv.innerText || "";
        }

        return extractedText.trim();
    } catch (error) {
        console.error("Error parsing markdown file:", error);
        throw new Error("Failed to parse markdown file");
    }
}

/**
 * Parses plain text files
 * @param file - File object containing the text file
 * @returns Promise with extracted text and basic metadata
 */
async function parseTextFile(file: File): Promise<string> {
    try {
        const text = await file.text();
        const metadata = {
            format: "plain text",
            createdAt: new Date(file.lastModified),
            modifiedAt: new Date(file.lastModified),
        };
        return text.trim();
    } catch (error) {
        console.error("Error parsing text file:", error);
        throw new Error("Failed to parse text file");
    }
}

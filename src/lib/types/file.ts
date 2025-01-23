import { ACCEPTED_FILE_TYPES } from "@/lib/constants";
import { StringArrayToUnion } from "@/lib/types";

export type AcceptedFileType = StringArrayToUnion<typeof ACCEPTED_FILE_TYPES>;

export interface ParserResult {
    text: string;
    metadata: {
        title?: string;
        author?: string;
        subject?: string;
        keywords?: string[];
        creator?: string;
        createdAt?: Date;
        modifiedAt?: Date;
        pageCount?: number;
        company?: string;
        category?: string;
        format?: string;
        language?: string;
    };
}

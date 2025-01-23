import { AVAILABLE_PIPELINE_ACTIONS } from "@/lib/constants";
import { StringArrayToUnion } from "@/lib/types";

export type PipelineAction = StringArrayToUnion<
    typeof AVAILABLE_PIPELINE_ACTIONS
>;

export type PipelineRequest = Array<PipelineRequestAction>;

export type PipelineRequestAction = {
    action: PipelineAction;
    options?: AIPipelineOptions;
};

export type AIPipelineOptions = {
    chainOfThought?: boolean;
};

export interface ChainOfThoughtResponse {
    thoughts: Array<{
        step: number;
        solution: Array<{
            expert: number;
            thought: string;
            reasonings: Array<string>;
            issues: Array<string>;
        }>;
    }>;
    finalAnswer: string;
}

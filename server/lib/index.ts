import {type ZodIssue} from "zod"

//return single string of an error message from zodIssue
export const zodIssueError = (issues: ZodIssue[]): string => {
    return issues.map((issue) => issue.message).join(", ");
}

// generate magic link (random token)
export const generateMagicLink = (): string => {
    return Math.random().toString(36).substring(2);
}


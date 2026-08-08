import type { ToolRequest }
    from "../types/ToolRequest";

import { generateToolRequests }
    from "../tools/generateToolRequests";

export function generateToolRequestsWithLLM(
    message: string
): ToolRequest[] {

    return generateToolRequests(message);
}



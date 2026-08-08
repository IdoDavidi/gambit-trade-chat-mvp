import type { ToolRequest } from "../types/ToolRequest";
import { generateToolRequests } from "../tools/generateToolRequests";

export async function generateToolRequestsWithLLM(
    message: string
): Promise<ToolRequest[]> {
    try {
        const response = await fetch(
            "http://localhost:3001/api/tool-requests",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(
                `LLM request failed with status ${response.status}`
            );
        }

        const data = await response.json();

        if (!Array.isArray(data.toolRequests)) {
            throw new Error("Invalid LLM response shape.");
        }

        return data.toolRequests;
    } catch (error) {
        console.warn(
            "LLM adapter fallback activated:",
            error
        );

        return generateToolRequests(message);
    }
}



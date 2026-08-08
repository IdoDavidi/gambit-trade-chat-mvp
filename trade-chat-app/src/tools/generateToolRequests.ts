import type { ToolRequest }
    from "../types/ToolRequest";

export function generateToolRequests(
    message: string
): ToolRequest[] {
    const lowerMessage =
        message.toLowerCase();

    if (lowerMessage.includes("lebron")) {
        return [
            {
                tool: "setTeams",

                arguments: {
                    teamA: "Los Angeles Lakers",
                    teamB: "Boston Celtics",
                },
            },

            {
                tool: "addPlayer",

                arguments: {
                    player: "LeBron James",
                    fromTeam: "Los Angeles Lakers",
                    toTeam: "Boston Celtics",
                },
            },

            {
                tool: "requestVerdict",

                arguments: {},
            },
        ];
    }

    if (lowerMessage.includes("curry")) {
        return [
            {
                tool: "setTeams",

                arguments: {
                    teamA: "Golden State Warriors",
                    teamB: "Miami Heat",
                },
            },

            {
                tool: "addPlayer",

                arguments: {
                    player: "Stephen Curry",
                    fromTeam: "Golden State Warriors",
                    toTeam: "Miami Heat",
                },
            },

            {
                tool: "requestVerdict",

                arguments: {},
            },
        ];
    }

    return [
        {
            tool: "requestVerdict",

            arguments: {},
        },
    ];
}



import type {
    TradePlayer,
    TradeState,
    TradeVerdict,
} from "../state/tradeState";

import type { ToolRequest } from "../types/ToolRequest";

import { generateToolRequestsWithLLM } from "../llm/llmAdapter";

import { setTeams } from "../tools/setTeams";
import { addPlayer } from "../tools/addPlayer";
import { requestVerdict } from "../tools/requestVerdict";

export async function processUserMessage(
    message: string
): Promise<TradeState> {
    const toolRequests =
        await generateToolRequestsWithLLM(message);

    let teams: string[] = [];
    let players: TradePlayer[] = [];
    let verdict: TradeVerdict | null = null;

    const executionLog: string[] = [];

    for (const request of toolRequests) {
        if (request.tool === "setTeams") {
            teams = executeSetTeams(request);

            executionLog.push(
                `setTeams(${request.arguments.teamA}, ${request.arguments.teamB})`
            );

            continue;
        }

        if (request.tool === "addPlayer") {
            players = [
                ...players,
                executeAddPlayer(request),
            ];

            executionLog.push(
                `addPlayer(${request.arguments.player})`
            );

            continue;
        }

        if (request.tool === "requestVerdict") {
            verdict =
                requestVerdict(players.length);

            executionLog.push(
                "requestVerdict()"
            );

            continue;
        }
    }

    if (!verdict) {
        verdict =
            requestVerdict(players.length);

        executionLog.push(
            "requestVerdict()"
        );
    }

    const assistantMessage =
        [
            "Trade interpreted successfully.",
            "",
            "Tools executed:",
            ...executionLog,
            "",
            `Verdict: ${verdict?.isValid
                ? "Valid"
                : "Invalid"
            }`,
            verdict?.summary ?? "",
        ].join("\n");

    return {
        lastMessage: message,
        assistantMessage,
        teams,
        players,
        verdict,
        executionLog,
    };
}

function executeSetTeams(
    request: ToolRequest
): string[] {
    return setTeams(
        request.arguments.teamA,
        request.arguments.teamB
    );
}

function executeAddPlayer(
    request: ToolRequest
): TradePlayer {
    return addPlayer(
        request.arguments.player,
        request.arguments.fromTeam,
        request.arguments.toTeam
    );
}



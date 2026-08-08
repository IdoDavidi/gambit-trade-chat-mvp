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

    for (const request of toolRequests) {
        if (request.tool === "setTeams") {
            teams = executeSetTeams(request);
            continue;
        }

        if (request.tool === "addPlayer") {
            players = [
                ...players,
                executeAddPlayer(request),
            ];
            continue;
        }

        if (request.tool === "requestVerdict") {
            verdict = requestVerdict(players.length);
            continue;
        }
    }

    if (!verdict) {
        verdict = requestVerdict(players.length);
    }

    return {
        lastMessage: message,
        teams,
        players,
        verdict,
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



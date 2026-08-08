import type {
    TradePlayer,
    TradeState,
} from "../state/tradeState";

import type { ToolRequest } from "../types/ToolRequest";

import { generateToolRequestsWithLLM }
    from "../llm/llmAdapter";
import { setTeams } from "../tools/setTeams";
import { addPlayer } from "../tools/addPlayer";
import { requestVerdict }
    from "../tools/requestVerdict";

export function processUserMessage(
    message: string
): TradeState {
    const toolRequests =
        generateToolRequestsWithLLM(message);

    let teams: string[] = [];
    let players: TradePlayer[] = [];

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
    }

    const verdict =
        requestVerdict(players.length);

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




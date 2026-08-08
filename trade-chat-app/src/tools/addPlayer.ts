import type { TradePlayer } from "../state/tradeState";

export function addPlayer(
    name: string,
    fromTeam: string,
    toTeam: string
): TradePlayer {
    return {
        name,
        fromTeam,
        toTeam,
    };
}



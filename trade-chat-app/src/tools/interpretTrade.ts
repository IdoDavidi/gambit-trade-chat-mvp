import type { TradeState } from "../state/tradeState";

export function interpretTrade(
    message: string
): TradeState {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("lebron")) {
        return {
            lastMessage: message,

            teams: [
                "Los Angeles Lakers",
                "Boston Celtics",
            ],

            players: [
                {
                    name: "LeBron James",
                    fromTeam: "Los Angeles Lakers",
                    toTeam: "Boston Celtics",
                },
            ],
        };
    }

    if (lowerMessage.includes("curry")) {
        return {
            lastMessage: message,

            teams: [
                "Golden State Warriors",
                "Miami Heat",
            ],

            players: [
                {
                    name: "Stephen Curry",
                    fromTeam: "Golden State Warriors",
                    toTeam: "Miami Heat",
                },
            ],
        };
    }

    return {
        lastMessage: message,
        teams: [],
        players: [],
    };
}



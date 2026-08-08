import type { TradeState } from "../state/tradeState";
import { setTeams } from "./setTeams";
import { addPlayer } from "./addPlayer";


export function interpretTrade(
    message: string
): TradeState {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("lebron")) {
        return {
            lastMessage: message,

            teams: setTeams(
                "Los Angeles Lakers",
                "Boston Celtics"
            ),

            players: [
                addPlayer(
                    "LeBron James",
                    "Los Angeles Lakers",
                    "Boston Celtics"
                ),
            ],
        };
    }

    if (lowerMessage.includes("curry")) {
        return {
            lastMessage: message,

            teams: setTeams(
                "Golden State Warriors",
                "Miami Heat"
            ),

            players: [
                addPlayer(
                    "Stephen Curry",
                    "Golden State Warriors",
                    "Miami Heat"
                ),
            ],
        };
    }
}



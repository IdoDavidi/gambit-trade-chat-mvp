export interface TradePlayer {
    name: string;
    fromTeam: string;
    toTeam: string;
}

export interface TradeVerdict {
    isValid: boolean;
    summary: string;
}

export interface TradeState {
    lastMessage: string;

    assistantMessage: string;

    teams: string[];

    players: TradePlayer[];

    verdict: TradeVerdict | null;

    executionLog: string[];
}

export const initialTradeState: TradeState = {
    lastMessage: "",
    assistantMessage: "",
    teams: [],
    players: [],
    verdict: null,
    executionLog: [],
};



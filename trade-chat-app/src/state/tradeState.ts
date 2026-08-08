export interface TradePlayer {
    name: string;
    fromTeam: string;
    toTeam: string;
}

export interface TradeState {
    lastMessage: string;
    teams: string[];
    players: TradePlayer[];

    verdict: TradeVerdict | null;
}

export const initialTradeState: TradeState = {
    lastMessage: "",
    teams: [],
    players: [],
    verdict: null,
};

export interface TradeVerdict {
    isValid: boolean;
    summary: string;
}



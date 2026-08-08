export interface TradePlayer {
    name: string;
    fromTeam: string;
    toTeam: string;
}

export interface TradeState {
    lastMessage: string;
    teams: string[];
    players: TradePlayer[];
}

export const initialTradeState: TradeState = {
    lastMessage: "",
    teams: [],
    players: [],
};



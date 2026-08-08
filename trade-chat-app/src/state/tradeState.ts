export interface TradeState {
    lastMessage: string;
    teams: string[];
    players: string[];
}

export const initialTradeState: TradeState = {
    lastMessage: "",
    teams: [],
    players: [],
};



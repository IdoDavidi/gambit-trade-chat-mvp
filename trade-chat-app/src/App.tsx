import { useState } from "react";
import ChatPanel from "./components/ChatPanel";
import TradeMirror from "./components/TradeMirror";
import "./App.css";

import {
    initialTradeState,
    type TradeState,
} from "./state/tradeState";
import { interpretTrade } from "./tools/interpretTrade";

function App() {
    const [tradeState, setTradeState] =
        useState<TradeState>(initialTradeState);

    const handleSend = (message: string) => {
        const nextState = interpretTrade(message);

        setTradeState(nextState);
    };

    return (
        <div className="app-container">
            <ChatPanel onSend={handleSend} />

            <TradeMirror tradeState={tradeState} />
        </div>
    );
}

export default App;



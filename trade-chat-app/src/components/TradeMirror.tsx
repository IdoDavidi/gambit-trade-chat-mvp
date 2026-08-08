import type { TradeState } from "../state/tradeState";

interface TradeMirrorProps {
    tradeState: TradeState;
}

export default function TradeMirror({
    tradeState,
}: TradeMirrorProps) {
    return (
        <div className="panel">
            <h2>Trade State</h2>

            <div>
                <strong>Last Message:</strong>
            </div>

            <div>{tradeState.lastMessage || "No trade data yet."}</div>
        </div>
    );
}



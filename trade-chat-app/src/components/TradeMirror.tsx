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

            <h3>Teams</h3>

            <ul>
                {tradeState.teams.map((team) => (
                    <li key={team}>{team}</li>
                ))}
            </ul>

            <h3>Players</h3>

            <ul>
                {tradeState.players.map((player) => (
                    <li key={player.name}>
                        {player.name}
                        {" | "}
                        {player.fromTeam}
                        {" → "}
                        {player.toTeam}
                    </li>
                ))}
            </ul>

            <h3>Last Message</h3>

            <div>
                {tradeState.lastMessage || "No message yet."}
            </div>
        </div>
    );
}



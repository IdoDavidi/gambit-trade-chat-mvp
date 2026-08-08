import { useState } from "react";

interface ChatPanelProps {
    onSend: (message: string) => void | Promise<void>;
}

export default function ChatPanel({
    onSend,
}: ChatPanelProps) {
    const [message, setMessage] = useState("");

    const handleSend = async () => {
        if (!message.trim()) {
            return;
        }

        await onSend(message);
        setMessage("");
    };

    return (
        <div className="panel">
            <h2>Chat</h2>

            <input
                type="text"
                value={message}
                placeholder="Enter trade request..."
                onChange={(event) =>
                    setMessage(event.target.value)
                }
            />

            <button onClick={handleSend}>
                Send
            </button>
        </div>
    );
}



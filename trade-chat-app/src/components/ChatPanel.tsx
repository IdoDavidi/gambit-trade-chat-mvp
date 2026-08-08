interface ChatPanelProps {
    onSend: (message: string) => void;
}

import { useState } from "react";

export default function ChatPanel({ onSend }: ChatPanelProps) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (!message.trim()) {
            return;
        }

        onSend(message);
        setMessage("");
    };

    return (
        <div className= "panel" >
        <h2>Chat < /h2>

        < input
    type = "text"
    value = { message }
    placeholder = "Enter trade request..."
    onChange = {(e) => setMessage(e.target.value)
}
/>

    < button onClick = { handleSend } > Send < /button>
        < /div>
  );
}



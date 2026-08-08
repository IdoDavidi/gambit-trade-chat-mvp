## Implementation Milestone 7

### Goal

Introduce Tool Requests.

### Motivation

Current implementation still transforms user messages directly into TradeState.

Future LLM integration should generate requests for actions rather than modifying state directly.

This milestone introduces a Tool Request abstraction.

### Changes

Created:

src/types/ToolRequest.ts

Created:

src/tools/generateToolRequests.ts

### ToolRequest Structure

```ts
interface ToolRequest {
  tool: string;
  arguments: Record<string, string>;
}
```

### Example

Input:

Trade LeBron to Boston

Produces:

```json
[
  {
    "tool": "setTeams",
    "arguments": {
      "teamA": "Los Angeles Lakers",
      "teamB": "Boston Celtics"
    }
  },
  {
    "tool": "addPlayer",
    "arguments": {
      "player": "LeBron James",
      "fromTeam": "Los Angeles Lakers",
      "toTeam": "Boston Celtics"
    }
  }
]
```

### Architectural Change

Before:

ChatPanel
→ Harness
→ TradeState

After:

ChatPanel
→ Harness
→ Tool Requests
→ Tool Layer
→ TradeState

### Importance

This is the first architecture that resembles future LLM tool-calling.

Future LLM behavior:

Message
→ Tool Requests

Harness behavior:

Tool Requests
→ Execute Tools

### Success Criteria

✅ ToolRequest abstraction introduced

✅ TradeState no longer conceptualized as direct interpreter output

✅ Future LLM integration path established

### Status

Completed



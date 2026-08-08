## Implementation Milestone 10

### Goal

Introduce an LLM Adapter Layer.

### Motivation

The project previously generated ToolRequest objects through deterministic parsing.

Current deterministic behavior:

generateToolRequests(message)

uses simple string matching such as:

- lebron
- curry

The goal of this milestone is not to connect a real LLM yet.

The goal is to create a stable adapter boundary where real LLM integration can later replace deterministic parsing without rewriting the rest of the system.

### Changes

Created:

src/llm/llmAdapter.ts

Updated:

src/harness/chatHarness.ts

The harness now calls:

generateToolRequestsWithLLM(message)

instead of directly calling:

generateToolRequests(message)

### Current Implementation

The LLM adapter is currently a stub.

It delegates to the existing deterministic tool request generator.

Current flow:

generateToolRequestsWithLLM()
→ generateToolRequests()
→ ToolRequest[]

### Architecture Before

ChatHarness
→ generateToolRequests
→ ToolRequest[]
→ Tool Execution
→ TradeState

### Architecture After

ChatHarness
→ LLM Adapter
→ ToolRequest[]
→ Tool Execution
→ TradeState

### Future Evolution

Current adapter implementation:

Deterministic mock behavior.

Future adapter implementation:

Real LLM call.

Possible future flow:

User message
→ LLM prompt
→ LLM returns ToolRequest[]
→ Harness executes ToolRequest[]
→ TradeState updates

### Why This Matters

The important architectural achievement is that the rest of the application no longer depends on how tool requests are generated.

The source of tool requests can evolve from:

- deterministic parser
- mock LLM
- real LLM
- Azure OpenAI
- OpenAI
- Claude

without changing:

- App.tsx
- ChatPanel.tsx
- TradeMirror.tsx
- TradeState
- setTeams
- addPlayer
- Harness execution loop

### Current Architecture

ChatPanel
→ ChatHarness
→ LLM Adapter
→ ToolRequest[]
→ Harness Execution Loop
→ Tool Layer
→ TradeState
→ TradeMirror

### Validation

Verified behavior remains unchanged:

Input:

Trade LeBron to Boston

Output:

- Los Angeles Lakers
- Boston Celtics
- LeBron James | Los Angeles Lakers → Boston Celtics

Input:

Trade Curry to Miami

Output:

- Golden State Warriors
- Miami Heat
- Stephen Curry | Golden State Warriors → Miami Heat

Unknown input:

Produces empty trade state while preserving Last Message.

### Success Criteria

✅ LLM adapter created

✅ Harness routes through adapter

✅ Existing behavior preserved

✅ Real LLM integration point established

✅ Deterministic parser isolated behind adapter boundary

### Status

Completed



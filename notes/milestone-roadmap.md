# Future Milestones Roadmap

This document summarizes the remaining planned milestones after Milestone 10.

The goal is to finish the Gambit HAPI Trade Chat MVP without unnecessary architectural detours and while staying aligned with the project principles:

- Tool Boundaries
- Explainability
- Traceability
- LLM Harness Design
- Chat-First Interaction
- Shared Trade State

---

# Current State

Completed:

✅ Milestone 1 - React State Mirror

✅ Milestone 2 - Structured TradeState

✅ Milestone 3 - Interpreter Extraction

✅ Milestone 4 - TradePlayer Domain Model

✅ Milestone 5 - Deterministic Tool Layer

✅ Milestone 6 - Chat Harness Layer

✅ Milestone 7 - ToolRequest Abstraction

✅ Milestone 8 - Harness Execution Loop

✅ Milestone 9 - Tool Registry

✅ Milestone 10 - LLM Adapter Layer

Current architecture:

ChatPanel
→ ChatHarness
→ LLM Adapter
→ ToolRequest[]
→ Harness Execution Loop
→ Tool Layer
→ TradeState
→ TradeMirror

---

# Milestone 11

## Validation Layer

### Goal

Introduce trade validation.

### Motivation

The current application can:

- interpret trade requests
- generate tool requests
- execute tools
- update trade state

But it cannot determine whether a trade is valid.

### Planned Additions

Create:

src/tools/requestVerdict.ts

Create:

src/services/mockValidationService.ts

Extend:

TradeState

Add:

```ts
verdict
```

### Target Flow

ChatPanel
→ ChatHarness
→ LLM Adapter
→ ToolRequest[]
→ Tool Execution
→ TradeState
→ requestVerdict
→ Mock Validation Service
→ Verdict
→ TradeMirror

### Expected Result

The GUI should display:

- Valid Trade
or
- Invalid Trade

along with a summary.

---

# Milestone 12

## Explainability Layer

### Goal

Explain what happened.

### Motivation

The assignment repeatedly emphasizes:

- Explainability
- User Trust
- Traceability

### Planned Additions

Track:

- Tool calls
- State changes
- Validation events

### Example

Execution Log

1. setTeams(Lakers, Celtics)

2. addPlayer(LeBron James)

3. requestVerdict()

### Expected Result

The user can understand:

- what tools executed
- in what order
- why the current trade state exists

---

# Milestone 13

## Real LLM Integration

### Goal

Replace deterministic parsing.

### Current Behavior

generateToolRequests()

contains:

```ts
if (message.includes("lebron"))
```

```ts
if (message.includes("curry"))
```

### Future Behavior

LLM Adapter performs a real model call.

Example providers:

- Azure OpenAI
- OpenAI
- Claude

### Target Flow

User Message
→ LLM
→ ToolRequest[]
→ Tool Execution
→ TradeState

### Expected Result

The application can interpret unseen 



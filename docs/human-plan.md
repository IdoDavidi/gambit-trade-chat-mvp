# Human Plan

## Goal

Build a chat-first NBA trade assistant where natural language controls trade construction and the GUI acts as a real-time mirror of the current trade state.

The primary goal is to demonstrate a clean LLM harness and tool-calling architecture rather than complete NBA trade functionality.

This prototype should show that a user can describe a trade conversationally, the model can translate that intent into structured tool calls, the application can mutate trade state deterministically, and both the chat and GUI can explain the resulting trade verdict.

## Problem Framing

The reference bball-GM website is currently mouse-driven. A user clicks teams, players, and picks in a graphical interface, then the site validates the trade and displays the result.

The onboarding task asks for the interaction model to be flipped:

- Conversation becomes the primary input.
- The GUI becomes a live mirror of conversation state.
- Trade validation output must appear naturally in chat as well as in the GUI.
- The model should not directly own trade state or validation logic.
- A controlled tool layer should perform deterministic actions.

The main product question is not "can I rebuild a full NBA trade machine?" The main product question is "can I design a trustworthy chat-first interface over a trade-building system?"

## Human Judgment

My human judgment is to keep the MVP intentionally small and focused.

This is because the assignment emphasizes HAPI Flow, harness design, tool boundaries, explainability, traceability, and QA. Building every trade-machine feature would create unnecessary scope risk and could weaken the clarity of the core architecture.

The MVP should prove the central interaction pattern clearly:

1. User describes a trade in natural language.
2. The LLM chooses structured tools.
3. The tool layer updates trade state.
4. The GUI mirrors the state.
5. A verdict is requested.
6. The verdict is explained in chat and shown in the GUI.

## MVP Scope

Included:

- Two-team trades.
- Team selection.
- Add players to a trade.
- Remove players from a trade.
- Request a trade verdict.
- Chat history.
- GUI state mirror.
- Verdict shown in chat.
- Verdict shown in GUI.
- Traceable state updates after each chat turn.
- Plain-language explanation of trade validity or invalidity.
- Error handling for unclear user intent or validation failure.

Excluded:

- Three-team and four-team trades.
- Draft pick routing.
- Sign-and-trade workflows.
- Salary override scenarios.
- Free-agent signing workflows.
- Production-grade NBA trade support.
- Full CBA rule implementation.
- Full automated QA pipeline.

## Architecture Principles

### Chat-first interaction

The user should be able to drive the trade primarily through chat. The GUI should help the user understand the resulting state, but should not be the primary input mechanism.

### Model as reasoning layer

The LLM should interpret user intent and decide which tool or tools should be called.

The model should not directly mutate application state. The model should not directly call external APIs. The model should not return one large final JSON object as a shortcut around tool usage.

### Tool layer as execution layer

The tool layer should expose basic trade-building actions such as:

- set teams
- add player
- remove player
- clear trade
- request verdict

Each tool should perform one meaningful action and return a clear result.

The tool layer is responsible for deterministic behavior, state mutation, validation calls, and error handling.

### Harness as orchestration layer

The LLM harness should be the single controlled place where model calls happen.

The harness is responsible for:

- system prompt
- message history
- available tools
- current trade state
- model response
- tool-call execution
- tool results
- final assistant response

The harness should support an agentic loop where the model can call a tool, receive the tool result, and continue until the user turn is resolved.

## API vs Tool Layer

The bball-GM API provides technical endpoints such as fetching teams, fetching players, and validating trades.

The tool layer provides product-level actions that the model can safely use.

For example:

- The model calls `request_verdict`.
- The `request_verdict` tool prepares the current trade payload.
- The tool calls the validation API or mock validation service.
- The tool returns a structured result to the harness.
- The assistant explains the verdict to the user.

This separation is important because the model should not need to know API URLs, request schemas, or implementation details. If the API changes later, the tool can be updated without changing the model-facing interface.

## Proposed Initial Tools

### set_teams

Purpose:

Set the two teams participating in the trade.

Expected responsibility:

- Validate that two teams are present.
- Update trade state.
- Return the selected teams.

### add_player

Purpose:

Add a player to the trade.

Expected responsibility:

- Associate the player with a sending team and receiving team.
- Update trade state.
- Return what changed.

### remove_player

Purpose:

Remove a player from the trade.

Expected responsibility:

- Remove the player from current trade state.
- Return what changed.

### clear_trade

Purpose:

Reset the current trade.

Expected responsibility:

- Clear all selected teams, players, verdicts, and errors.
- Return a clean state.

### request_verdict

Purpose:

Ask for validation of the current trade.

Expected responsibility:

- Build a validation payload from trade state.
- Call bball-GM validation API if feasible.
- Use a mock validation result if real validation is blocked or too costly for the MVP.
- Return validity, summary, team salary math, violations, and applied rules when available.

## Acceptance Criteria

The MVP is acceptable if:

- User can describe a simple two-team trade in natural language.
- The model converts user intent into tool calls.
- Tool calls mutate trade state.
- GUI mirrors the latest trade state.
- User can request or receive a verdict.
- Verdict appears in chat.
- Verdict appears in GUI.
- User can understand what changed after each chat turn.
- The system handles unclear input without silently failing.
- The documentation clearly explains MVP scope, architecture, and tradeoffs.

## UX Principles

- Chat is the primary interface.
- GUI is a visualization layer.
- Every state change should be visible.
- Errors should be explained in plain language.
- Trade legality should be explainable.
- The user should not need to read raw JSON.
- The assistant should summarize important verdict details without hiding critical violations.
- The interface should make clear what is supported and what is outside MVP scope.

## Explainability

When a trade verdict is returned, the chat should explain:

- Whether the trade is valid.
- The headline reason.
- Each team's salary in and salary out when available.
- Any violations when available.
- Any relevant CBA rule citations when available.

The GUI can show the structured version, while the chat provides a readable interpretation.

## Traceability

Each chat turn should make it possible to reconstruct what happened.

For example:

- User message: "Send Player A from Team X to Team Y."
- Tool call: `set_teams`
- Tool call: `add_player`
- State change: Team X sends Player A, Team Y receives Player A.
- Optional tool call: `request_verdict`
- Result: Valid or invalid, with explanation.

This matters because users need to trust and audit a chat-first system. The product should not feel like a black box.

## QA Approach

Initial QA will focus on manual end-to-end checks against the running app.

The QA plan should verify:

- Simple valid-looking trade flow.
- Invalid or incomplete trade flow.
- Removing a player.
- Clearing the trade.
- Chat and GUI staying synchronized.
- Verdict appearing in both chat and GUI.
- Error handling for unclear input.

If time allows, one automated browser test can be added for the happy path: user sends a trade message, state updates, and GUI reflects the change.

## Known Risks

### Risk: Overbuilding

Trying to support too many trade types could distract from the required harness and tool design.

Mitigation:

Keep MVP limited to two-team player trades.

### Risk: Real API integration complexity

The bball-GM API may require exact player IDs, team IDs, and trade payload structure.

Mitigation:

Use the real API if feasible. If not, provide a clearly marked mock validation path while preserving the same `request_verdict` tool boundary.

### Risk: Weak explainability

A verdict shown only as JSON would not satisfy the chat-first product goal.

Mitigation:

Render verdicts in plain language with structured supporting details.

### Risk: Chat and GUI desynchronization

The chat and GUI could drift if they maintain separate state.

Mitigation:

Use one shared trade state object. Chat, tools, and GUI should all read from the same source of truth.

## Success Definition

This project succeeds if a reviewer can see a clear chat-first trade-building experience and understand the architecture behind it.

The implementation does not need to be a complete NBA trade machine. It needs to clearly demonstrate:

- Human-scoped MVP.
- LLM harness.
- Tool-calling loop.
- Deterministic tool execution.
- Shared trade state.
- GUI mirror.
- Verdict presentation.
- Explainability.
- Traceability.
- Honest documentation of limitations.


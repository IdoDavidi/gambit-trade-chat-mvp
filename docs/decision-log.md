# Decision Log

## 2026-08-08

### Decision 1

Scope MVP to two-team trades.

Reason:

The assignment is evaluating harness quality, tool boundaries, explainability, and architecture. Two-team trades are sufficient to demonstrate the core interaction model while controlling scope.

### Decision 2

Use bball-GM validation instead of implementing trade legality.

Reason:

Explicitly encouraged in assignment material. The focus is the interaction layer rather than reproducing NBA CBA rules.

### Decision 3

Chat-first design.

Reason:

Required by task description. Conversation should be the primary way users interact with the application.

### Decision 4

GUI acts as a state mirror.

Reason:

Required by task description. The GUI should visualize trade state rather than serve as the primary input mechanism.

### Decision 5

Use an LLM harness with a dedicated tool layer.

Reason:

This is the primary architectural requirement of the assignment. The model should reason about user intent while deterministic tools own state mutation and API interactions.

### Decision 6

Keep the model isolated from API implementation details.

Reason:

The model should operate through tools such as `set_teams`, `add_player`, and `request_verdict` rather than directly interacting with external APIs. This improves maintainability, traceability, and explainability.

### Decision 7

Prioritize explainability and traceability over feature count.

Reason:

Assignment materials repeatedly emphasize user trust, auditability, and clear reasoning. A smaller but explainable MVP is preferable to a larger but opaque implementation.

### Decision 8

Treat trade state as the single source of truth.

Reason:

Chat, tools, validation, and GUI should all read from the same trade state object to reduce synchronization issues.

### Decision 9

Use React for the frontend.

Reason:

The assignment centers on a chat interface and a live-updating state visualization panel. React is well-suited to building interactive UI and state-driven components.

## Decision 10: Use React + Vite + TypeScript

### Status

Accepted

### Reason

The assignment is chat-first and state-driven.

React provides a natural model for synchronizing trade state and UI state.

Vite provides fast local development and minimal setup overhead.

TypeScript provides stronger typing and easier future maintenance.

### Consequences

A working UI foundation now exists.

Future work can focus on:

- harness design
- tool orchestration
- explainability
- traceability

instead of development environment setup.

### Evidence

React/Vite application successfully generated and executed.

Commit:

7761510 feat: initialize React Vite application



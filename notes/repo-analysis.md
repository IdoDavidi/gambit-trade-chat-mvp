# Repository Analysis

## Repository Purpose

This repository is not a starter application.

It is an onboarding and assessment repository containing:

- HAPI documentation
- Git and Claude learning materials
- bball-GM technical references
- Assignment requirements

The actual solution must be designed and implemented separately by the candidate.

---

## Key Discoveries

### HAPI Is Central

The repository repeatedly emphasizes:

- Human Thinking
- Human Plan
- AI Plan
- AI Execute
- Human Review

The process appears to be at least as important as the resulting implementation.

### Primary Evaluation Area

The assignment repeatedly emphasizes:

- LLM harness design
- Tool boundaries
- Explainability
- Traceability

The assignment is not primarily an NBA trade simulation challenge.

### Trade Legality Is Not The Task

The onboarding documents explicitly encourage using an existing validation API rather than implementing NBA CBA logic from scratch.

### MVP Scoping Is Expected

The assignment repeatedly warns against trying to solve every problem.

A focused implementation with strong architecture is likely preferred over a large feature set.

### Documentation Is A Deliverable

Required documentation includes:

- Human Plan
- AI Plan
- End Of Session
- QA Plan
- README

Documentation is not secondary work. It is part of the assessment.

---

## Current Working Assumptions

- Two-team trades are sufficient for MVP.
- Chat is the primary interface.
- GUI is a live trade-state mirror.
- Model performs reasoning.
- Tools perform deterministic actions.
- Trade state is the single source of truth.
- React is currently the preferred frontend direction.
- Real API integration should be used when practical.
- Mock implementations should be available as a fallback if API limitations are encountered.

---

## What We Understand About The Assignment

The assignment appears to be evaluating whether a candidate can design a trustworthy AI-powered product.

The expected architecture separates responsibilities:

- User provides natural language input.
- LLM interprets user intent.
- The model chooses tools.
- Tools mutate trade state.
- Tools communicate with external services.
- GUI reflects state changes.
- Chat explains results.

The model should not directly own application state or external API interactions.

---

## Main Product Challenge

The challenge is not creating a trade legality engine.

The challenge is creating a chat-first interaction model where:

- conversation drives state
- GUI mirrors state
- trade verdicts are understandable
- users can trace what changed after each action

---

## MVP Direction

Current preferred MVP:

Included:

- Two teams
- Add player
- Remove player
- Clear trade
- Request verdict
- Chat history
- GUI state mirror
- Explainable verdict presentation

Excluded:

- Three-team trades
- Four-team trades
- Draft pick routing
- Sign-and-trade scenarios
- Salary override workflows
- Full NBA trade coverage

---

## Risks

### Overbuilding

There is a risk of prioritizing feature count over architecture quality.

Mitigation:

Keep the MVP intentionally small.

### API Uncertainty

It is currently unknown whether all documented bball-GM endpoints are publicly accessible and suitable for direct integration.

Mitigation:

Maintain a validation abstraction that can switch between a real API adapter and a mock implementation.

### Weak Explainability

Returning raw validation output may fail the chat-first objective.

Mitigation:

Convert validation results into conversational explanations.

### State Synchronization Issues

Chat and GUI could diverge if they maintain separate state.

Mitigation:

Use a single shared trade state object throughout the application.

---

## Open Questions

- Which LLM provider will be used?
- Which tool-calling approach will be used?
- Which deployment platform will be used?
- Will the final MVP use the real validation API or a mock adapter?
- What is the simplest React architecture that clearly demonstrates the required concepts?

---

#### Current Phase

HAPI Stage:

AI Execute

Status:

✅ Human Thinking completed

✅ Human Plan completed

✅ AI Plan completed

✅ Decision Log completed

✅ Repository Analysis completed

✅ Environment setup completed

✅ Milestone 1 completed

✅ Milestone 2 completed

✅ Milestone 3 completed

✅ Milestone 4 completed

✅ Milestone 5 completed

---

#### Current Implementation Status

Repository structure:

gambit-trade-chat-mvp/

docs/

notes/

trade-chat-app/

Current React structure:

src/

components/

- ChatPanel.tsx
- TradeMirror.tsx

state/

- tradeState.ts

tools/

- interpretTrade.ts
- setTeams.ts
- addPlayer.ts

App.tsx

App.css

main.tsx

---

#### Current Architecture

ChatPanel
→ interpretTrade
→ setTeams
→ addPlayer
→ TradeState
→ TradeMirror

This architecture now separates:

- UI Layer
- Interpretation Layer
- Tool Layer
- State Layer
- Presentation Layer

---

#### Current Data Model

TradeState

- lastMessage
- teams
- players

TradePlayer

- name
- fromTeam
- toTeam

Example:

{
  name: "LeBron James",
  fromTeam: "Los Angeles Lakers",
  toTeam: "Boston Celtics"
}

---

#### Verified Scenarios

Trade LeBron to Boston

Produces:

- Lakers
- Celtics
- LeBron James

Trade Curry to Miami

Produces:

- Warriors
- Heat
- Stephen Curry

Unknown inputs:

Produce empty trade-state structures.

---

#### Current Focus

Implementation Milestone 6

Harness Layer

---

#### Immediate Next Targets

- Create Harness abstraction
- Move orchestration responsibilities out of App.tsx
- Route requests through Harness
- Preserve existing tool layer
- Prepare future LLM integration
- Prepare future validator integration

---

#### Future Architecture Target

ChatPanel
→ Harness
→ Tool Selection
→ Tool Layer
→ TradeState
→ TradeMirror

Eventually:

ChatPanel
→ LLM Harness
→ Tool Calls
→ TradeState
→ TradeMirror
→ Validation Service
→ Explainability Layer

The goal remains to demonstrate reasoning, execution boundaries, explainability, and traceability rather than full NBA trade coverage.



# Gambit HAPI Onboarding - Session Summary

## Context

This is a take-home onboarding assignment for Gambit Labs.

Repository:
gambit-lab/gambit-hapi-onboarding

The task is NOT primarily an NBA challenge.

The primary evaluation area appears to be:

- LLM Harness Design
- Tool Boundaries
- Explainability
- Traceability
- Human Plan
- AI Plan

The assignment repeatedly emphasizes HAPI:

Human Thinking
→ Human Plan
→ AI Plan
→ AI Execute
→ Human Review

---

## Current Understanding

We concluded that:

API ≠ Tool

API:
An external technical endpoint.

Example:

POST /trades/validate

Tool:
A business-level action exposed to the model.

Examples:

- set_teams
- add_player
- remove_player
- clear_trade
- request_verdict

The model should reason about tools.

The tools perform deterministic actions and API calls.

The model should not directly manipulate state or call APIs.

---

## MVP Decision

We intentionally scoped the MVP small.

Supported:

- Two-team trades
- Set teams
- Add player
- Remove player
- Request verdict
- Chat history
- GUI mirror
- Explainability
- Traceability

Explicitly excluded:

- Three-team trades
- Four-team trades
- Draft pick routing
- Sign-and-trades
- Salary override scenarios
- Full NBA trade support

Reason:

The assignment repeatedly warns against overbuilding and emphasizes architecture over feature count.

---

## Repository Setup

GitHub repository created from template.

Repository:

gambit-trade-chat-mvp

Visibility:

Public

Created via:

Use this template

NOT fork.

Current branch:

feature/chat-mvp

Git setup completed.

Current commit history:

Initial commit

docs: add planning artifacts

feat: initialize React Vite application

Latest commit:

7761510 feat: initialize React Vite application

---

## Existing Documentation Files

Created:

docs/human-plan.md

docs/ai-plan.md

docs/decision-log.md

notes/repo-analysis.md

notes/Implementation-Milestone-1.md

SessionSummary.md

---

## Important



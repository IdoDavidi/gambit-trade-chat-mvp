# Resume Prompt - Gambit HAPI Trade Chat MVP

We are continuing work on the Gambit HAPI onboarding take-home assignment.

Repository:

gambit-trade-chat-mvp

Branch:

feature/chat-mvp

Current phase:

AI Execute

The assignment is not primarily an NBA trade simulation challenge.

The main evaluation focus is:

- LLM harness design
- tool boundaries
- explainability
- traceability
- human plan
- AI plan
- HAPI-style execution flow

Current application architecture:

ChatPanel
→ ChatHarness
→ LLM Adapter
→ ToolRequest[]
→ Harness Execution Loop
→ Tool Layer
→ TradeState
→ TradeMirror

Important principle:

API is not the same as Tool.

API:

A technical endpoint.

Tool:

A business-level action exposed to the model or harness.

Current tools:

- setTeams
- addPlayer

Current registry:

- toolRegistry.ts exists
- It centralizes available tools
- It is not yet used for generic harness execution

Current LLM state:

- llmAdapter.ts exists
- It provides generateToolRequestsWithLLM()
- It currently delegates to generateToolRequests()
- It is a stub boundary for future real LLM integration

Current deterministic parser:

generateToolRequests.ts

It recognizes:

- lebron
- curry

and returns ToolRequest[].

Current tested inputs:

Trade LeBron to Boston

Expected output:

Teams:
- Los Angeles Lakers
- Boston Celtics

Players:
- LeBron James | Los Angeles Lakers → Boston Celtics

Trade Curry to Miami

Expected output:

Teams:
- Golden State Warriors
- Miami Heat

Players:
- Stephen Curry | Golden State Warriors → Miami Heat

Unknown input:

Expected output:

- Empty teams
- Empty players
- Last Message is preserved

Current code folders:

trade-chat-app/src/components/

- ChatPanel.tsx
- TradeMirror.tsx

trade-chat-app/src/state/

- tradeState.ts

trade-chat-app/src/harness/

- chatHarness.ts

trade-chat-app/src/llm/

- llmAdapter.ts

trade-chat-app/src/tools/

- generateToolRequests.ts
- setTeams.ts
- addPlayer.ts
- toolRegistry.ts

trade-chat-app/src/types/

- ToolRequest.ts

Completed milestones:

Milestone 1:

React state mirror.

Milestone 2:

Structured TradeState.

Milestone 3:

Interpreter extraction.

Milestone 4:

TradePlayer domain model.

Milestone 5:

Deterministic tool layer.

Milestone 6:

Chat harness layer.

Milestone 7:

ToolRequest abstraction.

Milestone 8:

Harness execution loop.

Milestone 9:

Tool registry.

Milestone 10:

LLM adapter layer.

Current recommended next milestone:

Milestone 11:

Validation Layer.

Suggested Milestone 11 goal:

Introduce requestVerdict and a mock validation service.

Do not integrate real bball-GM API yet.

Recommended architecture for Milestone 11:

ChatPanel
→ ChatHarness
→ LLM Adapter
→ ToolRequest[]
→ Harness Execution Loop
→ Tool Layer
→ TradeState
→ requestVerdict
→ Mock Validation Service
→ Verdict
→ TradeMirror

Possible Milestone 11 file additions:

trade-chat-app/src/tools/requestVerdict.ts

trade-chat-app/src/services/mockValidationService.ts

Possible TradeState update:

Add verdict field.

Possible verdict model:

interface TradeVerdict {
  isValid: boolean;
  summary: string;
  reasons: string[];
}

Keep the MVP small.

Do not overbuild.

Prioritize:

- architecture clarity
- tool boundaries
- traceability
- explainability
- code readability

Known environment situation:

Personal PC:

- Git works
- commit and push are done from personal PC

Corporate PC:

- Node.js works
- npm works
- Vite works
- development and testing work
- GitHub clone/pull/push is blocked by proxy restrictions

Workflow:

- Code/test on corporate PC
- Copy changed files to personal PC
- Commit and push from personal PC

Important caution:

Delete any .vs folder created under trade-chat-app/src because it can crash Vite file watching.

Important caution:

When creating markdown files on Windows, ensure files are .md and not .md.txt.

Next assistant should resume from Milestone 11 unless user asks otherwise.

Do not restart the architecture from scratch.

Do not add unnecessary new milestones before validation.

Do not keep stretching the milestone plan.

User prefers direct, practical, copy-paste-ready instructions.



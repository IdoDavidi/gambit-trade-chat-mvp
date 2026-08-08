# QA Plan

## Objective

Verify that the application correctly:

1. Accepts natural language trade requests.
2. Converts requests into structured tool calls.
3. Updates TradeState.
4. Produces a trade verdict.
5. Mirrors TradeState in the GUI.
6. Explains what happened to the user.
7. Maintains traceability through the execution log.

---

# Test Environment

Frontend:

- React
- Vite
- TypeScript

Execution:

- Local browser
- Local development server

Validation:

- Mock validation service

LLM:

- LLM Adapter layer implemented
- Deterministic fallback parser used when no model provider is configured

---

# Test Case 1

## Valid LeBron Trade

### Input

```text
Trade LeBron to Boston
```

### Expected Result

Trade State:

Teams:

- Los Angeles Lakers
- Boston Celtics

Players:

- LeBron James

Verdict:

- Valid

Execution Log:

- setTeams(...)
- addPlayer(...)
- requestVerdict()

Assistant Message:

- Trade interpreted successfully
- Verdict displayed

### Status

PASS

---

# Test Case 2

## Valid Curry Trade

### Input

```text
Trade Curry to Miami
```

### Expected Result

Trade State:

Teams:

- Golden State Warriors
- Miami Heat

Players:

- Stephen Curry

Verdict:

- Valid

Execution Log:

- setTeams(...)
- addPlayer(...)
- requestVerdict()

Assistant Message:

- Trade interpreted successfully
- Verdict displayed

### Status

PASS

---

# Test Case 3

## Unknown Input

### Input

```text
Hello World
```

### Expected Result

Teams:

- Empty

Players:

- Empty

Verdict:

- Invalid

Assistant Message:

- Trade interpreted successfully
- Invalid verdict explanation displayed

### Status

PASS

---

# Test Case 4

## Verdict Generation

### Goal

Verify that every processed request eventually generates a verdict.

### Expected Result

Execution Log contains:

```text
requestVerdict()
```

Verdict section appears.

### Status

PASS

---

# Test Case 5

## Explainability

### Goal

Verify that users can understand what actions occurred.

### Expected Result

Execution Log contains:

```text
setTeams(...)
addPlayer(...)
requestVerdict()
```

Assistant response includes:

- Tool list
- Verdict
- Summary

### Status

PASS

---

# Test Case 6

## State Mirror Synchronization

### Goal

Verify TradeMirror reflects TradeState.

### Expected Result

TradeMirror displays:

- Teams
- Players
- Verdict
- Execution Log
- Last Message

Values match current TradeState.

### Status

PASS

---

# Test Case 7

## Verdict Mirror Consistency

### Goal

Verify verdict appears consistently across the application.

### Expected Result

Verdict displayed:

- In assistant response
- In TradeMirror

Verdict values match.

### Status

PASS

---

# Test Case 8

## Empty Input

### Input

```text
<empty>
```

### Expected Result

No action executed.

No state changes occur.

### Status

PASS

---

# Known Limitations

## Deterministic Fallback Parser

Current implementation recognizes a limited set of demonstration commands.

Examples:

```text
Trade LeBron to Boston

Trade Curry to Miami
```

The architecture supports real LLM integration through:

```text
src/llm/llmAdapter.ts
```

but a model provider is not configured by default.

---

## Validation

Current validation is intentionally mocked.

Rule:

```text
Trades containing at least one player
→ Valid

Trades containing no players
→ Invalid
```

The validation layer exists and can later be connected to a real provider without changing the harness or tool architecture.

---

## NBA Trade Logic

Not implemented:

- Salary matching
- Draft picks
- Three-team trades
- NBA CBA rules
- Real trade legality

These are intentionally outside MVP scope.

---

# Exit Criteria

The MVP is considered validated when:

✅ Natural language requests update TradeState

✅ Tool execution is traceable

✅ Verdict generation works

✅ Assistant explanations are generated

✅ TradeMirror reflects state changes

✅ No runtime errors occur during tested scenarios

✅ Explainability and traceability are visible to the user



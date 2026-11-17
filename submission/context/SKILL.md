---
name: verification
description: Use when implementing or modifying application functionality that requires Jest tests and TypeScript verification.
---

# Verification Skill

Use this workflow after implementing a feature or modifying existing functionality.

## 1. Inspect the Changes

- Identify the files created or modified.
- Review the implementation for correctness.
- Check that existing functionality has been preserved.
- Look for unrelated changes.

## 2. Write Tests

- Add tests for new functionality.
- Cover normal and edge cases.
- Test state changes and user interactions where relevant.
- Preserve existing tests.
- Do not weaken assertions simply to make tests pass.

## 3. Run Jest Tests

Run:

npm test -- --runInBand

Check:

- Whether all relevant test suites pass.
- Whether the expected behavior is covered.
- Whether existing tests still pass.

If tests fail, investigate and fix failures caused by the implementation.

## 4. Run TypeScript Verification

Run:

npx tsc --noEmit

Resolve TypeScript errors introduced by the changes.

Do not hide errors using unnecessary any types or broad type assertions.

## 5. Report Results

Provide a concise report containing:

- Tests added or updated.
- Test command executed.
- Actual test results.
- TypeScript verification result.
- Any unresolved failures or limitations.

Never report successful verification unless the command was actually executed and passed.

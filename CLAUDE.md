# Project Instructions

## Project Overview

This is a React Native Community CLI application built with TypeScript.

The project follows Clean Architecture with the MVVM presentation pattern.

Use the existing project structure and conventions. Do not migrate the project to Expo or introduce another architecture.

## Architecture Guidelines

Follow these responsibilities:

- Domain: Contains business models and use cases. Keep it independent of React Native and UI implementation details.
- Data: Contains data sources and repository implementations.
- Presentation: Contains screens, reusable UI components, and ViewModels.

Keep business logic out of screen components.

ViewModels should manage presentation state and expose actions required by screens.

Avoid unnecessary abstractions, layers, or files for simple functionality.

## Development Guidelines

- Use TypeScript and follow existing coding conventions.
- Prefer functional React components and React hooks.
- Keep components focused and reusable where appropriate.
- Use immutable state updates.
- Reuse existing models and utilities whenever possible.
- Do not install dependencies unless genuinely required.
- Do not modify native Android or iOS configuration unless the task requires it.
- Avoid unrelated code changes.

## Testing and Verification

Before completing a task:

1. Add or update tests for changed behavior.
2. Run relevant Jest tests.
3. Run npx tsc --noEmit.
4. Fix errors introduced by your changes.
5. Report the actual commands executed and their results.

Never claim that tests or verification passed unless you actually ran them.

## Working Approach

1. Inspect the existing implementation before making changes.
2. Understand the current architecture and coding conventions.
3. Make the smallest changes necessary to satisfy the requirements.
4. Preserve existing functionality.
5. Review the final diff for unrelated modifications.
6. Summarize implementation decisions and verification results.

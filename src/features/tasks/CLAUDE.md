# Tasks Feature Guidelines

## Feature Structure

The Tasks feature follows Clean Architecture and MVVM.

Current structure:

- domain/models/: Task-related domain models.
- domain/usecases/: Task-related business operations.
- data/repositories/: Task data and repository implementations.
- presentation/screens/: React Native screens.
- presentation/viewmodels/: Presentation state and UI-related logic.
- presentation/components/: Reusable task UI components.

## Responsibilities

### Domain

- Keep task-related models independent of React Native.
- Place reusable business rules in the domain layer.
- Avoid UI-specific dependencies.

### Data

- Keep initial or external task data in the data layer.
- Do not place screen rendering logic in repositories.
- Follow existing data conventions.

### Presentation

- Screens should focus on displaying UI and handling user interactions.
- ViewModels should manage task-related presentation state and expose actions to screens.
- Reusable task UI should live in the components directory.

## Existing Task Model

The application uses the existing Task model.

Its properties are:

- id
- title
- priority
- isCompleted

Task priority is represented by:

- high
- medium
- low

Reuse this model instead of creating another task representation.

## Implementation Guidelines

- Preserve existing task completion behavior.
- Keep filtering logic out of unrelated UI components.
- Use immutable updates when changing task state.
- Keep the implementation simple and consistent with the existing feature.
- Avoid adding abstractions that are not needed.
- Do not modify other features or unrelated application files.

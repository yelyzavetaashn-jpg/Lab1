# Model Defense: Video Game Library

## 1. Intent and Design Criteria

The purpose of the model is to represent a video game library where registered users can maintain personal collections of games.

The model must:
- Represent users, personal libraries, games, and genres.
- Enforce one personal library per user.
- Allow games to appear in multiple libraries.
- Allow games to have multiple genres while requiring each game to have at least one genre.
- Ensure that user emails and game titles are unique.

## 2. Key Design Decisions

### User–Library (1:1)

Each user owns exactly one library, and each library belongs to exactly one user. Library is kept as a separate entity to distinguish user information from collection information and allow future extension.

### Library–Game (M:N)

A library can contain multiple games, and the same game can appear in multiple libraries. The relationship is represented directly because it has no independent attributes.

### Game–Genre (M:N)

A game can have multiple genres, and a genre can classify multiple games. Each game must belong to at least one genre.

## 3. Alternatives Considered

- **Library merged into User:** This would simplify the model but combine two separate concepts.
- **Associative entity for Library–Game:** This would be useful if the relationship stored additional data, such as the date a game was added or its completion status. Since these attributes are outside the current scope, a direct M:N relationship is sufficient.
- **Associative entity for Game–Genre:** This is unnecessary for the current conceptual model because the relationship has no independent attributes.

## 4. Top-3 Discrepancy Audit

| Initial version / issue | Correction | What should have been clarified in the specification |
|---|---|---|
| The initial specification stated that a game may belong to one or more genres, but the initial diagram allowed zero genres (`0..N`). | Commit `9e813f9` clarified the rule in `spec.md`. Commit `cc51070` updated the Game–Genre cardinality in `diagram.mmd` to require at least one genre. | Every game must belong to at least one genre. The minimum cardinality must be explicitly stated and consistent in the specification and diagram. |
| The initial diagram represented `Library.user_id` as a foreign key but did not explicitly mark it as unique. | Commit `989727f` added the `UK` constraint to `Library.user_id`. | Each user must own exactly one library, and the library owner reference must be unique. |
| The initial diagram did not mark User email and Game title as unique. | Commit `88cafb2` clarified these uniqueness requirements in `spec.md`, and commit `989727f` added the corresponding `UK` markers in `diagram.mmd`. | Every user's email address and every game's title must be unique. |



## 5. Verification

The model was verified using `npm run validate`.

The validation script checks:
- All four required entities are defined.
- Every entity has its declared primary key.
- User–Library is one-to-one.
- Library–Game is many-to-many.
- Every game belongs to at least one genre.
- `Library.user_id` is both a foreign key and unique.
- User email and Game title are unique.

The validation completed successfully with all checks passing.

The Mermaid diagram and specification were also reviewed to ensure that their relationships and business rules are consistent.
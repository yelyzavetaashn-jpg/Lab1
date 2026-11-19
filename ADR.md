# ADR-001: Keep Library as a Separate Entity

## Status
Accepted

## Context
Each registered user owns exactly one personal game library. Although the relationship between User and Library is one-to-one, Library represents a separate concept in the system.

## Decision
The Library entity is kept separate from User. It has its own primary key (`library_id`), while `user_id` is a unique foreign key referencing User.

## Alternatives Considered
1. **Store library attributes directly in User.** This would simplify the model, but would combine user information and library information into one entity.
2. **Keep Library as a separate entity.** This preserves a clear distinction between a user and their personal collection and allows the library to be extended independently.

The second option was selected.

## Consequences
The model contains an additional entity and a one-to-one relationship. This makes the structure more explicit and allows future library-specific attributes to be added.

If individual games in a library later need their own attributes, such as the date added or completion status, the Library–Game relationship may be replaced with an associative entity.
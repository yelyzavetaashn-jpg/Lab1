
# System Specification: Video Game Library

## 1. Purpose

The system allows registered users to maintain personal video game libraries. It stores information about users, libraries, games, and genres.

## 2. Scope

The model describes the conceptual data structure of a video game library. It does not include game descriptions, developers, prices, or user passwords.

## 3. Data Requirements

### User

Represents a registered user.

**Attributes:**
- `user_id` — unique identifier of the user (primary key).
- `username` — user's display name.
- `email` — user's email address.

### Library

Represents a personal library owned by one user.

**Attributes:**
- `library_id` — unique identifier of the library (primary key).
- `user_id` — identifier of the library owner (foreign key referencing User).
- `name` — name of the library.

### Game

Represents a video game.

**Attributes:**
- `game_id` — unique identifier of the game (primary key).
- `title` — title of the game.
- `release_year` — year the game was released.

### Genre

Represents a genre used to classify games.

**Attributes:**
- `genre_id` — unique identifier of the genre (primary key).
- `name` — genre name.

## 4. Business Rules and Relationships

1. Every user owns exactly one personal library.
2. Every library belongs to exactly one user.
3. A library may contain zero or more games.
4. A game may appear in zero or more libraries.
5. A game must belong to at least one genre.
6. A genre may classify zero or more games.
7. `Library.user_id` references `User.user_id` and must be unique.
8. Every game must have a unique title.
9. Every user's email address must be unique.
10. Many-to-many relationships are represented directly because they have no independent attributes.

## 5. Acceptance Criteria

- Each user owns exactly one library, and each library has exactly one owner.
- No two users can have the same email address.
- No two games can have the same title.
- Every game belongs to at least one genre.
- A game can belong to multiple genres, and a genre can classify multiple games.
- A library can contain multiple games, and a game can appear in multiple libraries.
- Every library references an existing user.
- The ER diagram correctly represents all business rules and relationship cardinalities.

## 6. Assumptions and Limitations

- Each user has exactly one personal library.
- The same game may appear in different users' libraries.
- Games may have multiple genres.
- Each game must belong to at least one genre.
- The model describes a conceptual data structure rather than a complete implemented database.
- Game descriptions, developers, prices, and user passwords are outside the current scope.


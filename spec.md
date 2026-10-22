System Specification: Video Game Library

1. Purpose

The system describes a video game library where users can maintain personal collections of games. It stores information about users, libraries, games, and genres.

2. Stakeholders

- Users need to maintain their personal game libraries.
- System administrators need structured information about users and games.
- Game catalog managers need to classify games by genre.

 3. Data Requirements

 User

Represents a registered user.

Attributes:
- `user_id` — unique identifier of the user (primary key).
- `username` — user's display name.
- `email` — user's email address.

 Library

Represents a personal library owned by one user.

Attributes:
- `library_id` — unique identifier of the library (primary key).
- `user_id` — identifier of the library owner (foreign key referencing User).
- `name` — name of the library.

 Game

Represents a video game.

Attributes:
- `game_id` — unique identifier of the game (primary key).
- `title` — title of the game.
- `release_year` — year the game was released.

 Genre

Represents a genre used to classify games.

Attributes:
- `genre_id` — unique identifier of the genre (primary key).
- `name` — genre name.

 4. Business Rules and Relationships

1. Every user owns exactly one personal library.
2. Every library belongs to exactly one user.
3. A library may contain zero or more games.
4. A game may appear in zero or more libraries.
5. A game may belong to one or more genres.
6. A genre may classify zero or more games.
7. Each entity has a unique primary key.
8. The `Library.user_id` foreign key references `User.user_id`.
9. The model represents many-to-many relationships directly, without introducing associative entities that have no independent attributes.

 5. Acceptance Criteria

- The ER model contains the four entities: User, Library, Game, and Genre.
- Every entity has a primary key.
- The Library entity includes a foreign key referencing User.
- The User–Library relationship is one-to-one.
- The Library–Game relationship is many-to-many.
- The Game–Genre relationship is many-to-many.
- Entity and attribute names are consistent between this specification and the ER model.
- The diagram is written declaratively in Mermaid.
- The model does not contain unnecessary associative entities.
- The rendered ER diagram is included in the project.

 6. Assumptions and Limitations

- Each user has exactly one personal library.
- The same game may appear in different users' libraries.
- Games may have multiple genres.
- The model describes conceptual data structure rather than a complete implemented database.
- Attributes such as game descriptions, developers, prices, and user passwords are outside the current scope.

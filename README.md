# Video Game Library — ER Modeling

## Project Overview

This project presents a conceptual entity-relationship (ER) model for a video game library system.

The system allows registered users to maintain personal libraries containing video games.

## Domain

The selected domain is a video game library system.

## Main Entities

- **User** — stores information about a registered user.
- **Library** — represents a personal library owned by one user.
- **Game** — stores information about a video game.
- **Genre** — describes a category to which games may belong.

## Relationships

- Each user owns exactly one personal library.
- A library can contain multiple games, and the same game can appear in multiple libraries.
- A game must belong to at least one genre, and a genre can classify multiple games.

## ER Diagram

```mermaid
erDiagram
    USER ||--|| LIBRARY : owns
    LIBRARY }o--o{ GAME : contains
    GAME }o--|{ GENRE : classified_as

    USER {
        string user_id PK
        string username
        string email UK
    }

    LIBRARY {
        string library_id PK
        string user_id FK, UK
        string name
    }

    GAME {
        string game_id PK
        string title UK
        int release_year
    }

    GENRE {
        string genre_id PK
        string name
    }
```

## Technologies

- Mermaid — declarative ER modeling.
- JavaScript — validation scripts.
- Git — version control.
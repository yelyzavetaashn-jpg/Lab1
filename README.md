Video Game Library — ER Modeling

Project Overview

This project describes a conceptual entity-relationship (ER) model for a video game library system.

The system allows users to have personal libraries containing video games. Each game can belong to multiple genres, and each genre can describe multiple games.

Domain

The selected domain is a video game library system.

The system stores information about users, personal libraries, video games, and game genres.

Main Entities

 User — stores information about a registered user.
 Library — represents a personal library owned by one user.
 Game — stores information about a video game.
 Genre — describes a category to which games may belong.

Relationships

 Each user owns exactly one personal library, and each library belongs to exactly one user.
 A library can contain multiple games, and the same game can appear in multiple libraries.
 A game can belong to multiple genres, and each genre can be associated with multiple games.

Technologies

 Mermaid — declarative ER modeling.
 JavaScript — supporting validation scripts, if needed.
 Git — version control.

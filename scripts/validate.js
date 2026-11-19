
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const specPath = path.join(root, "spec.md");
const diagramPath = path.join(root, "diagram.mmd");

const errors = [];

function check(condition, message) {
    if (condition) {
        console.log(`PASS: ${message}`);
    } else {
        console.error(`FAIL: ${message}`);
        errors.push(message);
    }
}

const specExists = fs.existsSync(specPath);
const diagramExists = fs.existsSync(diagramPath);

check(specExists, "Specification file exists");
check(diagramExists, "Mermaid ER diagram exists");

if (specExists) {
    const spec = fs.readFileSync(specPath, "utf8");

    check(
        /Library\.user_id.*must be unique/.test(spec),
        "Library owner reference must be unique"
    );

    check(
        /game must have a unique title/i.test(spec),
        "Game title must be unique"
    );

    check(
        /email address must be unique/i.test(spec),
        "User email must be unique"
    );
}

if (diagramExists) {
    const diagram = fs.readFileSync(diagramPath, "utf8");

    check(/^\s*erDiagram/m.test(diagram), "Diagram uses Mermaid ER syntax");

    function getEntityBlock(entity) {
        const match = diagram.match(
            new RegExp(`^\\s*${entity}\\s*\\{([\\s\\S]*?)^\\s*\\}`, "m")
        );

        return match ? match[1] : null;
    }

    for (const entity of ["USER", "LIBRARY", "GAME", "GENRE"]) {
        check(
            getEntityBlock(entity) !== null,
            `Entity ${entity} is defined`
        );
    }

    check(
        /USER\s*\|\|--\|\|\s*LIBRARY/.test(diagram),
        "User-Library relationship is one-to-one"
    );

    check(
        /LIBRARY\s*\}o--o\{\s*GAME/.test(diagram),
        "Library-Game relationship is many-to-many"
    );

    check(
        /GAME\s*\}o--\|\{\s*GENRE/.test(diagram),
        "Game-Genre relationship requires at least one genre"
    );

    for (const [entity, key] of [
        ["USER", "user_id"],
        ["LIBRARY", "library_id"],
        ["GAME", "game_id"],
        ["GENRE", "genre_id"],
    ]) {
        const block = getEntityBlock(entity);

        check(
            block && new RegExp(`\\b${key}\\s+PK\\b`).test(block),
            `${entity} has primary key ${key}`
        );
    }

    const libraryBlock = getEntityBlock("LIBRARY");
    const userBlock = getEntityBlock("USER");
    const gameBlock = getEntityBlock("GAME");

    check(
        libraryBlock && /\buser_id\s+FK,\s*UK\b/.test(libraryBlock),
        "Library user_id is a unique foreign key"
    );

    check(
        userBlock && /\bemail\s+UK\b/.test(userBlock),
        "User email is unique"
    );

    check(
        gameBlock && /\btitle\s+UK\b/.test(gameBlock),
        "Game title is unique"
    );
}

if (errors.length > 0) {
    console.error(`\nValidation failed: ${errors.length} check(s) failed.`);
    process.exitCode = 1;
} else {
    console.log("\nAll validation checks passed.");
}


const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const specPath = path.join(root, "spec.md");
const diagramPath = path.join(root, "diagram.mmd");
const renderPath = path.join(root, "render");

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
const renderExists = fs.existsSync(renderPath);

check(specExists, "Specification file exists");
check(diagramExists, "Mermaid ER diagram exists");
check(renderExists, "Render directory exists");

if (diagramExists) {
    const diagram = fs.readFileSync(diagramPath, "utf8");

    check(/^\s*erDiagram/m.test(diagram), "Diagram uses Mermaid ER syntax");

    for (const entity of ["USER", "LIBRARY", "GAME", "GENRE"]) {
        check(
            new RegExp(`^\\s*${entity}\\s*\\{`, "m").test(diagram),
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
        "Game-Genre relationship matches the specification"
    );

    for (const [entity, key] of [
        ["USER", "user_id"],
        ["LIBRARY", "library_id"],
        ["GAME", "game_id"],
        ["GENRE", "genre_id"],
    ]) {
        const block = diagram.match(
            new RegExp(`^\\s*${entity}\\s*\\{([\\s\\S]*?)^\\s*\\}`, "m")
        );

        check(
            block && new RegExp(`\\b${key}\\s+PK\\b`).test(block[1]),
            `${entity} has primary key ${key}`
        );
    }

    const libraryBlock = diagram.match(
        /^\s*LIBRARY\s*\{([\s\S]*?)^\s*\}/m
    );

    check(
        libraryBlock && /\buser_id\s+FK\b/.test(libraryBlock[1]),
        "Library has a foreign key to User"
    );
}

if (renderExists) {
    const files = fs.readdirSync(renderPath);
    const pngFiles = files.filter((file) =>
        file.toLowerCase().endsWith(".png")
    );

    check(pngFiles.length > 0, "Rendered PNG image exists");
}

if (errors.length > 0) {
    console.error(`\nValidation failed: ${errors.length} check(s) failed.`);
    process.exitCode = 1;
} else {
    console.log("\nAll validation checks passed.");
}





export function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

// Random number between min and max
export function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Zufällige Ganzzahl
export function randomInt(min, max) {
    return Math.floor(random(min, max));
}

// Zufälliges Element aus Array
export function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Abstand zwischen zwei Punkten
export function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

// Check wenn zwei Rechtecke kollidieren
export function rectsOverlap(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

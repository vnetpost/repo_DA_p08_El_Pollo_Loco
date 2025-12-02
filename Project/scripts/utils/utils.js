
export function setRandomXposition() {
    return 200 + Math.random() * EPOLO.World.WIDTH * 2;
}

// Random number between min and max
export function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}


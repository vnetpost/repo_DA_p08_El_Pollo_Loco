

export class Level {

    enemies;
    clouds;
    bottles;
    backgroundObjects;
    level_end_x = 700;

    constructor({ _enemies, _clouds, _backgroundObjects, _bottles } = {}) {
        this.enemies = _enemies;
        this.clouds = _clouds;
        this.backgroundObjects = _backgroundObjects;
        this.bottles = _bottles;
    }

}
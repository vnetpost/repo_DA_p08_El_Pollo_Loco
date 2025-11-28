

export class Level {

    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 700;

    constructor({ _enemies, _clouds, _backgroundObjects, _endboss } = {}) {
        this.enemies = _enemies;
        this.clouds = _clouds;
        this.backgroundObjects = _backgroundObjects;
    }

}


export class Level {

    enemies;
    clouds;
    bottles;
    coins;
    backgroundObjects;
    level_end_x = 700;

    constructor({ _enemies, _clouds, _backgroundObjects, _bottles, _coins } = {}) {
        this.enemies = _enemies;
        this.clouds = _clouds;
        this.backgroundObjects = _backgroundObjects;
        this.bottles = _bottles;
        this.coins = _coins;
    }

}

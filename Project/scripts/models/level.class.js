

export class Level {
    // #region Attributes
    enemies;
    clouds;
    bottles;
    coins;
    backgroundObjects;
    // #endregion Attributes

    // #region Instance Methods
    constructor({ _enemies, _clouds, _backgroundObjects, _bottles, _coins } = {}) {
        this.enemies = _enemies;
        this.clouds = _clouds;
        this.backgroundObjects = _backgroundObjects;
        this.bottles = _bottles;
        this.coins = _coins;
    }
    // #endregion Instance Methods

}

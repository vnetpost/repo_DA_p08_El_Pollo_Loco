
/**
 * @class Data container for a game level (All entities exept Pepe).
 */
export class Level {
    // #region Attributes
    enemies;
    clouds;
    bottles;
    coins;
    backgroundObjects;
    // #endregion Attributes

    /**
     * @param {object} [param0]
     * @param {Array} [param0._enemies] Enemies in this level.
     * @param {Array} [param0._clouds] Clouds in this level.
     * @param {Array} [param0._backgroundObjects] Background tiles.
     * @param {Array} [param0._bottles] Collectible bottles.
     * @param {Array} [param0._coins] Collectible coins.
    */
    constructor({ _enemies, _clouds, _backgroundObjects, _bottles, _coins } = {}) {
        this.enemies = _enemies;
        this.clouds = _clouds;
        this.backgroundObjects = _backgroundObjects;
        this.bottles = _bottles;
        this.coins = _coins;
    }
}

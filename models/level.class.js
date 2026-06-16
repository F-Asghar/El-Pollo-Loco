export class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    botle;
    level_end_x = 3690;

    constructor(_enemies, _clouds, _backgroundObjects, _coins, _botle){
        this.enemies = _enemies;
        this.clouds = _clouds;
        this.backgroundObjects = _backgroundObjects;
        this.coins = _coins;
        this.botle = _botle;
    }
}
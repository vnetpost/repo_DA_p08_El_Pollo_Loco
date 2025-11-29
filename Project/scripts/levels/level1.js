import { BackgroundObject } from "../models/background-object.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { Endboss } from "../models/endboss.class.js";
import { ImgHub } from "../models/img-hub.class.js";
import { Level } from "../models/level.class.js";
import { ThrowableObject } from "../models/throwable-object.class.js";


export const level1 = new Level({
    _enemies: [new Endboss()],
    _clouds: [
        new Cloud({ _path: ImgHub.IMGS.background.layers.clouds.tiles[0], _x: 0 }),
        new Cloud({ _path: ImgHub.IMGS.background.layers.clouds.tiles[0], _x: 500 }),
        new Cloud({ _path: ImgHub.IMGS.background.layers.clouds.tiles[0], _x: 1000 }),
        new Cloud({ _path: ImgHub.IMGS.background.layers.clouds.tiles[0], _x: 1500 }),
        new Cloud({ _path: ImgHub.IMGS.background.layers.clouds.tiles[0], _x: 2000 }),
        new Cloud({ _path: ImgHub.IMGS.background.layers.clouds.tiles[0], _x: 2500 }),
    ],
    _backgroundObjects: [
        new BackgroundObject({ _path: ImgHub.IMGS.background.layers.air, _x: 0 }),
        new BackgroundObject({ _path: ImgHub.IMGS.background.layers.air, _x: 720 - 1 }),
        new BackgroundObject({ _path: ImgHub.IMGS.background.layers.air, _x: (720 - 1) * 2 }),
        new BackgroundObject({ _path: ImgHub.IMGS.background.layers.air, _x: (720 - 1) * 3 }),

        new BackgroundObject({ _path: ImgHub.IMGS.background.layers.third.tiles[0], _x: 0 }),
        new BackgroundObject({ _path: ImgHub.IMGS.background.layers.second.tiles[0], _x: 0 }),
        new BackgroundObject({ _path: ImgHub.IMGS.background.layers.first.tiles[0], _x: 0 }),

        new BackgroundObject({ _path: ImgHub.IMGS.background.layers.third.tiles[1], _x: 720 - 1 }),
        new BackgroundObject({ _path: ImgHub.IMGS.background.layers.second.tiles[1], _x: 720 - 1 }),
        new BackgroundObject({ _path: ImgHub.IMGS.background.layers.first.tiles[1], _x: 720 - 1 }),

        new BackgroundObject({ _path: ImgHub.IMGS.background.layers.third.tiles[0], _x: (720 - 1) * 2 }),
        new BackgroundObject({ _path: ImgHub.IMGS.background.layers.second.tiles[0], _x: (720 - 1) * 2 }),
        new BackgroundObject({ _path: ImgHub.IMGS.background.layers.first.tiles[0], _x: (720 - 1) * 2 }),

        new BackgroundObject({ _path: ImgHub.IMGS.background.layers.third.tiles[1], _x: (720 - 1) * 3 }),
        new BackgroundObject({ _path: ImgHub.IMGS.background.layers.second.tiles[1], _x: (720 - 1) * 3 }),
        new BackgroundObject({ _path: ImgHub.IMGS.background.layers.first.tiles[1], _x: (720 - 1) * 3 }),
    ],
    _bottles: [],
}
);

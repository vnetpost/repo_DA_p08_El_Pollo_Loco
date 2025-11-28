import { DrawableObject } from "./drawable-object.class.js";
import { ImgHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";

export class StatusBar extends DrawableObject {
    // #region Attributes
    world;

    x = 10;
    y;
    width = 170;
    height = 40;


    whichBar;
    IMAGES_STATUSBAR = [];
    precentage = 100;

    // #endregion Attributes
    constructor({ _whichBar, _x, _y, _w = 150, _h = 40 } = {}) { // whickBar: "coin"/"bottle"/"health"
        super();
        this.x = _x;
        this.y = _y;
        this.width = _w;
        this.height = _h;

        this.whichBar = _whichBar;
        this.setBarImages();

        // this.setPrecentage(100);

        this.loadImages(this.IMAGES_STATUSBAR);
        IntervalHub.startInterval(this.setPrecentage(this.precentage), 1000 / 10);
    }

    // #region Instance Methods
    setBarImages() {
        switch (this.whichBar) {
            case "health":
                this.IMAGES_STATUSBAR = ImgHub.IMGS.statusbars.health.green;
                break;
            case "coin":
                this.IMAGES_STATUSBAR = ImgHub.IMGS.statusbars.coin.green;
                break;
            case "bottle":
                this.IMAGES_STATUSBAR = ImgHub.IMGS.statusbars.bottle.green;
                break;
            case "endboss":
                this.IMAGES_STATUSBAR = ImgHub.IMGS.statusbars.endboss.orange;
                break;
            default: // console.log("");
        }
    }

    setPrecentage(_precentage) {
        this.precentage = _precentage;
        const path = this.IMAGES_STATUSBAR[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.precentage === 100) return 5;
        else if (this.precentage > 80) return 4;
        else if (this.precentage > 60) return 3;
        else if (this.precentage > 40) return 2;
        else if (this.precentage > 20) return 1;
        else return 0;
    }



    // #endregion Instance Methods
}



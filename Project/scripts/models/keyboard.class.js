

export class Keyboard {
    // #region Attributes
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    THROW = false;
    // #endregion Attributes

    constructor() {
        window.addEventListener("keydown", e => this.onKeyDown(e));
        window.addEventListener("keyup", e => this.onKeyUp(e));
    }

    // #region Instance Methods
    onKeyDown(event) {
        // console.log(event);

        const code = event.code;
        if (code === "ArrowLeft" || code === "KeyA") this.LEFT = true;
        if (code === "ArrowRight" || code === "KeyD") this.RIGHT = true;
        if (code === "ArrowUp" || code === "KeyW" || code === "Space") this.UP = true;
        if (code === "ArrowDown" || code === "KeyS") this.DOWN = true;
        if (code === "KeyF") this.THROW = true;
    }

    onKeyUp(event) {
        const code = event.code;
        if (code === "ArrowLeft" || code === "KeyA") this.LEFT = false;
        if (code === "ArrowRight" || code === "KeyD") this.RIGHT = false;
        if (code === "ArrowUp" || code === "KeyW" || code === "Space") this.UP = false;
        if (code === "ArrowDown" || code === "KeyS") this.DOWN = false;
        if (code === "KeyF") this.THROW = false;
    }
    // #endregion Instance Methods
}

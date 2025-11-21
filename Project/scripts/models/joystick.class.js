// joystick.class.js
export class Joystick {
    left = false;
    right = false;
    jump = false;

    constructor() {
        window.addEventListener("keydown", e => this.onKeyDown(e));
        window.addEventListener("keyup", e => this.onKeyUp(e));
    }

    // Key pressed
    onKeyDown(event) {
        const code = event.code;
        if (code === "ArrowLeft" || code === "KeyA") this.left = true;
        if (code === "ArrowRight" || code === "KeyD") this.right = true;
        if (code === "Space" || code === "KeyW" || code === "ArrowUp") this.jump = true;
    }

    // Key released
    onKeyUp(event) {
        const code = event.code;
        if (code === "ArrowLeft" || code === "KeyA") this.left = false;
        if (code === "ArrowRight" || code === "KeyD") this.right = false;
        if (code === "Space" || code === "KeyW" || code === "ArrowUp") this.jump = false;
    }
}

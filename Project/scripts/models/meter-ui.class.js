import { Sprite, ImgHub } from "./index.js";

export class MeterUI extends Sprite {
    constructor({ x = 25, y = 20 } = {}) {
        super();
        this.pX = x;
        this.pY = y;

        const statusbars = ImgHub.IMGS.statusbars;

        this.bars = [
            {
                type: "bottle",
                icon: statusbars.icons.bottle,
                value: 2,
            },
            {
                type: "health",
                icon: statusbars.icons.health,
                value: 5,
            },
            {
                type: "coin",
                icon: statusbars.icons.coin,
                value: 10,
            },
        ];

        this.iconSize = 42;
        this.barSpacing = 85;
        this.font = "bold 28px 'Berkshire Swash', sans-serif";
        this.color = "#fff";
    }

    setValue(type, value) {
        const bar = this.bars.find(entry => entry.type === type);
        if (!bar) return;
        bar.value = Math.max(0, value);
    }

    draw(ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.textBaseline = "middle";

        this.bars.forEach((bar, index) => {
            const x = this.pX + index * this.barSpacing;
            const y = this.pY;
            if (bar.icon) {
                ctx.drawImage(bar.icon, x, y, this.iconSize, this.iconSize);
            }
            ctx.fillText(String(bar.value), x + this.iconSize + 2, y + this.iconSize / 2);
        });
    }
}

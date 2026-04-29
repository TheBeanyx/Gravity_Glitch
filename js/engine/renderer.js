class Renderer {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.grassSprite = new Image();
        // Pixel art fű textúra kódja
        this.grassSprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEUAAAAyWpAyWpAyWpAyWpAyWpAyWpAyWpAyWpAyWpAyWpAyWpAyWpAyWpAyWpAyWpAyWpAyWpAyWpAyWpAyWpAyWpAyWpAyWpAyWpAyWpAyWpB2un0sAAAAG3RSTlMAERITFBUWFxgZGhscHR4fICEiIyQlJicoKSor9pZ9CgAAAGVJREFUeNrt07ENwDAMA0EL6f7Lp0uHAnmBA9yByAtS6pXWujZ6Z9Z656z17vTP7PTv9I/07/SP9I/07/SP9I/0y8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/v1By7mAnm9UksMAAAAAElFTkSuQmCC";
    }

    clear() {
        this.ctx.fillStyle = "#050505";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawMap(map, camera) {
        if (!map) return;
        const tileSize = 50;
        for (let row = 0; row < map.length; row++) {
            for (let col = 0; col < map[row].length; col++) {
                const tile = map[row][col];
                if (tile === 1) {
                    if (this.grassSprite.complete) {
                        this.ctx.drawImage(this.grassSprite, col * tileSize, row * tileSize, tileSize, tileSize);
                    } else {
                        this.ctx.fillStyle = "#2d5a27";
                        this.ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
                    }
                } else if (tile === 3) {
                    this.ctx.fillStyle = "#ff00ea";
                    this.ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }
        }
    }

    drawUI(player) {
        this.ctx.fillStyle = "#0f0";
        this.ctx.font = "14px monospace";
        this.ctx.fillText(`POS: ${Math.floor(player.x)}, ${Math.floor(player.y)}`, 20, 60);
    }
}

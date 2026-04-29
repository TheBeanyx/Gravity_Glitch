class Renderer {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.grassSprite = new Image();
        this.grassSprite.src = 'assets/level/grass.png';
        
        // Ez a méret határozza meg a blokkok nagyságát
        this.tileSize = 80; 
    }

    clear() {
        this.ctx.fillStyle = "#050505";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawMap(map, camera) {
        if (!map) return;
        
        // Kikapcsoljuk az elmosódást a nagyításhoz
        this.ctx.imageSmoothingEnabled = false;

        for (let row = 0; row < map.length; row++) {
            for (let col = 0; col < map[row].length; col++) {
                const tile = map[row][col];
                const x = col * this.tileSize;
                const y = row * this.tileSize;

                if (tile === 1) {
                    if (this.grassSprite.complete && this.grassSprite.naturalWidth !== 0) {
                        this.ctx.drawImage(this.grassSprite, x, y, this.tileSize, this.tileSize);
                    } else {
                        // Fallback, ha a kép nem töltene be
                        this.ctx.fillStyle = "#1a3317";
                        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
                    }
                } else if (tile === 3) {
                    this.ctx.fillStyle = "#ff00ea";
                    this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
                }
            }
        }
    }

    drawUI(player) {
        this.ctx.fillStyle = "#00d4ff";
        this.ctx.font = "bold 16px monospace";
        this.ctx.fillText(`X: ${Math.floor(player.x)}`, 20, 30);
    }
}

class Renderer {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.grassSprite = new Image();
        this.grassSprite.src = 'assets/level/grass.png';
        this.tileSize = 80; 
    }

    clear() {
        this.ctx.fillStyle = "#050505";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawMap(map, camera) {
        if (!map) return;
        this.ctx.imageSmoothingEnabled = false;

        // Vizuális eltolás: a fű -10-nél kezdődik, tehát kilóg a falon túlra balra
        const xOffset = -10; 

        for (let row = 0; row < map.length; row++) {
            for (let col = 0; col < map[row].length; col++) {
                const tile = map[row][col];
                const x = col * this.tileSize + xOffset;
                const y = row * this.tileSize;

                if (tile === 1) {
                    // 1. FÖLD RÉTEG (Barnás-szürke kitöltés a fű alatt)
                    this.ctx.fillStyle = "#2b2621";
                    this.ctx.fillRect(x, y + 10, this.tileSize, this.canvas.height);

                    // 2. FŰ TEXTÚRA
                    if (this.grassSprite.complete && this.grassSprite.naturalWidth !== 0) {
                        this.ctx.drawImage(this.grassSprite, x, y, this.tileSize, this.tileSize);
                    } else {
                        this.ctx.fillStyle = "#1a3317";
                        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
                    }
                }
            }
        }
    }

    drawUI(player) {
        this.ctx.fillStyle = "#00d4ff";
        this.ctx.font = "14px monospace";
        this.ctx.fillText(`SYSTEM_STABLE | X: ${Math.floor(player.x)}`, 20, 30);
    }
}

class Renderer {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.grassSprite = new Image();
        this.grassSprite.src = 'assets/level/grass.png';
        
        // A blokkok mérete (nagyítva)
        this.tileSize = 80; 
    }

    // Háttér letakarítása minden képkockánál
    clear() {
        this.ctx.fillStyle = "#050505"; // Sötét háttér
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawMap(map, camera) {
        if (!map) return;

        // Pixel-art simítás kikapcsolása a nagyításhoz
        this.ctx.imageSmoothingEnabled = false;

        // Vizuális eltolás: a fű 10 pixellel később kezdődik a blokkhatárhoz képest
        const xOffset = 10; 

        for (let row = 0; row < map.length; row++) {
            for (let col = 0; col < map[row].length; col++) {
                const tile = map[row][col];
                
                // Kiszámoljuk a pozíciót az eltolással
                const x = col * this.tileSize + xOffset;
                const y = row * this.tileSize;

                if (tile === 1) {
                    // 1. BARNA FÖLD RÉTEG (a fű alatt a képernyő aljáig)
                    this.ctx.fillStyle = "#2b2621"; // Barnás-szürke föld szín
                    this.ctx.fillRect(x, y + 10, this.tileSize, this.canvas.height);

                    // 2. FŰ TEXTÚRA RAJZOLÁSA
                    if (this.grassSprite.complete && this.grassSprite.naturalWidth !== 0) {
                        this.ctx.drawImage(this.grassSprite, x, y, this.tileSize, this.tileSize);
                    } else {
                        // Ha a kép nem tölt be: sötétzöld téglalap
                        this.ctx.fillStyle = "#1a3317";
                        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
                    }
                }
            }
        }
    }

    // Felhasználói felület (UI) rajzolása
    drawUI(player) {
        this.ctx.fillStyle = "#00d4ff";
        this.ctx.font = "bold 16px monospace";
        this.ctx.shadowBlur = 4;
        this.ctx.shadowColor = "black";
        this.ctx.fillText(`COORD_X: ${Math.floor(player.x)}`, 20, 30);
        this.ctx.shadowBlur = 0;
    }
}

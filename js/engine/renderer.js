class Renderer {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.grassSprite = new Image();
        // GitHubon ez az útvonal a biztos:
        this.grassSprite.src = 'assets/level/grass.png';
        
        this.grassSprite.onerror = () => {
            console.error("Hiba: A grass.png nem található az assets/level/ mappában!");
        };
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
                    // Ha betöltött a kép, azt rajzoljuk
                    if (this.grassSprite.complete && this.grassSprite.naturalWidth !== 0) {
                        this.ctx.drawImage(this.grassSprite, col * tileSize, row * tileSize, tileSize, tileSize);
                    } else {
                        // Ha nincs kép, sötétzöld téglalap (hogy ne kék legyen!)
                        this.ctx.fillStyle = "#1a3317";
                        this.ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
                    }
                } else if (tile === 3) {
                    this.ctx.fillStyle = "#ff00ea"; // Cél
                    this.ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }
        }
    }

    drawUI(player) {
        this.ctx.fillStyle = "#00d4ff";
        this.ctx.font = "14px 'Courier New'";
        this.ctx.fillText(`X: ${Math.floor(player.x)} Y: ${Math.floor(player.y)}`, 20, 40);
    }
}

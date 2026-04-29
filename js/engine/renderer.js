/**
 * NIGHTMARE ENGINE - Rendering System
 * Felelős a vizuális megjelenítésért, árnyékokért és utómunkálatokért.
 */
class Renderer {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        // Színpaletta a konzisztens hacker stílushoz
        this.colors = {
            bg: '#050505',
            primary: '#00d4ff',
            secondary: '#ff00ea',
            grid: 'rgba(0, 212, 255, 0.05)',
            danger: '#ff4400'
        };
    }

    /**
     * A teljes képernyő újrarajzolása
     */
    clear() {
        this.ctx.fillStyle = this.colors.bg;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * A pálya (Tiles) kirajzolása a levels.js adatai alapján
     */
    drawMap(map, camera) {
        const tileSize = 50;
        this.ctx.save();
        this.ctx.translate(-camera.x, -camera.y);

        for (let row = 0; row < map.length; row++) {
            for (let col = 0; col < map[row].length; col++) {
                let tile = map[row][col];
                if (tile === 1) { // Falak
                    this.ctx.fillStyle = '#111';
                    this.ctx.strokeStyle = this.colors.primary;
                    this.ctx.lineWidth = 2;
                    this.ctx.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize);
                    
                    // Belső "hacker" minta a falakon
                    this.ctx.fillStyle = 'rgba(0, 212, 255, 0.1)';
                    this.ctx.fillRect(col * tileSize + 5, row * tileSize + 5, tileSize - 10, tileSize - 10);
                }
                if (tile === 2) { // Csapdák
                    this.ctx.fillStyle = this.colors.danger;
                    this.ctx.shadowBlur = 15;
                    this.ctx.shadowColor = 'red';
                    this.ctx.fillRect(col * tileSize + 10, row * tileSize + 10, tileSize - 20, tileSize - 20);
                    this.ctx.shadowBlur = 0;
                }
            }
        }
        this.ctx.restore();
    }

    /**
     * Felület (HUD) rajzolása - Fixen a képernyőn marad
     */
    drawUI(player, level) {
        this.ctx.font = "14px 'Fira Code'";
        this.ctx.fillStyle = this.colors.primary;
        
        // HP sáv
        this.ctx.fillText(`SYSTEM_INTEGRITY: ${player.hp}%`, 20, 30);
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(20, 40, 200, 10);
        this.ctx.fillStyle = player.hp > 30 ? this.colors.primary : this.colors.danger;
        this.ctx.fillRect(20, 40, (player.hp / 100) * 200, 10);

        // Szint kijelzés
        this.ctx.fillStyle = this.colors.secondary;
        this.ctx.textAlign = "right";
        this.ctx.fillText(`SECTOR: ${level}`, this.canvas.width - 20, 30);
        this.ctx.textAlign = "left";
    }

    /**
     * Post-processing effekt (opcionális scanline-ok)
     */
    applyScanlines() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        for (let i = 0; i < this.canvas.height; i += 4) {
            this.ctx.fillRect(0, i, this.canvas.width, 1);
        }
    }
}
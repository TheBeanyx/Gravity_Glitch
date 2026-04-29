/**
 * NIGHTMARE ENGINE - Bullet Hell Boss (Sector 10)
 * Komplex MI fázisokkal és matematikai golyózáporral.
 */
class BulletHellBoss {
    constructor(canvasWidth, canvasHeight) {
        this.x = canvasWidth / 2;
        this.y = 150;
        this.hp = 1000;
        this.maxHp = 1000;
        this.angle = 0;
        this.phase = 1;
        this.pulse = 0;
    }

    update(gameTime) {
        this.angle += 0.05; // Forgási sebesség a spirálhoz
        this.pulse += 0.02;
        
        // Lebegő mozgás (sinuszos)
        this.y = 150 + Math.sin(this.pulse) * 50;

        // Tüzelési fázisok
        if (this.phase === 1) {
            if (Math.floor(gameTime) % 10 === 0) {
                const newBullets = BulletPatterns.spiral(this.x, this.y, this.angle, 8, 3);
                window.game.bullets.push(...newBullets);
            }
        }

        // Fázisváltás HP alapján
        if (this.hp < 500) this.phase = 2;
    }

    draw(ctx) {
        // Boss "magja"
        ctx.beginPath();
        ctx.arc(this.x, this.y, 40, 0, Math.PI * 2);
        ctx.fillStyle = '#000';
        ctx.strokeStyle = '#ff00ea';
        ctx.lineWidth = 5;
        ctx.stroke();
        
        // HP bar a képernyő tetején
        this.drawHealthBar(ctx);
    }

    drawHealthBar(ctx) {
        const width = 600;
        const currentWidth = (this.hp / this.maxHp) * width;
        ctx.fillStyle = '#333';
        ctx.fillRect(window.innerWidth/2 - width/2, 20, width, 10);
        ctx.fillStyle = '#ff00ea';
        ctx.fillRect(window.innerWidth/2 - width/2, 20, currentWidth, 10);
    }
}
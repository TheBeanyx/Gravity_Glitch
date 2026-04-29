/**
 * NIGHTMARE ENGINE - Basic Enemy Entity
 * Egyszerű MI: platformon őrjáratozás és tüzelés.
 */
class BasicEnemy {
    constructor(x, y, range = 200) {
        this.x = x;
        this.y = y;
        this.startX = x;
        this.range = range;
        this.vx = 2;
        this.width = 30;
        this.height = 30;
        this.health = 20;
        this.lastShot = 0;
        this.shootInterval = 2000; // 2 másodpercenként lő
    }

    update(player, gameTime) {
        // Őrjárat logika
        this.x += this.vx;
        if (Math.abs(this.x - this.startX) > this.range) {
            this.vx *= -1; // Megfordul
        }

        // Támadás logika (ha közel van a játékos)
        const dist = Math.abs(player.x - this.x);
        if (dist < 400 && gameTime - this.lastShot > this.shootInterval) {
            this.shoot(player);
            this.lastShot = gameTime;
        }
    }

    shoot(player) {
        const vector = BulletPatterns.getVectorToPlayer(this, player, 4);
        window.game.bullets.push({
            x: this.x,
            y: this.y,
            vx: vector.vx,
            vy: vector.vy,
            color: '#ff0000'
        });
    }

    draw(ctx) {
        ctx.fillStyle = '#ff4400';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
    }
}
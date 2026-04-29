class Physics {
    constructor() {
        this.gravity = 0.6;
        this.friction = 0.8;
        this.tileSize = 80; // Fontos, hogy ez egyezzen a Rendererrel!
    }

    applyPhysics(entity) {
        entity.vy += this.gravity;
        entity.x += entity.vx;
        entity.y += entity.vy;
        entity.vx *= this.friction;
    }

    checkMapCollisions(entity, map) {
        if (!map) return;

        // Kiszámoljuk, melyik oszlopban/sorban van a játékos alja
        let left = Math.floor(entity.x / this.tileSize);
        let right = Math.floor((entity.x + entity.width - 2) / this.tileSize); // -2 a biztonság kedvéért
        let bottom = Math.floor((entity.y + entity.height) / this.tileSize);

        // Padló ütközés detektálás
        if (map[bottom] && (map[bottom][left] === 1 || map[bottom][right] === 1)) {
            // Ha füvet ért, visszarakjuk pontosan a tetejére
            entity.y = bottom * this.tileSize - entity.height;
            entity.vy = 0;
            entity.grounded = true;
        } else {
            entity.grounded = false;
        }
    }
}

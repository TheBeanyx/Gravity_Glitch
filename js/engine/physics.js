class Physics {
    constructor() {
        this.gravity = 0.6;
        this.friction = 0.8;
        this.tileSize = 80;
    }

    applyPhysics(entity) {
        entity.vy += this.gravity;
        entity.x += entity.vx;
        entity.y += entity.vy;
        entity.vx *= this.friction;
    }

    checkMapCollisions(entity, map) {
        if (!map) return;

        // 1. VILÁGHATÁROK (Láthatatlan falak a két végén)
        // Bal szélső fal
        if (entity.x < 0) {
            entity.x = 0;
            entity.vx = 0;
        }

        // Jobb szélső fal (A pálya szélessége = oszlopok száma * tileSize)
        const mapWidth = map[0].length * this.tileSize;
        if (entity.x + entity.width > mapWidth) {
            entity.x = mapWidth - entity.width;
            entity.vx = 0;
        }

        // 2. PADLÓ ÜTKÖZÉS
        let left = Math.floor(entity.x / this.tileSize);
        let right = Math.floor((entity.x + entity.width - 2) / this.tileSize);
        let bottom = Math.floor((entity.y + entity.height) / this.tileSize);

        if (map[bottom] && (map[bottom][left] === 1 || map[bottom][right] === 1)) {
            entity.y = bottom * this.tileSize - entity.height;
            entity.vy = 0;
            entity.grounded = true;
        } else {
            entity.grounded = false;
        }
    }
}

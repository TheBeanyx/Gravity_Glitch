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

        // AZONNALI KORREKCIÓ (Végtelen falak)
        // Bal oldal:
        if (entity.x < 0) {
            entity.x = 0;
            entity.vx = 0;
        }
    }

    checkMapCollisions(entity, map) {
        if (!map || !map[0]) return;

        // Jobb oldali fal kényszerítése:
        const mapWidth = map[0].length * this.tileSize;
        if (entity.x + (entity.width || 40) > mapWidth) {
            entity.x = mapWidth - (entity.width || 40);
            entity.vx = 0;
        }

        // Padló ütközés:
        let left = Math.floor(entity.x / this.tileSize);
        let right = Math.floor((entity.x + (entity.width || 40) - 2) / this.tileSize);
        let bottom = Math.floor((entity.y + (entity.height || 40)) / this.tileSize);

        if (map[bottom]) {
            if (map[bottom][left] === 1 || map[bottom][right] === 1) {
                entity.y = bottom * this.tileSize - (entity.height || 40);
                entity.vy = 0;
                entity.grounded = true;
            } else {
                entity.grounded = false;
            }
        }
    }
}

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

        let left = Math.floor(entity.x / this.tileSize);
        let right = Math.floor((entity.x + entity.width - 2) / this.tileSize);
        let bottom = Math.floor((entity.y + entity.height) / this.tileSize);

        // Padló ütközés: Ha a lába alatt fű van, VAGY bármi, ami 1-es
        if (map[bottom] && (map[bottom][left] === 1 || map[bottom][right] === 1)) {
            entity.y = bottom * this.tileSize - entity.height;
            entity.vy = 0;
            entity.grounded = true;
        } else {
            entity.grounded = false;
        }

        // Fakultatív: Ha kiesne a pályáról balra, állítsuk meg
        if (entity.x < 0) {
            entity.x = 0;
            entity.vx = 0;
        }
    }
}

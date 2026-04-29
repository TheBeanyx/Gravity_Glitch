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

        // --- LÁTHATATLAN FALAK (X TENGELY) ---
        // A magasságtól (Y) függetlenül mindig működnek

        // 1. Bal oldali végtelen fal
        if (entity.x < 0) {
            entity.x = 0;
            entity.vx = 0;
        }

        // 2. Jobb oldali végtelen fal
        // Kiszámoljuk a pálya teljes szélességét az oszlopok alapján
        const mapWidth = map[0].length * this.tileSize;
        if (entity.x + entity.width > mapWidth) {
            entity.x = mapWidth - entity.width;
            entity.vx = 0;
        }

        // --- PADLÓ ÜTKÖZÉS (Y TENGELY) ---
        let left = Math.floor(entity.x / this.tileSize);
        let right = Math.floor((entity.x + entity.width - 2) / this.tileSize);
        let bottom = Math.floor((entity.y + entity.height) / this.tileSize);

        // Csak akkor nézzük az ütközést, ha a térképen belül vagyunk függőlegesen
        if (map[bottom]) {
            if (map[bottom][left] === 1 || map[bottom][right] === 1) {
                entity.y = bottom * this.tileSize - entity.height;
                entity.vy = 0;
                entity.grounded = true;
            } else {
                entity.grounded = false;
            }
        } else {
            // Ha kirepülne a pálya fölé vagy alá, ne legyen grounded
            entity.grounded = false;
        }
    }
}

/**
 * NIGHTMARE ENGINE - Core Physics Module
 * Kezeli az entitások dinamikáját, a súrlódást és a falakkal való ütközést.
 */
class Physics {
    constructor() {
        this.gravity = 0.6;
        this.friction = 0.85; // Levegőellenállás és talaj súrlódás
    }

    /**
     * Alkalmazza az alapvető fizikai erőket
     */
    applyPhysics(entity, mode) {
        if (mode === 'PLATFORMER') {
            // Gravitáció alkalmazása
            entity.vy += this.gravity;
            // Horizontális lassulás (tehetetlenség)
            entity.vx *= this.friction;
        } else {
            // Bullet Hell módban minden irányú súrlódás a precíz mozgásért
            entity.vx *= 0.9;
            entity.vy *= 0.9;
        }

        // Pozíció frissítése a kiszámolt sebesség alapján
        entity.x += entity.vx;
        entity.y += entity.vy;
    }

    /**
     * Ütközés ellenőrzése a pályaelemekkel (Tiles)
     */
    checkMapCollisions(entity, levelMap) {
        const tileSize = 50; // A pályaelemek mérete pixelben
        
        // Entitás sarkainak kiszámítása
        let left = Math.floor(entity.x / tileSize);
        let right = Math.floor((entity.x + entity.width) / tileSize);
        let top = Math.floor(entity.y / tileSize);
        let bottom = Math.floor((entity.y + entity.height) / tileSize);

        // Alulról ütközés (talaj)
        if (this.isSolid(levelMap, left, bottom) || this.isSolid(levelMap, right, bottom)) {
            entity.y = bottom * tileSize - entity.height;
            entity.vy = 0;
            entity.onGround = true;
        } else {
            entity.onGround = false;
        }

        // Felülről ütközés (plafon)
        if (this.isSolid(levelMap, left, top) || this.isSolid(levelMap, right, top)) {
            entity.y = (top + 1) * tileSize;
            entity.vy = 0;
        }

        // Oldalsó ütközések
        if (this.isSolid(levelMap, left, top) || this.isSolid(levelMap, left, bottom)) {
            entity.x = (left + 1) * tileSize;
            entity.vx = 0;
        }
        if (this.isSolid(levelMap, right, top) || this.isSolid(levelMap, right, bottom)) {
            entity.x = right * tileSize - entity.width;
            entity.vx = 0;
        }
    }

    /**
     * Megnézi, hogy az adott koordináta szilárd-e (1 = fal)
     */
    isSolid(map, col, row) {
        if (!map[row]) return false;
        return map[row][col] === 1;
    }

    /**
     * Két objektum (pl. golyó és játékos) közötti ütközés
     */
    rectIntersect(r1, r2) {
        return !(r2.x > r1.x + r1.width || 
                 r2.x + r2.width < r1.x || 
                 r2.y > r1.y + r1.height ||
                 r2.y + r2.height < r1.y);
    }
}
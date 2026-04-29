/**
 * NIGHTMARE ENGINE - Bullet Pattern Generator
 * Matematikai algoritmusok a golyózápor mintázataihoz.
 */
class BulletPatterns {
    /**
     * Spirális lövés generálása
     */
    static spiral(originX, originY, currentAngle, bulletCount, speed) {
        let bullets = [];
        const step = (Math.PI * 2) / bulletCount;
        for (let i = 0; i < bulletCount; i++) {
            const angle = currentAngle + (i * step);
            bullets.push({
                x: originX,
                y: originY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                type: 'plasma'
            });
        }
        return bullets;
    }

    /**
     * Szinusz-hullámú lövedék frissítése
     */
    static applyWave(bullet, time) {
        // A golyó az alapirányhoz képest hullámzik
        bullet.y += Math.sin(time * 0.1) * 2;
    }

    /**
     * Célkövető vektor számítása
     */
    static getVectorToPlayer(origin, player, speed) {
        const dx = player.x - origin.x;
        const dy = player.y - origin.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return {
            vx: (dx / dist) * speed,
            vy: (dy / dist) * speed
        };
    }
}
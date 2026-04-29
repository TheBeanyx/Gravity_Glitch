/**
 * NIGHTMARE ENGINE - Camera Control Module
 * Felelős a nézőpont lágy követéséért és a vizuális effektekért.
 */
class Camera {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.lerpSpeed = 0.1; // A követés lágysága (0.1 = nagyon lágy)
        this.shakeIntensity = 0;
        this.shakeDecay = 0.9;
    }

    update(target) {
        // Cél pozíció (a játékos közepe mínusz a képernyő fele)
        const targetX = target.x - this.game.canvas.width / 2;
        const targetY = target.y - this.game.canvas.height / 2;

        // Lineáris interpoláció (LERP) a folyamatos mozgásért
        this.x += (targetX - this.x) * this.lerpSpeed;
        this.y += (targetY - this.y) * this.lerpSpeed;

        // Screen Shake logika
        if (this.shakeIntensity > 0.1) {
            this.x += (Math.random() - 0.5) * this.shakeIntensity;
            this.y += (Math.random() - 0.5) * this.shakeIntensity;
            this.shakeIntensity *= this.shakeDecay;
        }
    }

    apply(ctx) {
        // Elforgatjuk a világot a kamera koordinátáival
        ctx.translate(-this.x, -this.y);
    }

    shake(intensity) {
        this.shakeIntensity = intensity;
    }
}
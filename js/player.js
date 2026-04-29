/**
 * NIGHTMARE ENGINE - Player Entity Module
 * Kezeli a karakter fizikáját, állapotait és animációs kereteit.
 */
class Player {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.width = 40;  // Legyen szélessége
        this.height = 40; // Legyen magassága
        this.vx = 0;
        this.vy = 0;
        this.grounded = false;
        
        // Pozíció és sebesség vektorok
        this.x = 100;
        this.y = 100;
        this.vx = 0;
        this.vy = 0;

        // Fizikai állandók
        this.speed = 5;
        this.jumpForce = -15;
        this.onGround = false;
        
        // Játékmenet adatok
        this.hp = 100;
        this.isAlive = true;
    }

    update(input) {
        if (!this.isAlive) return;

        // --- MOZGÁS LOGIKA ---
        if (this.game.mode === 'PLATFORMER') {
            this.handlePlatformerMovement(input);
        } else if (this.game.mode === 'BULLETHELL') {
            this.handleBulletHellMovement(input);
        }

        // --- SPECIÁLIS FUNKCIÓK ---
        if (input.isPressed('E')) this.interact();
        if (input.isPressed('B')) this.activateBuffer();
        if (input.isPressed('I')) this.showDiagnostics();
    }

    handlePlatformerMovement(input) {
        // Horizontális mozgás (A, D)
        if (input.isPressed('A')) this.vx = -this.speed;
        else if (input.isPressed('D')) this.vx = this.speed;
        else this.vx *= 0.8; // Súrlódás

        // Ugrás (W)
        if (input.isPressed('W') && this.onGround) {
            this.vy = this.jumpForce;
            this.onGround = false;
        }

        // Fizika alkalmazása (a Physics engine hívja majd meg, de itt előkészítjük)
        this.x += this.vx;
        this.y += this.vy;
    }

    handleBulletHellMovement(input) {
        // Szabad mozgás minden irányba (WASD)
        this.vx = 0;
        this.vy = 0;
        if (input.isPressed('W')) this.vy = -this.speed;
        if (input.isPressed('S')) this.vy = this.speed;
        if (input.isPressed('A')) this.vx = -this.speed;
        if (input.isPressed('D')) this.vx = this.speed;

        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx) {
        // Itt rajzoljuk ki a karaktert (egyelőre egy neon négyzettel)
        ctx.fillStyle = this.game.mode === 'PLATFORMER' ? '#00d4ff' : '#ff00ea';
        ctx.shadowBlur = 15;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0; // Reset a többi rajzoláshoz
    }

    activateBuffer() {
        console.log("SYSTEM: Buffer Shield Active.");
    }

    interact() {
        console.log("SYSTEM: Executing interaction...");
    }

    showDiagnostics() {
        console.log(`DIAGNOSTICS: POS[${Math.floor(this.x)},${Math.floor(this.y)}] HP[${this.hp}]`);
    }
}

class Player {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.width = 40;
        this.height = 40;
        this.vx = 0;
        this.vy = 0;
        this.speed = 1.5;      // Gyorsulás
        this.jumpForce = -15;  // Ugrás ereje
        this.grounded = false;
    }

    update(input) {
        // MOZGÁS IRÁNYÍTÁS:
        // W gomb -> Előre (Jobbra a képernyőn)
        if (input.isPressed('w') || input.isPressed('W')) {
            this.vx += this.speed;
        }
        
        // S gomb -> Hátra (Balra a képernyőn)
        if (input.isPressed('s') || input.isPressed('S')) {
            this.vx -= this.speed;
        }

        // Space -> Ugrás (Csak ha a földön áll)
        if (input.isPressed(' ') && this.grounded) {
            this.vy = this.jumpForce;
            this.grounded = false;
        }
        
        // Megjegyzés: Az A és D gombok itt nem csinálnak semmit, 
        // azokat majd a 360° módhoz tartogatjuk.
    }

    draw(ctx) {
        // Neon kék játékos
        ctx.fillStyle = "#00f2ff";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#00f2ff";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
    }
}

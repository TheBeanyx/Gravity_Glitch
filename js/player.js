class Player {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.width = 40;
        this.height = 40;
        this.vx = 0;
        this.vy = 0;
        this.speed = 1.5;      // Gyorsulás mértéke
        this.jumpForce = -15;  // Ugrás ereje
        this.grounded = false;
    }

    update(input) {
        // Balra mozgás (Bal nyíl vagy A)
        if (input.isPressed('ArrowLeft') || input.isPressed('a')) {
            this.vx -= this.speed;
        }
        
        // Jobbra mozgás (Jobb nyíl vagy D)
        if (input.isPressed('ArrowRight') || input.isPressed('d')) {
            this.vx += this.speed;
        }

        // Ugrás (Felfelé nyíl, W vagy Space) - Csak ha a földön áll!
        if ((input.isPressed('ArrowUp') || input.isPressed('w') || input.isPressed(' ')) && this.grounded) {
            this.vy = this.jumpForce;
            this.grounded = false;
        }
    }

    draw(ctx) {
        // A játékos egy neonkék kocka
        ctx.fillStyle = "#00f2ff";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#00f2ff";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Shadow reset, hogy ne lassítsa a többi rajzolást
        ctx.shadowBlur = 0;
    }
}

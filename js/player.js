class Player {
    constructor(game) {
        this.game = game;
        this.x = 100;
        this.y = 100;
        this.width = 40;  // EZ KELL AZ ÜTKÖZÉSHEZ!
        this.height = 40; // EZ KELL AZ ÜTKÖZÉSHEZ!
        this.vx = 0;
        this.vy = 0;
        this.speed = 1.2;
        this.jumpForce = -15;
        this.grounded = false;
    }

    update(input) {
        // W gomb (KeyW) -> Jobbra
        if (input.isPressed('KeyW')) {
            this.vx += this.speed;
        }
        
        // S gomb (KeyS) -> Balra
        if (input.isPressed('KeyS')) {
            this.vx -= this.speed;
        }

        // Space -> Ugrás
        if (input.isPressed('Space') && this.grounded) {
            this.vy = this.jumpForce;
            this.grounded = false;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "#00f2ff";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// js/main.js
class NightmareEngine {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentLevel = 1;
        this.lastTime = 0;
        
        // Alrendszerek példányosítása
        this.input = new InputHandler();
        this.physics = new Physics();
        this.renderer = new Renderer(this.ctx, this.canvas);
        this.camera = new Camera(this);
        this.player = new Player(this);

        this.init();
    }

    init() {
        window.addEventListener('resize', () => this.resize());
        this.resize();
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    gameLoop(t) {
        const dt = t - this.lastTime || 0;
        this.lastTime = t;
        this.update(dt);
        this.draw();
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    update(dt) {
        this.player.update(this.input);
        if (typeof LEVEL_DATA !== 'undefined') {
            this.physics.applyPhysics(this.player, 'PLATFORMER');
            this.physics.checkMapCollisions(this.player, LEVEL_DATA[this.currentLevel]);
        }
        this.camera.update(this.player);
    }

    draw() {
        // Háttér törlése
        this.ctx.fillStyle = "#050505";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.save();
        // Kamera eltolás: Csak X tengelyen (vízszintesen)
        this.ctx.translate(Math.floor(-this.camera.x), 0);
        
        if (typeof LEVEL_DATA !== 'undefined') {
            this.renderer.drawMap(LEVEL_DATA[this.currentLevel], this.camera);
        }
        this.player.draw(this.ctx);
        
        this.ctx.restore();
    }
}

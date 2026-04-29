/**
 * NIGHTMARE ENGINE - Main Entry Point
 * A játék fő irányító egysége és a Game Loop implementációja.
 */
class NightmareEngine {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Canvas méretezése
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Alrendszerek inicializálása
        this.input = new InputHandler();
        this.player = new Player(this);
        this.physics = new Physics(); // Feltételezve a korábbi physics.js-t
        
        // Állapotváltozók
        this.mode = 'PLATFORMER';
        this.currentLevel = 1;
        this.lastTime = 0;

        // Indítás
        this.init();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        console.log("%c COMPILER'S NIGHTMARE ENGINE v1.0 ONLINE ", "background: #222; color: #bada55");
        this.gameLoop(0);
    }

    /**
     * A Fő Játék Ciklus
     * @param {number} timeStamp 
     */
    gameLoop(timeStamp) {
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;

        // 1. Frissítés (Update)
        this.update(deltaTime);

        // 2. Rajzolás (Draw)
        this.draw();

        // 3. Következő keret kérése
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    update(deltaTime) {
        // Játékos frissítése
        this.player.update(this.input);

        // Fizikai számítások és ütközések
        this.physics.applyForces(this.player);
        
        // Szintellenőrzés (Ha eléri a pálya végét)
        this.checkWinCondition();
    }

    draw() {
        // Háttér törlése
        this.ctx.fillStyle = '#050505';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Rács rajzolása (Hacker effekt)
        this.drawGrid();

        // Entitások rajzolása
        this.player.draw(this.ctx);
    }

    drawGrid() {
        this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.05)';
        this.ctx.lineWidth = 1;
        const size = 50;
        for (let x = 0; x < this.canvas.width; x += size) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = 0; y < this.canvas.height; y += size) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    checkWinCondition() {
        // Itt jönne a play.{level}.html-re dobás logikája, ha a célba ér
    }
}

// Motor elindítása, ha az oldal betöltődött
window.addEventListener('load', () => {
    window.game = new NightmareEngine();
});
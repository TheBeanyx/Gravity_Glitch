class InputHandler {
    constructor() {
        this.keys = {};
        
        // Figyeljük a gombnyomást
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });

        // Figyeljük a gomb felengedését
        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    // Segédfüggvény, hogy kényelmesebb legyen lekérdezni
    isPressed(key) {
        return this.keys[key] === true;
    }
}
